class EverydayGift extends eui.Component implements eui.UIComponent {

	private closeBtn:eui.Button = null;
	public constructor() {
		super();
		this.skinName = "resource/skins/loginGift.exml";
	}

    protected partAdded(partName:string, instance:any) {
        super.partAdded(partName, instance);
		if (instance == this.closeBtn) {
            instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
		}
    }

	protected childrenCreated():void {
		super.childrenCreated();
	}

    private onButtonClick(e: egret.TouchEvent) {
		switch(e.target) {
			case this.closeBtn:
			this.parent.removeChild(this);
			break;
		}
    }
}
