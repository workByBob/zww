
interface WxLogin { 
    nickname:string;
    headimgurl:string; 
    openid:string; 
} 

interface SignPackage {
    appId:string;
    nonceStr:string;
    timestamp:number;
    signature:string;
    url:string;
}

var AppCanvas = null;
class Main extends eui.UILayer {
    /**
     * 加载进度界面
     * loading process interface
     */
    private loadingView: LoadingUI;
    public gameLayer: GameLayer;
    public gameState: number;
    private wxLogin: WxLogin;
    private signpackage: SignPackage;
    protected createChildren(): void {
        super.createChildren();
        AppCanvas = this;

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter",assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter",new ThemeAdapter());

        // 微信验证
        var isTest = true;
        if (Utils.isWeiXin() && isTest) {
            var wx_code = Utils.getArgsValue(Utils.getCurrHref(), "code");
            if (wx_code != ""){
                var url = "http://wawa.sz-ayx.com/index.php/wap/Unionid/index?code="+wx_code; 
                var request = new egret.HttpRequest();
                request.responseType = egret.HttpResponseType.TEXT;
                request.open(url, egret.HttpMethod.GET);
                request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                request.send();
                request.addEventListener(egret.Event.COMPLETE, this.wxListenerFun, this);
            }else {
                var url = encodeURIComponent(location.href.split("#")[0]);
                location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxdfb3530f672883c1&redirect_uri="+ url +"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect ";
            }
        }else {
            this.openNextStep()
        }
    }

    private wxListenerFun(e:egret.Event) { 
        var request = <egret.HttpRequest>e.currentTarget;
        console.log("login get data : ",request.response);
        this.wxLogin = JSON.parse(request.response);
        Data.weChat_name = this.wxLogin.nickname;
        Data.weChat_headUrl = this.wxLogin.headimgurl; 
        Data.weChat_openid = this.wxLogin.openid; 
        Data.userKey = this.wxLogin["userkey"];
        this.openNextStep()
    } 

    private openNextStep() {
        // 创建socket
        new WebSocketExample();
        // initialize the Resource loading library
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }
    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     * Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        //Config loading process interface
        //设置加载进度界面
        RES.loadGroup("loading", 1);
        // 微信签名认证
        if (Utils.isWeiXin()) {
            var url = "http://wawa.sz-ayx.com/index.php/wap/Unionid/jssign?url="+encodeURIComponent(location.href.split("#")[0]); 
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.open(url, egret.HttpMethod.GET);
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.send();
            request.addEventListener(egret.Event.COMPLETE, this.wxTicketListenerFun, this);
        }
        // 获取基本信息
        Utils.sendHttpServer("http://wawa.sz-ayx.com/api/userInfo/index/userkey/" + Data.userKey, function(e:egret.Event) {
            WaitConnect.closeConnect();
            var request = <egret.HttpRequest>e.currentTarget;
            console.log("userInfo data : ",request.response);
            Data.cmd_userInfo = JSON.parse(request.response);
            this.setGameState(1);
        }, this);
    }

    public setGameState(state:number):void {
        // 上次停留选娃娃界面则不清理
        if (this.gameState != 2) {
            this.removeChildren();
        }
        this.gameState = state;
        switch(state) {
            case 1: // 游戏load
                this.loadingView = new LoadingUI();
                this.addChild(this.loadingView);
            break;
            case 2: // 选择娃娃
                var choice = new ChoiceWW();
                this.addChild(choice);
                choice.name = "choice";
            break;
            case 3: // 游戏界面
                this.gameLayer = new GameLayer();
                this.gameLayer.x = this.gameLayer.width;
                this.addChild(this.gameLayer);
                egret.Tween.get(this.gameLayer,{loop:false}).to({x:0},300);
            break;
            case 4: // 其他界面
            break;
        }
    }

    private wxTicketListenerFun(e:egret.Event){
        var request = <egret.HttpRequest>e.currentTarget;
        // console.log("get data : ",request.response);
        this.signpackage = JSON.parse(request.response);
        console.log(this.signpackage.nonceStr + " " + this.signpackage.timestamp + "  " + this.signpackage.signature )

        this.getWeChatConfig();
        wx.ready(function(){
            AppCanvas.checkShareWord();
        });
    }

    private getWeChatConfig() {
        var bodyConfig:BodyConfig = new BodyConfig();
        bodyConfig.debug = false;
        bodyConfig.appId = Data.wx_appId; // appID
        bodyConfig.timestamp = this.signpackage.timestamp; // 签名时间戳
        bodyConfig.nonceStr = this.signpackage.nonceStr; // 签名的随机串
        bodyConfig.signature = this.signpackage.signature; // 签名
        bodyConfig.jsApiList = [
            'checkJsApi',//判断当前客户端是否支持指定JS接口
            'onMenuShareTimeline',//获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
            'onMenuShareAppMessage',//获取“分享给朋友”按钮点击状态及自定义分享内容接口
            'onMenuShareQQ',//获取“分享到QQ”按钮点击状态及自定义分享内容接口
            'onMenuShareWeibo',//获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
            'hideMenuItems',//批量隐藏功能按钮接口
            'showMenuItems',//批量显示功能按钮接口
            'hideAllNonBaseMenuItem',//隐藏所有非基础按钮接口
            'showAllNonBaseMenuItem',//显示所有功能按钮接口
            'translateVoice',//识别音频并返回识别结果接口
            'startRecord',//开始录音接口
            'stopRecord',//停止录音接口
            'playVoice',//播放语音接口
            'pauseVoice',//暂停播放接口
            'stopVoice',//停止播放接口
            'uploadVoice',//上传语音接口
            'downloadVoice',//下载语音接口
            'chooseImage',//拍照或从手机相册中选图接口
            'previewImage',//预览图片接口
            'uploadImage',//上传图片接口
            'downloadImage',//下载图片接口
            'getNetworkType',//获取网络状态接口
            'openLocation',//使用微信内置地图查看位置接口
            'getLocation',//获取地理位置接口
            'hideOptionMenu',//隐藏右上角菜单接口
            'showOptionMenu',//显示右上角菜单接口
            'closeWindow',//关闭当前网页窗口接口
            'scanQRCode',//调起微信扫一扫接口
            'chooseWXPay',//发起一个微信支付请求
            'openProductSpecificView',//跳转微信商品页接口
            'addCard',//批量添加卡券接口
            'chooseCard',//调起适用于门店的卡券列表并获取用户选择列表
            'openCard'//查看微信卡包中的卡券接口]; // 接口
        ];
        wx.config(bodyConfig);
    }
    private title:string;
    private link:string;
    private imgUrl:string;
    private desc:string;

    // type: 0, 进界面 1, 截完图上传成功
    public checkShareWord() {
        var url = encodeURIComponent(location.href.split("#")[0]);
        this.link = url;
        this.title = "就爱夹娃娃";
        this.desc =  "抓娃娃高手";
        this.imgUrl = Data.weChat_headUrl;
        this.getWeChatShareTimeLine();
        this.getWEChatShareAppMessage();
    }

    private getWeChatShareTimeLine() {
        // 监听“分享到朋友圈”
        var bodyMenuShareTimeLine = new BodyMenuShareTimeline();
        bodyMenuShareTimeLine.title = this.title;
        bodyMenuShareTimeLine.link = this.link;
        bodyMenuShareTimeLine.imgUrl = this.imgUrl;
        bodyMenuShareTimeLine.trigger = function(res) {
            alert('用户点击分享到朋友圈');
        };
        bodyMenuShareTimeLine.success = function(res) {
            alert('已分享');
        };
        bodyMenuShareTimeLine.cancel = function(res) {
            alert('已取消');
        };
        bodyMenuShareTimeLine.fail = function(res) {
            alert(JSON.stringify(res) + " bodyMenuShareTimeLine");
        };
        wx.onMenuShareTimeline(bodyMenuShareTimeLine);
    }
    private getWEChatShareAppMessage() {
        // 监听“分享给朋友”
        var bodyMenuShareAppMessage = new BodyMenuShareAppMessage();
        bodyMenuShareAppMessage.title = this.title;
        bodyMenuShareAppMessage.desc = this.desc;
        bodyMenuShareAppMessage.link = this.link;
        bodyMenuShareAppMessage.imgUrl = this.imgUrl;
        bodyMenuShareAppMessage.type = 'link';
        bodyMenuShareAppMessage.dataUrl = '';
        bodyMenuShareAppMessage.trigger = function(res) {
           alert('用户点击发送给朋友');
        };
        bodyMenuShareAppMessage.success = function(res) {
           alert('已分享');
        };
        bodyMenuShareAppMessage.cancel = function(res) {
           alert('已取消');
        };
        bodyMenuShareAppMessage.fail = function(res) {
            alert(JSON.stringify(res) + " bodyMenuShareAppMessage");
        };
        wx.onMenuShareAppMessage(bodyMenuShareAppMessage);
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name:string):egret.Bitmap {
        let result = new egret.Bitmap();
        let texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

}
