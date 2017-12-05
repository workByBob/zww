class GameLayer extends eui.Component implements  eui.UIComponent {
	private startBtn:eui.Button = null;
	private changeBtn:eui.Button = null;
	private wechatBtn:eui.Button = null;
	private giftBtn:eui.Button = null;
	private invateBtn:eui.Button = null;
	private kefuBtn:eui.Button = null;
	private payBtn:eui.Button = null;
	private taskBtn:eui.Button = null;
	private showBtn:eui.Button = null;
	private bagBtn:eui.Button = null;

	private showGroup:eui.Group = null;
	private startGroup:eui.Group = null;
	private playGroup:eui.Group = null;
	// 方向键
	private leftBtn:eui.Button = null;
	private rightBtn:eui.Button = null;
	private upBtn:eui.Button = null;
	private downBtn:eui.Button = null;
	private goBtn:eui.Button = null;
	// 抓手
	private hand:Hand = null;

	private isTouch:Boolean = false; 
	private handSpeedX:number = 0;
	private handSpeedY:number = 0;
	public constructor() {
		super();
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
		this.skinName = "resource/skins/gameLayer.exml";
		// 计时器
		var timer:egret.Timer = new egret.Timer(10,0);
        timer.addEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.timerComFunc,this);
        //开始计时
        timer.start();
	}

	private uiCompHandler():void {
		console.log(" 进来了 。。。");
	}
	
	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
		if (instance == this.startBtn || instance == this.changeBtn || instance == this.wechatBtn || instance == this.giftBtn 
		|| instance == this.invateBtn || instance == this.kefuBtn || instance == this.payBtn || instance == this.taskBtn 
		|| instance == this.showBtn || instance == this.bagBtn || instance == this.goBtn) {
            instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
		}
		if (instance == this.leftBtn || instance == this.rightBtn || instance == this.upBtn || instance == this.downBtn ) {
            instance.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onButtonTouch, this);
            instance.addEventListener(egret.TouchEvent.TOUCH_END, this.onButtonTouch, this);
            instance.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onButtonTouch, this);
		}
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		// 抓手
		this.hand = new Hand();
		this.showGroup.addChild(this.hand);
	}

	private timerFunc(){
		if (this.isTouch) {
			this.hand.x = this.hand.x + this.handSpeedX; 
			this.hand.y = this.hand.y + this.handSpeedY; 
			if (this.hand.x < 0) this.hand.x = 0;
			if (this.hand.x > this.showGroup.width - 93) this.hand.x = this.showGroup.width - 93;
			if (this.hand.y > 0) this.hand.y = 0;
			if (this.hand.y < -50) this.hand.y = -50;
		}
    }
    private timerComFunc() {
        console.log("计时结束");
    }

	private pointX:number = 0;
	private pointY:number = 0;
	private onButtonTouch(e: egret.TouchEvent) {
		console.log(e.type);
		if (e.type == egret.TouchEvent.TOUCH_BEGIN) {
			this.isTouch = true;
			switch(e.target) {
				case this.upBtn:
				this.handSpeedY = -0.5;
				break;
				case this.downBtn:
				this.handSpeedY = 0.5;
				break;
				case this.leftBtn:
				this.handSpeedX = -1;
				this.hand.moveAction("left");
				break;
				case this.rightBtn:
				this.handSpeedX = 1;
				this.hand.moveAction("right");
				break;
			}
		}else {
			this.isTouch = false;
			this.handSpeedX = 0;
			this.handSpeedY = 0;
			var self = this;
			egret.Tween.get(this.hand, {loop:false}).wait(150).call(function(){
				self.hand.moveAction("none");
			});
		}
	}
	
    private onButtonClick(e: egret.TouchEvent) {
		switch(e.target) {
			case this.startBtn:
				this.startGroup.visible = false;
				this.playGroup.visible = true;
			break;
			case this.bagBtn:
				var bag = new Bag();
				this.addChild(bag);
			break;
			case this.payBtn:
				var charge = new Recharge();
				this.addChild(charge);
			break;
			case this.taskBtn:
				var task = new Task();
				this.addChild(task);
			break;
			case this.goBtn:
				this.hand.playAction();
			break;
			case this.changeBtn:
                AppCanvas.setGameState(2);
			break;
		}
    }
}