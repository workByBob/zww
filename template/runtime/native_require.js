
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/res/res.js",
	"libs/modules/eui/eui.js",
	"libs/modules/tween/tween.js",
	"libs/modules/game/game.js",
	"libs/modules/socket/socket.js",
	"libs/modules/weixinapi/weixinapi.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/Bag.js",
	"bin-debug/ChoiceWW.js",
	"bin-debug/ChoiceWWCell.js",
	"bin-debug/EverydayGift.js",
	"bin-debug/GameLayer.js",
	"bin-debug/Hand.js",
	"bin-debug/Info.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/PhotoClip.js",
	"bin-debug/Recharge.js",
	"bin-debug/RechargeCell.js",
	"bin-debug/Show.js",
	"bin-debug/Task.js",
	"bin-debug/TaskCell.js",
	"bin-debug/ThemeAdapter.js",
	"bin-debug/util/Data.js",
	"bin-debug/util/UploadImageTool.js",
	"bin-debug/util/Utils.js",
	"bin-debug/util/WaitConnect.js",
	"bin-debug/util/WebSocket.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    if(egret_native.featureEnable) {
        //控制一些优化方案是否开启
        var result = egret_native.featureEnable({
            
        });
    }
    egret_native.requireFiles();
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "showAll",
		contentWidth: 540,
		contentHeight: 960,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel("/system/fonts/DroidSansFallback.ttf", 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};