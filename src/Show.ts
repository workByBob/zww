class Show extends eui.Component implements eui.UIComponent {

	private closeBtn:eui.Button = null;
	private editText:eui.EditableText = null;
	private ciBtn:eui.Button = null;
	private showWrite:eui.Group = null;

	private sureBtn:eui.Button = null;
    private mBmp:egret.Bitmap = null;
	public constructor() {
		super();
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
		this.skinName = "resource/skins/show.exml";

	}

    protected partAdded(partName:string, instance:any) {
        super.partAdded(partName, instance);
		if (instance == this.closeBtn || instance == this.ciBtn || instance == this.sureBtn) {
            instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
		}
		if (instance == this.editText) {
		}
    }

	protected childrenCreated():void {
		super.childrenCreated();                         
	}

	private uiCompHandler() {
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
				var mydisp:any = this.mBmp;
				var rt: egret.RenderTexture = new egret.RenderTexture();   //建立缓冲画布
				rt.drawToTexture(mydisp, new egret.Rectangle(0, 0, mydisp.width, mydisp.height));  //将对象画到缓冲画布上（可指定画对象的某个区域，或画整个）
				var imageBase64:string = rt.toDataURL("image/jpeg");  //转换为图片base64。  
				console.log(imageBase64);
				if (this.mBmp == null) {
					alert("没有上传自己和娃娃的美照～");
				}
				if (this.editText.text == "" || this.editText.text.length < 30) {
					alert("请输入不少于30字的玩家秀内容");
				}
			break;
		}
    }

    private onData(texture: egret.RenderTexture):void{
		console.log(" ===============");
		Data.textureHead = texture;
		this.drawTextureHead();
    }

	private drawTextureHead(){
		var self = this;
		AppCanvas.addChild(new PhotoClip(Data.textureHead, function(texture_){
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
			// self.ciBtn.visible = false;
			// self.ciBtn.touchEnabled = false;
			// 等比例缩小
			var width_ = 50/self.mBmp.width ;
			self.mBmp.width = width_ * self.mBmp.width;
			self.mBmp.height *= width_;
		}));
	}
}
