class PhotoClip extends eui.Component implements eui.UIComponent {

	private sureBtn:eui.Button = null;
	private scrollG:eui.Group = null;
    private mBmp:egret.Bitmap = null;
	private imageGroup:eui.Group = null;
	private _texture:egret.RenderTexture = null;
	private _callback:Function = null;
	private rect:eui.Image = null;
	public constructor(texture: egret.RenderTexture, callback:Function) {
		super();
		this._texture = texture;
		this._callback = callback;
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
		this.skinName = "resource/skins/photoClip.exml";
	}

    protected partAdded(partName:string, instance:any) {
        super.partAdded(partName, instance);
		if (instance == this.sureBtn) {
            instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
		}
		if (instance == this.rect) {
			instance.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
			instance.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
			instance.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
			instance.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouch, this);
		}
    }

	private uiCompHandler():void {
        this.mBmp = new egret.Bitmap();
        this.imageGroup.addChild(this.mBmp);
        this.mBmp.texture = this._texture;
		this.mBmp.x = this.rect.x;
		this.mBmp.y = this.rect.y;
		var rateW = 300/this.mBmp.width;
		var rateH = 300/this.mBmp.height;

		//建立缓冲画布
		var rt: egret.RenderTexture = new egret.RenderTexture();  
		if (this.mBmp.width >= this.mBmp.height) {
			this.mBmp.height = this.mBmp.height * rateH;
			this.mBmp.width = this.mBmp.width * rateH;
			this.mBmp.x = this.rect.x - (this.mBmp.width-300)/2;
			rt.drawToTexture(this.mBmp, new egret.Rectangle((this.rect.x-this.mBmp.x), 0, 300, 300));
		}else {
			this.mBmp.height = this.mBmp.height * rateW;
			this.mBmp.width = this.mBmp.width * rateW;
			this.mBmp.y = this.rect.y - (this.mBmp.height-300)/2;
        	rt.drawToTexture(this.mBmp, new egret.Rectangle(0, (this.rect.y-this.mBmp.y), 300, 300));
		}
		this._texture = rt;
	}

	protected childrenCreated():void {
		super.childrenCreated();

	}

    private onButtonClick(e: egret.TouchEvent) {
		switch(e.target) {
			case this.sureBtn:
			this.parent.removeChild(this);
			this._callback(this._texture);
			break;
		}
    }

	private touchX:number = 0;
	private touchY:number = 0;
	private isTouch:boolean = false;
	private onTouch(e: egret.TouchEvent) {
		if (e.type == egret.TouchEvent.TOUCH_BEGIN) {
			this.touchX = e.localX;
			this.touchY = e.localY;
			this.isTouch = true;
		}else if (e.type == egret.TouchEvent.TOUCH_MOVE) {
			if (!this.isTouch) return;
			this.mBmp.x += e.localX - this.touchX;
			this.mBmp.y += e.localY - this.touchY;

			this.touchX = e.localX;
			this.touchY = e.localY;

			if (this.mBmp.x >= this.rect.x) this.mBmp.x = this.rect.x;
			if (this.mBmp.x + this.mBmp.width <= this.rect.x + this.rect.width) this.mBmp.x = this.rect.x - (this.mBmp.width - this.rect.width);
			if (this.mBmp.y >= this.rect.y) this.mBmp.y = this.rect.y;
			if (this.mBmp.y + this.mBmp.height <= this.rect.y + this.rect.height) this.mBmp.y = this.rect.y - (this.mBmp.height - this.rect.height)
		}else {
			this.isTouch = false;
		}
	}
}
