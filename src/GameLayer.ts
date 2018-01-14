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
	private lightGroup:eui.Group = null;

	private showGroup:eui.Group = null;
	private wawa01:eui.Image = null;
	private wawa02:eui.Image = null;
	private wawa03:eui.Image = null;
	private wawa04:eui.Image = null;
	private wawa05:eui.Image = null;
	private wawaArray:any[] = [];
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

	private nameText:eui.Label = null;
	public constructor() {
		super();
		// 计时器
		var timer:egret.Timer = new egret.Timer(10,0);
        timer.addEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.timerComFunc,this);
        //开始计时
        timer.start();

		this.skinName = "resource/skins/gameLayer.exml";
		// 抓手
		this.hand = new Hand();
		this.showGroup.addChild(this.hand);
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
	}

	private uiCompHandler():void {
		console.log(" 进来了 。。。");
		// 动画
		var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( RES.getRes("lightAction_json"), RES.getRes("lightAction_png") );
		var mc1:egret.MovieClip = new egret.MovieClip( mcFactory.generateMovieClipData( "buling" ) );
		this.lightGroup.addChild( mc1);
		mc1.gotoAndPlay( "action" ,-1);

		// wawa
		for (var i = 0; i < this.wawaArray.length; i++) {
			console.log(this.showGroup.getChildIndex(this.wawaArray[i]) + " =======");
		}

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
		if (instance == this.nameText) {
			this.nameText.text = Data.weChat_name;
		}
		if (instance == this.wawa01 || instance == this.wawa02 || instance == this.wawa03 || instance == this.wawa04 || instance == this.wawa05) {
			instance.texture = RES.getRes(Data.selectData.id + "_png");
			this.wawaArray.push(instance);
		}
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
	}

	private timerFunc(){
		if (this.isTouch) {
			this.hand.x = this.hand.x + this.handSpeedX; 
			this.hand.y = this.hand.y + this.handSpeedY; 
			if (this.hand.x < 0) this.hand.x = 0;
			if (this.hand.x > this.showGroup.width - 93) this.hand.x = this.showGroup.width - 93;
			if (this.hand.y > 0) this.hand.y = 0;
			if (this.hand.y < -70) this.hand.y = -70;
			var shadowY = this.hand.y + 534;
			// 影子和娃娃的层级显示
			if (shadowY < this.wawaArray[4].y && shadowY > this.wawaArray[0].y) {
				this.showGroup.setChildIndex( this.hand, 4 );
			}else {
				this.showGroup.setChildIndex( this.hand, 5 );
			}
			if (shadowY < this.wawaArray[0].y) {
				this.showGroup.setChildIndex( this.hand, 1 );
			}else {
				this.showGroup.setChildIndex( this.hand, 4 );
			}

			// 检测碰撞
			Data.onWawaIndex = -1;
			for (var i = 0 ; i < this.wawaArray.length; i++) {
				if (this.wawaArray[i].visible == true && Utils.isCheckCollide(new egret.Point(this.hand.x + 47, shadowY) , new egret.Rectangle(this.wawaArray[i].x-25, this.wawaArray[i].y-15, 50,30))){
					Data.onWawaIndex = i;
				}
			}
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
				// 是否抓中
				Utils.sendHttpServer("http://wawa.sz-ayx.com/api/winnig/index/userkey/" + Data.userKey + "/giftkey/" + Data.selectData.id, function(e:egret.Event) {
					var request = <egret.HttpRequest>e.currentTarget;
					console.log("winnig data : ",request.response);
					// 得到是否夹中结果
					Data.cmd_winnig = JSON.parse(request.response);
				});
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
				this.checkDirBtnStype(false);
				var self = this;
				var newWawa = null;
				this.hand.playAction(function(type) { // 0: 在空白区域抓 1:抓到娃娃 2:抓到娃娃失败 
					if (type == 0) {
						egret.Tween.get(self.hand,{loop:false}).to({x:0,y:0},400).call(function(){
							self.checkDirBtnStype(true);
							self.startGroup.visible = true;
							self.playGroup.visible = false;
							if (Data.cmd_winnig["state"] == 1 && newWawa != null) {
								console.log("提示抓到娃娃了");
								egret.Tween.get(newWawa,{loop:false}).to({y:newWawa.y+225, alpha:0},200).call(function(){
									newWawa.parent.removeChild(newWawa);
									newWawa = null;
								});
							}
						});
					}else if (type == 2) {
						var wawaNode = self.wawaArray[Data.onWawaIndex];
						egret.Tween.get(wawaNode,{loop:false}).to({y:wawaNode.y-20},100).to({y:wawaNode.y},100);
					}else if (type == 1) {
						self.wawaArray[Data.onWawaIndex].visible = false;
						if (newWawa == null) {
							newWawa = new eui.Image(RES.getRes(Data.selectData.id+"_png"));
							newWawa.y = self.hand.shadow.y;
							newWawa.x = -20;
							newWawa.scaleX = 0.4;
							newWawa.scaleY = 0.4;
							newWawa.anchorOffsetX = newWawa.width/2;
							newWawa.anchorOffsetY = 280;
							self.hand.addChild(newWawa);
							egret.Tween.get(newWawa,{loop:false}).to({y:newWawa.y-225},800);
						}
					}
				});
			break;
			case this.changeBtn:
                AppCanvas.setGameState(2);
			break;
			case this.showBtn:
				var show = new Show();
				this.addChild(show);
			break;
		}
    }

	private checkDirBtnStype(is:boolean) {
		this.upBtn.touchEnabled = is;
		this.downBtn.touchEnabled = is;
		this.leftBtn.touchEnabled = is;
		this.rightBtn.touchEnabled = is;
		this.goBtn.touchEnabled = is;
	}
}