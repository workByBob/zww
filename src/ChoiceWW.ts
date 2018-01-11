class ChoiceWW extends eui.Component implements eui.UIComponent {

	private scrollG:eui.Group = null;
	private scroller:eui.Scroller = null;
	private rdCheck:eui.CheckBox = null;
	private jbCheck:eui.CheckBox = null;
	private topBtn:eui.Button = null;
	
	public constructor() {
		super();
		this.skinName = "resource/skins/choiceWW.exml";
	}

    protected partAdded(partName:string, instance:any) {
        super.partAdded(partName, instance);
		if (instance == this.rdCheck || instance == this.jbCheck) {
			instance.addEventListener(eui.UIEvent.CHANGE, this.onCheckBoxClick, this);
		}
		if (instance == this.topBtn) {
            instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
		}
		if (instance == this.scroller) {
			instance.addEventListener(eui.UIEvent.CHANGE_END, this.onScroll, this);
			instance.addEventListener(eui.UIEvent.CHANGE_START, this.onScroll, this);
		}
    }

	protected childrenCreated():void {
		super.childrenCreated();
		// 获取娃娃信息
		Data.wawaJson = RES.getRes("wwInfo_json");
		// 默认热度
		this.checkBoxByTarget(this.rdCheck);
	}

	private updateScroll(type) {
		this.scrollG.removeChildren();
        this.scroller.stopAnimation();
        this.scroller.viewport.scrollV = 0;
		this.topBtn.visible = false;
        var wawaArray:eui.ArrayCollection = new eui.ArrayCollection(Data.wawaJson["wawa"]);
		var wawaNum = wawaArray.length;
        var nWawaArray:eui.ArrayCollection = new eui.ArrayCollection();
		if (type == 0) // 热度 
		{
			for (var i = 0 ; i < wawaNum; i++) {
				if (i == 0) {
					nWawaArray.addItem(wawaArray.getItemAt(i));
				}
				if (i+1 < wawaNum) {
					for (var j = 0; j < nWawaArray.length; j++) {
						if (wawaArray.getItemAt(i+1).hot >= nWawaArray.getItemAt(j).hot) {
							nWawaArray.addItemAt(wawaArray.getItemAt(i+1),j);//添加的指定的索引位置
							break;
						}else {
							nWawaArray.addItemAt(wawaArray.getItemAt(i+1), nWawaArray.length);//添加的指定的索引位置
							break;
						}
					}
				}
			}
		}else if (type == 1) // 金币
		{
			for (var i = 0 ; i < wawaNum; i++) {
				if (i == 0) {
					nWawaArray.addItem(wawaArray.getItemAt(i));
				}
				if (i+1 < wawaNum) {
					for (var j = 0; j < nWawaArray.length; j++) {
						if (wawaArray.getItemAt(i+1).cost >= nWawaArray.getItemAt(j).cost) {
							nWawaArray.addItemAt(wawaArray.getItemAt(i+1),j);//添加的指定的索引位置
							break;
						}else {
							nWawaArray.addItemAt(wawaArray.getItemAt(i+1), nWawaArray.length);//添加的指定的索引位置
							break;
						}
					}
				}
			}
		}

		for (var i = 0; i < nWawaArray.length; i++ ) {
			var cell = new ChoiceWWCell(nWawaArray.getItemAt(i));
			cell.y = i * cell.height;
			this.scrollG.addChild(cell);
		}
	}

	private onCheckBoxClick(e :eui.UIEvent) {
		this.rdCheck.selected = false;
		this.jbCheck.selected = false;
		this.checkBoxByTarget(e.target);
	}
	private checkBoxByTarget(target:any) {
		switch(target) {
			case this.rdCheck:
				this.rdCheck.selected = true;
				this.updateScroll(0);
			break;
			case this.jbCheck:
				this.jbCheck.selected = true;
				this.updateScroll(1);
			break;
		}
	}

    private onButtonClick(e: egret.TouchEvent) {
		switch(e.target) {
			case this.topBtn:
        		this.scroller.stopAnimation();
        		this.scroller.viewport.scrollV = 0;
				var self = this;
				egret.Tween.get(this.topBtn, {loop:false}).to({y:960+this.topBtn.height}, 500).call(function(){
					self.topBtn.visible = false;
				});
			break;
		}
    }

	private onScroll(e: eui.UIEvent) {
		switch(e.type) {
			case "changeStart":
				var self = this;
				egret.Tween.get(this.topBtn, {loop:false}).to({y:960+this.topBtn.height}, 500).call(function(){
					self.topBtn.visible = false;
				});
			break;
			case "changeEnd":
				if (this.scroller.viewport.scrollV > 0) {
					this.topBtn.visible = true;
					egret.Tween.get(this.topBtn, {loop:false}).to({y:960-this.topBtn.height*2}, 500);
				}
			break;
		}
	}
}
