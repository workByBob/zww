class Info extends eui.Component implements  eui.UIComponent {
	private closeBtn:eui.Button = null;
	private zqCheck:eui.CheckBox = null;
	private wwCheck:eui.CheckBox = null;

	private scrollG:eui.Group = null;

	private wawaGroup:eui.Group = null;
	private wawa:eui.Image = null;
	private idText:eui.Label = null;
	private nameText:eui.Label = null;
	private colorText:eui.Label = null;
	private sizeText:eui.Label = null;
	private weightText:eui.Label = null;
	public constructor() {
		super();
		this.skinName = "resource/skins/info.exml";
	}

    protected partAdded(partName:string, instance:any) {
        super.partAdded(partName, instance);
		if (instance == this.closeBtn) {
            instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
		}
		if (instance == this.zqCheck || instance == this.wwCheck) {
			instance.addEventListener(eui.UIEvent.CHANGE, this.onCheckBoxClick, this);
		}
    }

	protected childrenCreated():void {
		super.childrenCreated();
		// 默认打开提取按钮
		this.checkBoxByTarget(this.zqCheck);
	}

	private onCheckBoxClick(e :eui.UIEvent) {
		this.zqCheck.selected = false;
		this.wwCheck.selected = false;
		this.checkBoxByTarget(e.target);
	}
	private checkBoxByTarget(target:any) {
		this.wawaGroup.visible = false;
		switch(target) {
			case this.zqCheck:
				this.zqCheck.selected = true;
				// 是否抓中/api/ Winnig/ wawalog
				// Utils.sendHttpServer("http://wawa.sz-ayx.com/api/Winnig/wawalog/userkey/" + Data.userKey, true, function(e:egret.Event) {
				// 	WaitConnect.closeConnect();
				// 	var request = <egret.HttpRequest>e.currentTarget;
				// 	console.log("wawalog data : ",request.response);
				// 	// 得到是否夹中结果
				// 	Data.cmd_wawaLog = JSON.parse(request.response);
				// 	console.log("data : ",Data.cmd_wawaLog.msg);
				// }, this);
				Utils.sendHttpServer("http://wawa.sz-ayx.com/api/Extract/wawa/userkey/" + Data.userKey, true, function(e:egret.Event) {
					WaitConnect.closeConnect();
					var request = <egret.HttpRequest>e.currentTarget;
					console.log("Extract data : ",request.response);
					// 得到是否夹中结果
					Data.cmd_wawaLog = JSON.parse(request.response);
					console.log("data : ",Data.cmd_wawaLog.msg);
				}, this);
			break;
			case this.wwCheck:
				this.wwCheck.selected = true;
				this.wawaGroup.visible = true;
				// wawa
				this.wawa.texture = RES.getRes(Data.selectData.id+"_png");
				this.idText.text = Data.selectData["id"];
				this.nameText.text = Data.selectData["name"];
				this.colorText.text = Data.selectData["color"];
				this.sizeText.text = Data.selectData["size"];
				this.weightText.text = Data.selectData["weight"];
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