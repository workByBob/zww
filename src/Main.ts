var AppCanvas = null;
class Main extends eui.UILayer {
    /**
     * 加载进度界面
     * loading process interface
     */
    private loadingView: LoadingUI;
    public gameLayer: GameLayer;
    public gameState: number;
    protected createChildren(): void {
        super.createChildren();
        AppCanvas = this;
        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter",assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter",new ThemeAdapter());
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
        this.setGameState(1);
    }

    public setGameState(state:number):void {
        this.gameState = state;
        this.removeChildren();
        switch(state) {
            case 1: // 游戏load
                this.loadingView = new LoadingUI();
                this.addChild(this.loadingView);
            break;
            case 2: // 游戏界面
                this.gameLayer = new GameLayer();
                this.addChild(this.gameLayer);
            break;
            case 3: // 其他界面
            break;
        }

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
