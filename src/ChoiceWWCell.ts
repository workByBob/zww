class ChoiceWWCell extends eui.Component implements eui.UIComponent {

	private choiceBtn:eui.Button = null;

	private idLabel:eui.Label = null;
	private nameLabel:eui.Label = null;
	private colorLabel:eui.Label = null;
	private sizeLabel:eui.Label = null;
	private costLabel:eui.Label = null;
	private wawaImg:eui.Image = null;
	private _data:any = null;
	public constructor(cellData:any) {
		super();
		this._data = cellData;
		this.skinName = "resource/skins/choiceWWCell.exml";
	}

    protected partAdded(partName:string, instance:any) {
        super.partAdded(partName, instance);
		if (instance == this.choiceBtn) {
            instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
		}

		if (instance == this.idLabel) {
			instance.text = this._data.id;
		}
		if (instance == this.nameLabel) {
			instance.text = this._data.name;
		}
		if (instance == this.colorLabel) {
			instance.text = this._data.color;
		}
		if (instance == this.sizeLabel) {
			instance.text = this._data.size;
		}
		if (instance == this.costLabel) {
			instance.text = this._data.cost;
		}
		if (instance == this.wawaImg) {
			instance.texture = RES.getRes(this._data.id+"_png");
		}
    }

	protected childrenCreated():void {
		super.childrenCreated();
	}

    private onButtonClick(e: egret.TouchEvent) {
		switch(e.target) {
			case this.choiceBtn:
				Data.selectData = this._data; // 选中的娃娃数据
                AppCanvas.setGameState(3); // 开始游戏
				
				var choice = AppCanvas.getChildByName("choice");
				if (choice) {
					egret.Tween.get(choice,{loop:false}).to({x:-choice.width},300).call(function(){
						AppCanvas.removeChild(choice);
					});
				}
			break;
		}
    }
}
