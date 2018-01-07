/**
 * Created by Bob on 14-8-19.
 */
class Utils {
    // ========================== BASE ============================
    // 得到屏幕尺寸
    public static getStageWidth():number {
        return egret.Stage.prototype.stageWidth;
    }
    public static getStageHeight():number {
        return egret.Stage.prototype.stageHeight;
    }

    // 静态获取json数据模版 /* RES.getResAsync("keyName", Utils.setResult, Utils); */
    private static _result:Array<any>;
    public static setResult(result_:Array<any>) {
        this._result = result_;
    }
    public static getResult():Array<any> {
        return this._result;
    }

    // 初始化单张图片
    public static createBitmapByImageName(name:string):egret.Bitmap {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    // 初始化列表图片
    public static createBitmapBySheetName(name:string, sheet:egret.SpriteSheet):egret.Bitmap {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = sheet.getTexture(name);
        result.texture = texture;
        return result;
    }

    // 是否使用微信浏览器
    public static isWeiXin():boolean {
        var ua:string = navigator.userAgent.toString();
        var str:any=ua.match(/MicroMessenger/i);
        if(str == "MicroMessenger") {
            return true;
        } else {
            return false;
        }
    }

    // 是否使用手机浏览器
    public static isMobile():boolean {
        return egret.Capabilities.isMobile;
    }

    // 获得当前设备
    public static deviceOS() {
        // 苹果手机操作系统 “iOS”
        // 安卓手机操作系统 “Android”
        // 微软手机操作系统 “Windows Phone”
        // 微软桌面操作系统 “Windows PC”
        // 苹果桌面操作系统 “Mac OS”
        // 未知操作系统 “Unknown”
        return egret.Capabilities.os;
    }

    // 获取时间戳
    public static getTimeMark() {
        return Date.parse(new Date().toString())/1000;
    }

    // 获取一段随机字符
    public static getRandomStr() {
        return Math.random().toString(36).substr(2, 15);
    }

    // 点与矩形的碰撞
    public static isCheckCollide(touchPoint:egret.Point, rect:egret.Rectangle):boolean {
        if (touchPoint.x >= rect.x && touchPoint.x <= rect.x + rect.width) {
            if (touchPoint.y >= rect.y && touchPoint.y <= rect.y + rect.height) {
                return true;
            }
        }
        return false;
    }

    // ========================= APP ===========================

    // 从href获得参数
    public static getArgsValue(sHref, sArgName) {
        sHref = sHref.replace("/","");
        var fun = function(sHref, sArgName) {
            var args = sHref.split("?");
            var retval = "";
            if(args[0] == sHref) {
                return retval;
            }
            var str = args[1];
            args = str.split("&");
            for(var i = 0; i < args.length; i ++) {
                str = args[i];
                var arg = str.split("=");
                if(arg.length <= 1) continue;
                if(arg[0] == sArgName) retval = arg[1];
            }
            return retval;
        };
        return fun(sHref, sArgName);
    }

    // 获取当前访问地址
    public static getCurrHref() {
        return window.location.search;
    }

    // 返回设备
    public static getPlatform() {
        var browser={
            versions:function(){
                var u = navigator.userAgent, app = navigator.appVersion;
                return {//移动终端浏览器版本信息
                    trident: u.indexOf('Trident') > -1, //IE内核
                    presto: u.indexOf('Presto') > -1, //opera内核
                    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                    mobile: !!u.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/), //是否为移动终端
                    iOS: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                    iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                    iPad: u.indexOf('iPad') > -1, //是否iPad
                    webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
                    weChat: u.search(/MicroMessenger/i) !== -1 //是否是微信
                };
            }()
        };
        return browser;
    }


    public static getRandNum(length:number):Array<any> {
        var a = Math.floor(Math.random() * length);
        var b = Math.floor(Math.random() * length);
        while(a==b){
            b = Math.floor(Math.random() * length);
        }
        console.log(a,b);
        return [a,b];
    }


    // public static URLReq(url:string, data:string, fun:Function, thisObject:any) {
    //     var urlLoader:egret.URLLoader = new egret.URLLoader();
    //     var req:egret.URLRequest = new egret.URLRequest();
    //     req.requestHeaders.push(new egret.URLRequestHeader("Content-Type", "text"));
    //     req.url = url;
    //     req.method = egret.URLRequestMethod.POST;
    //     req.data = data;
    //     urlLoader.load(req);
    //     urlLoader.addEventListener(egret.Event.COMPLETE, fun, thisObject);
    // }

    // public static URLLoader(url:string, fun:Function, thisObject:any) {
    //     var urlLoader:egret.URLLoader = new egret.URLLoader();
    //     var req:egret.URLRequest = new egret.URLRequest();
    //     req.url = url;
    //     req.method = egret.URLRequestMethod.GET;
    //     urlLoader.addEventListener(egret.Event.COMPLETE, fun, thisObject);
    //     urlLoader.load(req);
    // }

	public static sendHttpServer(param:string,fun:Function) {
		var url = param;
		var request = new egret.HttpRequest();
		request.responseType = egret.HttpResponseType.TEXT;
		request.open(url, egret.HttpMethod.GET);
		request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		request.send();
		request.addEventListener(egret.Event.COMPLETE, fun, this);
	}
}