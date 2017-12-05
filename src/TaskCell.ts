class TaskCell extends eui.Component implements eui.UIComponent {

	private receiveBtn:eui.Button = null;
	private taskDesc:eui.Label = null;
	private taskReward:eui.Label = null;
	private taskType:eui.Label = null;

	public constructor() {
		super();
		this.skinName = "resource/skins/taskCell.exml";
	}

    protected partAdded(partName:string, instance:any) {
        super.partAdded(partName, instance);
		if (instance == this.receiveBtn) {
			this.receiveBtn.visible = false;
            instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
		}
		if (instance == this.taskDesc) {
			this.taskDesc.text = "抓2次娃娃（0/2）";
		}

		if (instance == this.taskReward) {
			this.taskReward.text = "+20";
		}

		if (instance == this.taskType) {
			this.taskType.text = "未达成";
		}
    }

	protected childrenCreated():void {
		super.childrenCreated();

	}

    private onButtonClick(e: egret.TouchEvent) {
		switch(e.target) {
			case this.receiveBtn:

			break;
		}
    }
}