class Show extends eui.Component implements eui.UIComponent {

	private closeBtn:eui.Button = null;
	private editText:eui.EditableText = null;
	public constructor() {
		super();
		this.skinName = "resource/skins/show.exml";
	}

    protected partAdded(partName:string, instance:any) {
        super.partAdded(partName, instance);
		if (instance == this.closeBtn) {
            instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
		}
		if (instance == this.editText) {
			this.editText.width = 320;
			this.editText.height = 140;
			this.editText.text = "请输入不少于30字的玩家秀内容：";
			this.editText.wordWrap = true;            
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
