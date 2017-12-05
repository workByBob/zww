class ChoiceWWCell extends eui.Component implements eui.UIComponent {

	private choiceBtn:eui.Button = null;
	public constructor() {
		super();
		this.skinName = "resource/skins/choiceWWCell.exml";
	}

    protected partAdded(partName:string, instance:any) {
        super.partAdded(partName, instance);
		if (instance == this.choiceBtn) {
            instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
		}
    }

	protected childrenCreated():void {
		super.childrenCreated();
	}

    private onButtonClick(e: egret.TouchEvent) {
		switch(e.target) {
			case this.choiceBtn:
                AppCanvas.setGameState(3);
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
