class Bag extends eui.Component implements  eui.UIComponent {
	private closeBtn:eui.Button = null;
	private tqCheck:eui.CheckBox = null;
	private yyCheck:eui.CheckBox = null;

	private scrollG:eui.Group = null;
	public constructor() {
		super();
		this.skinName = "resource/skins/bag.exml";
	}

    protected partAdded(partName:string, instance:any) {
        super.partAdded(partName, instance);
		if (instance == this.closeBtn) {
            instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
		}
		if (instance == this.tqCheck || instance == this.yyCheck) {
			instance.addEventListener(eui.UIEvent.CHANGE, this.onCheckBoxClick, this);
		}
    }

	protected childrenCreated():void {
		super.childrenCreated();
		// 默认打开提取按钮
		this.checkBoxByTarget(this.tqCheck);
	}

	private onCheckBoxClick(e :eui.UIEvent) {
		this.tqCheck.selected = false;
		this.yyCheck.selected = false;
		this.checkBoxByTarget(e.target);
	}
	private checkBoxByTarget(target:any) {
		switch(target) {
			case this.tqCheck:
				this.tqCheck.selected = true;
			break;
			case this.yyCheck:
				this.yyCheck.selected = true;
			break;
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