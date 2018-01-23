class WaitConnect extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
		this.skinName = "resource/skins/waitConnect.exml";
	}

    protected partAdded(partName:string, instance:any) {
        super.partAdded(partName, instance);
    }

	protected childrenCreated():void {
		super.childrenCreated();                         
	}

	private uiCompHandler() {
		var self = this;
		egret.Tween.get(this, {loop:false}).wait(20000).call(function(){
			WaitConnect.closeConnect();
		});

		// 动画
		var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( RES.getRes("wait_json"), RES.getRes("wait_png") );
		var mc1:egret.MovieClip = new egret.MovieClip( mcFactory.generateMovieClipData( "wait" ) );
		mc1.x = AppCanvas.getStage().stageWidth/2 - mc1.width/2;
		mc1.y = AppCanvas.getStage().stageHeight/2 - mc1.height/2;
		this.addChild( mc1);
		mc1.gotoAndPlay( "connnect" ,-1);
	}

	public static wait:WaitConnect = null;
	public static openConnect() {
		if (this.wait == null) {
			this.wait = new WaitConnect();
			AppCanvas.addChild(this.wait);
		}
	}

	public static closeConnect(waitTime=0) {
		var self = this;
		egret.Tween.get(this, {loop:false}).wait(waitTime).call(function(){
			if (self.wait != null) {
				self.wait.parent.removeChild(self.wait);
				self.wait = null;
			}
		});
	}
	
}