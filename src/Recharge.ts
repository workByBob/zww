class Recharge extends eui.Component implements eui.UIComponent {

	private closeBtn:eui.Button = null;
	private scrollG:eui.Group = null;
	public constructor() {
		super();
		this.skinName = "resource/skins/recharge.exml";
	}

    protected partAdded(partName:string, instance:any) {
        super.partAdded(partName, instance);
		if (instance == this.closeBtn) {
            instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
		}
    }

	protected childrenCreated():void {
		super.childrenCreated();

		for (var i = 0; i < 6; i++) {
			var cell = new RechargeCell();
			cell.y = i * cell.height;
			this.scrollG.addChild(cell);
		}
	}

    private onButtonClick(e: egret.TouchEvent) {
		switch(e.target) {
			case this.closeBtn:
			this.parent.removeChild(this);
			break;
		}
    }
}
