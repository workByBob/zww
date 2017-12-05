class RechargeCell extends eui.Component implements eui.UIComponent {
	private coinsText:eui.Label = null;
	private payText:eui.Label = null;
	private buyBtn:eui.Button = null;

	public constructor() {
		super();
		this.skinName = "resource/skins/rechargeCell.exml";
	}

    protected partAdded(partName:string, instance:any) {
        super.partAdded(partName, instance);
		if (instance == this.buyBtn) {
            instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
		}
		if (instance == this.coinsText) {
			this.coinsText.text = "100" + "金币";
		}
		if (instance == this.payText) {
			this.payText.text = "9.9元";
			this.payText.anchorOffsetX = this.payText.width/2;
			this.payText.x = this.buyBtn.x;
		}
    }

	protected childrenCreated():void {
		super.childrenCreated();
	}

    private onButtonClick(e: egret.TouchEvent) {
		switch(e.target) {
			case this.buyBtn:

			break;
		}
    }
}