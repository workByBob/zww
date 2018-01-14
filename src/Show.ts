class Show extends eui.Component implements eui.UIComponent {

	private closeBtn:eui.Button = null;
	private editText:eui.EditableText = null;
	private textInput:eui.TextInput = null;
	private ciBtn:eui.Button = null;
	private yuBtn:eui.Button = null;
	public constructor() {
		super();
		this.skinName = "resource/skins/show.exml";
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
	}

    protected partAdded(partName:string, instance:any) {
        super.partAdded(partName, instance);
		if (instance == this.closeBtn || instance == this.ciBtn || instance == this.yuBtn) {
            instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
		}
		if (instance == this.editText) {
		}
		if (instance == this.textInput) {
		}
    }

	protected childrenCreated():void {
		super.childrenCreated();                         
	}

	private uiCompHandler() {
		this.textInput.textDisplay.multiline = true;
	}
 
    private onButtonClick(e: egret.TouchEvent) {
		switch(e.target) {
			case this.closeBtn:
				this.parent.removeChild(this);
			break;
			case this.ciBtn:
				AppCanvas.getChooseImage();
			break;
			case this.yuBtn:

			break;
		}
    }
}
