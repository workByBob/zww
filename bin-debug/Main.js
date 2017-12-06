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
        var isTest = false;
        if (Utils.isWeiXin() && isTest) {
            var wx_code = Utils.getArgsValue(Utils.getCurrHref(), "code");
            if (wx_code != "") {
                var url = "http://218.244.146.142:52111/?app=" + Data.wx_appId + "&code=" + wx_code;
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
        this.wxLogin = JSON.parse(e.target.data);
        Data.weChat_name = this.wxLogin.nickname;
        Data.weChat_headUrl = this.wxLogin.headimgurl;
        Data.weChat_openid = this.wxLogin.openid;
        // this.writeData('name',Data.weChat_name); 
        // this.writeData('headUrl',Data.weChat_headUrl); 
        // this.writeData('openid',Data.weChat_openid);
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
        this.setGameState(1);
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