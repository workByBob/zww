class Show extends eui.Component implements eui.UIComponent {

	private closeBtn:eui.Button = null;
	private editText:eui.EditableText = null;
	private ciBtn:eui.Button = null;
	private showWrite:eui.Group = null;
	private showAll:eui.Group = null;
	private cellMaxNum:number = 0;
	private scrollerShow:eui.Scroller = null;
	private imgScroller:eui.Scroller = null;
	private publishBtn:eui.Button = null;
	private showMyself:eui.Group = null;

	private sureBtn:eui.Button = null;
    private mBmp:egret.Bitmap = null;
	private _texture = null;

	public constructor() {
		super();
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
		this.skinName = "resource/skins/show.exml";

	}

    protected partAdded(partName:string, instance:any) {
        super.partAdded(partName, instance);
		if (instance == this.closeBtn || instance == this.ciBtn || instance == this.sureBtn || instance == this.publishBtn) {
            instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
		}
		if (instance == this.scrollerShow) {
			instance.addEventListener(eui.UIEvent.CHANGE_END, this.onScroll, this);
		}
    }

	protected childrenCreated():void {
		super.childrenCreated();                         
	}

	private onScroll(e: eui.UIEvent) {
		switch(e.type) {
			case "changeEnd":
				// 300 是cell高，400 是显示区域高
				if (this.scrollerShow.viewport.scrollV >= this.cellMaxNum * 300 - 400) {
					this.sendGetAllShowCommond();
				}
			break;
		}
	}

	private setShowState(group:eui.Group) {
		this.showAll.visible = false;
		this.showWrite.visible = false;
		this.showMyself.visible = false;
		group.visible = true;
	}

	private uiCompHandler() {
		// 初始化 showAll
		this.setShowState(this.showAll);
		this.sendGetAllShowCommond();
	}

	private sendGetAllShowCommond(){
		Utils.sendHttpServer("http://wawa.sz-ayx.com//api/Beautiful/Beautiful/userkey/" + Data.userKey, true, function(e:egret.Event) {
			WaitConnect.closeConnect(500);
			var request = <egret.HttpRequest>e.currentTarget;
			// console.log("Beautiful data : ",request.response);
			var data = JSON.parse(request.response);
			if (data["state"] == 1) {  
				// ok
				// 得到用户所有头像数据
				Data.cmd_pictures = eval(data["data"]);
				// console.log("Beautiful data : ",Data.cmd_pictures);
				var size = Data.cmd_pictures.length;
				for (var i = 0; i < size; i++) {
					var cell = new ShowCell(Data.cmd_pictures[i]);
					cell.y = this.cellMaxNum * 300 + i * 300;
					this.imgScroller.addChild(cell);
				}
				this.cellMaxNum += size;
			}else {
				alert("error 返回玩家秀信息失败");
			}
		}, this);
	}
 
    private onButtonClick(e: egret.TouchEvent) {
		switch(e.target) {
			case this.closeBtn:
				this.parent.removeChild(this);
			break;
			case this.ciBtn:
        		UploadImageTool.showChoose(this.onData, this);
			break;
			case this.sureBtn:
				// 转base64
				var img = new egret.Bitmap()
				img.texture = this._texture;
				var mydisp:any = img;
				var rt: egret.RenderTexture = new egret.RenderTexture();   //建立缓冲画布
				rt.drawToTexture(mydisp, new egret.Rectangle(0, 0, mydisp.width, mydisp.height));  //将对象画到缓冲画布上（可指定画对象的某个区域，或画整个）
				var imageBase64:string = rt.toDataURL("image/jpeg");  //转换为图片base64。  
				// console.log(imageBase64);
				if (this.mBmp == null) {
					alert("没有上传自己和娃娃的美照～");
					return;
				}
				if (this.editText.text == "" || this.editText.text.length < 30) {
					alert("请输入不少于30字的玩家秀内容");
					return;
				}
				WaitConnect.openConnect();
			    var sendDataStr = '{"userkey":"'+Data.userKey+'","data":"'+ imageBase64 + '","contens":"'+Utils.getChar(this.editText.text, 45*3) +'"}';
				Utils.sendHttpPostServer("http://wawa.sz-ayx.com/api/Beautiful/index" , sendDataStr, function(e:egret.Event) {
					WaitConnect.closeConnect();
					// 上传头像
					console.log("Beautiful data : ",e.target.data);
					var cmd_data = JSON.parse(e.target.data)
					switch(cmd_data["state"]){
						case "1":
							alert(cmd_data["msg"]);
							this.setShowState(this.showAll);
						break;
						case "2":
							alert(cmd_data["msg"]);
						break;
					}
				},this);

			break;
			case this.publishBtn:
				this.setShowState(this.showWrite);
			break;
		}
    }

    private onData(texture: egret.RenderTexture):void{
		WaitConnect.closeConnect();
		Data.textureHead = texture;
		this.drawTextureHead();
    }


	private drawTextureHead(){
		var self = this;
		AppCanvas.addChild(new PhotoClip(Data.textureHead, function(texture_){
			self._texture = texture_;
			if (self.mBmp != null) {
				self.mBmp.parent.removeChild(self.mBmp);
				self.mBmp = null;
			}
			self.mBmp = new egret.Bitmap();
			self.showWrite.addChild(self.mBmp);
			self.mBmp.texture = texture_;
			self.mBmp.x = self.ciBtn.x;
			self.mBmp.y = self.ciBtn.y;

			// 按钮隐藏
			self.ciBtn.visible = false;
			self.ciBtn.touchEnabled = false;
			// 等比例缩小
			var width_ = 50/self.mBmp.width ;
			self.mBmp.width = width_ * self.mBmp.width;
			self.mBmp.height *= width_;
		}));
	}
}




class ShowCell extends eui.Component implements eui.UIComponent {
	private descLabel:eui.Label = null;
	private nameLabel:eui.Label = null;
	private time:eui.Label = null;
	private img:eui.Image = null;
	private headImg:eui.Image = null;
	private _cellData = null;
	public constructor(cellData) {
		super();
		this._cellData = cellData;
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
		this.skinName = "resource/skins/showCell.exml";
	}

    protected partAdded(partName:string, instance:any) {
        super.partAdded(partName, instance);
    }

	protected childrenCreated():void {
		super.childrenCreated();                         
	}

	private uiCompHandler() {
		// desc
		this.descLabel.text = this._cellData["contens"];
		this.descLabel.width = 270;
		this.descLabel.height = 50;
		this.descLabel.wordWrap = true;
		// name 
		this.nameLabel.text = this._cellData["username"];
		this.nameLabel.anchorOffsetX = this.nameLabel.width/2;
		// time
		this.time.text = Utils.getLocalTime(this._cellData["addtime"]);
		this.time.anchorOffsetX = this.time.width;
		// img 
		let img = document.createElement("img");
		img.src = this._cellData["img"];
		img.onload = () => {
			let texture:egret.Texture = new egret.Texture();
			let bitmapdata:egret.BitmapData = new egret.BitmapData(img);
			texture.bitmapData = bitmapdata;
			// img
			let imgReview: egret.Bitmap = new egret.Bitmap(texture);
			imgReview.y = this.img.y;
			imgReview.x = this.img.x;
			this.addChild(imgReview);
			var rate = this.img.width/imgReview.width;
			imgReview.width *= rate;
			imgReview.height *= rate;
		}
		// head
		RES.getResByUrl(this._cellData["userheader"], getResComplete, this, RES.ResourceItem.TYPE_IMAGE);
		function getResComplete(data:any):void {
			// this.headImg.source = data;
            var imgReview:egret.Bitmap = new egret.Bitmap(data);
			var rate = this.headImg.width/imgReview.width;
            imgReview.x = this.headImg.x;
            imgReview.y = this.headImg.y;
            this.addChild(imgReview);
			imgReview.width *= rate;
			imgReview.height *= rate;
		}
	}
}