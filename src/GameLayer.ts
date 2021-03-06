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
	private wawaInfoBtn:eui.Button = null;
	private noticeLabel:eui.Label = null;

	private showGroup:eui.Group = null;
	private wawa01:eui.Image = null;
	private wawa02:eui.Image = null;
	private wawa03:eui.Image = null;
	private wawa04:eui.Image = null;
	private wawa05:eui.Image = null;
	private wawaArray:any[] = [];
	private startGroup:eui.Group = null;
	private prizeLabel:eui.Label = null;
	private playGroup:eui.Group = null;
	private scoreText:eui.Label = null;
	private luckyBar:eui.Image = null;
	private luckyText:eui.Label = null;
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
	private timerOut:egret.Timer = null;
	private timeOut:eui.BitmapLabel = null;
	private maxTime:number = 15;
	private headGroup:eui.Group = null;
	private friends:eui.Label = null;
	private onlines:eui.Label = null;
	public constructor() {
		super();
		// 计时器
		var timer:egret.Timer = new egret.Timer(10,0);
        timer.addEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.timerComFunc,this);
        //开始计时
        timer.start();

        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
		this.skinName = "resource/skins/gameLayer.exml";
		// 抓手
		this.hand = new Hand();
		this.showGroup.addChild(this.hand);
	}

	private uiCompHandler():void {
		console.log(" 进来了 。。。");
		// 动画
		var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( RES.getRes("lightAction_json"), RES.getRes("lightAction_png") );
		var mc1:egret.MovieClip = new egret.MovieClip( mcFactory.generateMovieClipData( "buling" ) );
		this.lightGroup.addChild( mc1);
		mc1.gotoAndPlay( "action" ,-1);

		// 显示单价
		this.prizeLabel.text = Data.selectData["cost"];
		// 第一次刷新总金币
		this.setGameScore(Data.cmd_userInfo["userCoin"]);
		// 第一次刷新幸运值
		this.updateLuckyValue();

		this.showNotice("欢迎来到 就爱抓娃娃 房间～");

		// 计时器
		this.timerOut = new egret.Timer(1000,0);
        this.timerOut.addEventListener(egret.TimerEvent.TIMER,this.Func,this);
        this.timerOut.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.ComFunc,this);

		// 在线数据
		Utils.sendHttpServer("http://wawa.sz-ayx.com/api/online/index/userkey/" + Data.userKey, false, function(e:egret.Event) {
			WaitConnect.closeConnect();
			var request = <egret.HttpRequest>e.currentTarget;
			console.log("online data : ",request.response);
			var data = JSON.parse(request.response);
			// 显示在线数量
			this.onlines.text = data["count"];
			// 显示在线玩家头像
			var onlineHeads = data["data"];
		}, this);
	}

	private Func(){
		if (this.maxTime >= 0) {
			this.maxTime -= 1;
			this.timeOut.text = this.maxTime+"";
		}else {
			this.timerOut.stop();
			this.goBtnDown();
		}
	}
    private ComFunc() {
		this.maxTime = 15;
        console.log("计时结束");
    }

	private showNotice(str:string) {
		this.noticeLabel.text = str;
		var width = this.noticeLabel.width;
		egret.Tween.get(this.noticeLabel,{loop:true}).to({x:640},0).to({x:-width},10000);
	}
	
	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
		if (instance == this.startBtn || instance == this.changeBtn || instance == this.wechatBtn || instance == this.giftBtn 
		|| instance == this.invateBtn || instance == this.kefuBtn || instance == this.payBtn || instance == this.taskBtn 
		|| instance == this.showBtn || instance == this.bagBtn || instance == this.goBtn || instance == this.wawaInfoBtn) {
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
				// 判断手中金币是否够
				if (this.getGameScore() >= Data.selectData["cost"]) {
					this.startGroup.visible = false;
					this.playGroup.visible = true;
					// 是否抓中
					Utils.sendHttpServer("http://wawa.sz-ayx.com/api/usercoin/index/userkey/" + Data.userKey + "/userCoin/" + Data.selectData.cost + "/giftkey/" + Data.selectData.id, false, function(e:egret.Event) {
        				WaitConnect.closeConnect();
						var request = <egret.HttpRequest>e.currentTarget;
						console.log("winnig data : ",request.response);
						// 得到是否夹中结果
						Data.cmd_winnig = JSON.parse(request.response);
						console.log("winnig data : ",Data.cmd_winnig["msg"]);
						// 刷新当前币数
						this.setGameScore(Data.cmd_winnig["userCoin"]);
						// 开始倒计时
						this.timerOut.start();
					}, this);
				}else {
					this.addChild(new Recharge());
				}
			break;
			case this.bagBtn:
				var bag = new Bag();
				this.addChild(bag);
			break;
			case this.payBtn:
				this.addChild(new Recharge());
			break;
			case this.taskBtn:
				var task = new Task();
				this.addChild(task);
			break;
			case this.goBtn:
				this.goBtnDown();
			break;
			case this.changeBtn:
                AppCanvas.setGameState(2);
			break;
			case this.showBtn:
				var show = new Show();
				this.addChild(show);
			break;
			case this.wawaInfoBtn:
				var wawa = new Info();
				this.addChild(wawa);
			break;
		}
    }

	private goBtnDown() {
		this.timerOut.stop();
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
					// 每抓一次结束更新一次幸运值
					self.updateLuckyValue();
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
	}

	private checkDirBtnStype(is:boolean) {
		this.upBtn.touchEnabled = is;
		this.downBtn.touchEnabled = is;
		this.leftBtn.touchEnabled = is;
		this.rightBtn.touchEnabled = is;
		this.goBtn.touchEnabled = is;
	}

	// 刷新总金币 
	private setGameScore(score) {
		Data.cmd_userInfo["userCoin"] = score;
		this.scoreText.text = score;
	}
    // 获得金币
	private getGameScore():number {
		return Data.cmd_userInfo["userCoin"];
	}

	private updateLuckyValue() {
		Utils.sendHttpServer("http://wawa.sz-ayx.com/api/Winnig/luck/userkey/" + Data.userKey , false, function(e:egret.Event) {
			WaitConnect.closeConnect();
			var request = <egret.HttpRequest>e.currentTarget;
			console.log("luck data : ",request.response);
			// luck返回信息
			var data = JSON.parse(request.response);
			// 成功
			if (data["state"] == "1") {
				var luckValue = JSON.parse(data["data"])["luck"];
				// bar
				egret.Tween.get(this.luckyBar, {loop:false}).to({width:350/100 * luckValue},500);
				// Label
				this.luckyText.text = "幸运值：" + luckValue + "/100";
			}
		}, this);
	}
}