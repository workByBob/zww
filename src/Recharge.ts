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

		Utils.sendHttpServer("http://wawa.sz-ayx.com/api/Buycoin/pull/userkey/" + Data.userKey , true, function(e:egret.Event) {
			WaitConnect.closeConnect();
			var request = <egret.HttpRequest>e.currentTarget;
			// console.log("luck data : ",request.response);
			// 充值列表
			var info = JSON.parse(request.response);
			if (info["state"] == "1") {
				var data = eval(info["data"]);
				console.log(data);
				for (var i = 0; i < data.length; i++) {
					var cell = new RechargeCell(data[i]);
					cell.y = i * cell.height;
					this.scrollG.addChild(cell);
				}
			}
		}, this);
	}

    private onButtonClick(e: egret.TouchEvent) {
		switch(e.target) {
			case this.closeBtn:
			this.parent.removeChild(this);
			break;
		}
    }
}
