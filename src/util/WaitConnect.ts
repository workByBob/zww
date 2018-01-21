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
		this.visible = false;
		var self = this;
		egret.Tween.get(this, {loop:false}).wait(100).call(function(){
			self.visible = true;
		});
	}

	public static wait:WaitConnect = null;
	public static openConnect() {
		if (this.wait == null) {
			this.wait = new WaitConnect();
			AppCanvas.addChild(this.wait);
		}
	}

	public static closeConnect() {
		if (this.wait != null) {
			this.wait.parent.removeChild(this.wait);
			this.wait = null;
		}
	}
	
}