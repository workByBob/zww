class RechargeCell extends eui.Component implements eui.UIComponent {
	private coinsText:eui.Label = null;
	private payText:eui.Label = null;
	private buyBtn:eui.Button = null;
	private _data:any = null;

	public constructor(data:any) {
		super();
		this._data = data;
		this.skinName = "resource/skins/rechargeCell.exml";
	}

    protected partAdded(partName:string, instance:any) {
        super.partAdded(partName, instance);
		if (instance == this.buyBtn) {
            instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
		}
		if (instance == this.coinsText) {
			this.coinsText.text = this._data.contensdesc; // 描述多少金币
		}
		if (instance == this.payText) {
			this.payText.text = this._data.name; // 价值多少元
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