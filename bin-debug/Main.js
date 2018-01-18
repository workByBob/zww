var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AppCanvas = null;
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        AppCanvas = this;
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        // 微信验证
        var isTest = true;
        if (Utils.isWeiXin() && isTest) {
            var wx_code = Utils.getArgsValue(Utils.getCurrHref(), "code");
            if (wx_code != "") {
                var url = "http://wawa.sz-ayx.com/index.php/wap/Unionid/index?code=" + wx_code;
                var request = new egret.HttpRequest();
                request.responseType = egret.HttpResponseType.TEXT;
                request.open(url, egret.HttpMethod.GET);
                request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                request.send();
                request.addEventListener(egret.Event.COMPLETE, this.wxListenerFun, this);
            }
            else {
                var url = encodeURIComponent(location.href.split("#")[0]);
                location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxdfb3530f672883c1&redirect_uri=" + url + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect ";
            }
        }
        else {
            this.openNextStep();
        }
    };
    Main.prototype.wxListenerFun = function (e) {
        var request = e.currentTarget;
        console.log("login get data : ", request.response);
        this.wxLogin = JSON.parse(request.response);
        Data.weChat_name = this.wxLogin.nickname;
        Data.weChat_headUrl = this.wxLogin.headimgurl;
        Data.weChat_openid = this.wxLogin.openid;
        Data.userKey = this.wxLogin["userkey"];
        this.openNextStep();
    };
    Main.prototype.openNextStep = function () {
        // 创建socket
        new WebSocketExample();
        // initialize the Resource loading library
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     * Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group
     */
    Main.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        //Config loading process interface
        //设置加载进度界面
        RES.loadGroup("loading", 1);
        // 微信签名认证
        if (Utils.isWeiXin()) {
            var url = "http://wawa.sz-ayx.com/index.php/wap/Unionid/jssign?url=" + encodeURIComponent(location.href.split("#")[0]);
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.open(url, egret.HttpMethod.GET);
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.send();
            request.addEventListener(egret.Event.COMPLETE, this.wxTicketListenerFun, this);
        }
        var self = this;
        // 获取基本信息
        Utils.sendHttpServer("http://wawa.sz-ayx.com/api/userInfo/index/userkey/" + Data.userKey, function (e) {
            var request = e.currentTarget;
            console.log("userInfo data : ", request.response);
            Data.cmd_userInfo = JSON.parse(request.response);
            self.setGameState(1);
        });
    };
    Main.prototype.setGameState = function (state) {
        // 上次停留选娃娃界面则不清理
        if (this.gameState != 2) {
            this.removeChildren();
        }
        this.gameState = state;
        switch (state) {
            case 1:
                this.loadingView = new LoadingUI();
                this.addChild(this.loadingView);
                break;
            case 2:
                var choice = new ChoiceWW();
                this.addChild(choice);
                choice.name = "choice";
                break;
            case 3:
                this.gameLayer = new GameLayer();
                this.gameLayer.x = this.gameLayer.width;
                this.addChild(this.gameLayer);
                egret.Tween.get(this.gameLayer, { loop: false }).to({ x: 0 }, 300);
                break;
            case 4:
                break;
        }
    };
    Main.prototype.wxTicketListenerFun = function (e) {
        var request = e.currentTarget;
        // console.log("get data : ",request.response);
        this.signpackage = JSON.parse(request.response);
        console.log(this.signpackage.nonceStr + " " + this.signpackage.timestamp + "  " + this.signpackage.signature);
        this.getWeChatConfig();
        wx.ready(function () {
            AppCanvas.checkShareWord();
        });
    };
    Main.prototype.getWeChatConfig = function () {
        var bodyConfig = new BodyConfig();
        bodyConfig.debug = false;
        bodyConfig.appId = Data.wx_appId; // appID
        bodyConfig.timestamp = this.signpackage.timestamp; // 签名时间戳
        bodyConfig.nonceStr = this.signpackage.nonceStr; // 签名的随机串
        bodyConfig.signature = this.signpackage.signature; // 签名
        bodyConfig.jsApiList = [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'hideMenuItems',
            'showMenuItems',
            'hideAllNonBaseMenuItem',
            'showAllNonBaseMenuItem',
            'translateVoice',
            'startRecord',
            'stopRecord',
            'playVoice',
            'pauseVoice',
            'stopVoice',
            'uploadVoice',
            'downloadVoice',
            'chooseImage',
            'previewImage',
            'uploadImage',
            'downloadImage',
            'getNetworkType',
            'openLocation',
            'getLocation',
            'hideOptionMenu',
            'showOptionMenu',
            'closeWindow',
            'scanQRCode',
            'chooseWXPay',
            'openProductSpecificView',
            'addCard',
            'chooseCard',
            'openCard' //查看微信卡包中的卡券接口]; // 接口
        ];
        wx.config(bodyConfig);
    };
    // type: 0, 进界面 1, 截完图上传成功
    Main.prototype.checkShareWord = function () {
        var url = encodeURIComponent(location.href.split("#")[0]);
        this.link = url;
        this.title = "就爱夹娃娃";
        this.desc = "抓娃娃高手";
        this.imgUrl = Data.weChat_headUrl;
        this.getWeChatShareTimeLine();
        this.getWEChatShareAppMessage();
    };
    Main.prototype.getWeChatShareTimeLine = function () {
        // 监听“分享到朋友圈”
        var bodyMenuShareTimeLine = new BodyMenuShareTimeline();
        bodyMenuShareTimeLine.title = this.title;
        bodyMenuShareTimeLine.link = this.link;
        bodyMenuShareTimeLine.imgUrl = this.imgUrl;
        bodyMenuShareTimeLine.trigger = function (res) {
            alert('用户点击分享到朋友圈');
        };
        bodyMenuShareTimeLine.success = function (res) {
            alert('已分享');
        };
        bodyMenuShareTimeLine.cancel = function (res) {
            alert('已取消');
        };
        bodyMenuShareTimeLine.fail = function (res) {
            alert(JSON.stringify(res) + " bodyMenuShareTimeLine");
        };
        wx.onMenuShareTimeline(bodyMenuShareTimeLine);
    };
    Main.prototype.getWEChatShareAppMessage = function () {
        // 监听“分享给朋友”
        var bodyMenuShareAppMessage = new BodyMenuShareAppMessage();
        bodyMenuShareAppMessage.title = this.title;
        bodyMenuShareAppMessage.desc = this.desc;
        bodyMenuShareAppMessage.link = this.link;
        bodyMenuShareAppMessage.imgUrl = this.imgUrl;
        bodyMenuShareAppMessage.type = 'link';
        bodyMenuShareAppMessage.dataUrl = '';
        bodyMenuShareAppMessage.trigger = function (res) {
            alert('用户点击发送给朋友');
        };
        bodyMenuShareAppMessage.success = function (res) {
            alert('已分享');
        };
        bodyMenuShareAppMessage.cancel = function (res) {
            alert('已取消');
        };
        bodyMenuShareAppMessage.fail = function (res) {
            alert(JSON.stringify(res) + " bodyMenuShareAppMessage");
        };
        wx.onMenuShareAppMessage(bodyMenuShareAppMessage);
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Main.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map