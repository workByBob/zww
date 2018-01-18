var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Show = (function (_super) {
    __extends(Show, _super);
    function Show() {
        var _this = _super.call(this) || this;
        _this.closeBtn = null;
        _this.editText = null;
        _this.ciBtn = null;
        _this.showWrite = null;
        _this.sureBtn = null;
        _this.mBmp = null;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.uiCompHandler, _this);
        _this.skinName = "resource/skins/show.exml";
        return _this;
    }
    Show.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
        if (instance == this.closeBtn || instance == this.ciBtn || instance == this.sureBtn) {
            instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        }
        if (instance == this.editText) {
        }
    };
    Show.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    Show.prototype.uiCompHandler = function () {
    };
    Show.prototype.onButtonClick = function (e) {
        switch (e.target) {
            case this.closeBtn:
                this.parent.removeChild(this);
                break;
            case this.ciBtn:
                UploadImageTool.showChoose(this.onData, this);
                break;
            case this.sureBtn:
                // 转base64
                var mydisp = this.mBmp;
                var rt = new egret.RenderTexture(); //建立缓冲画布
                rt.drawToTexture(mydisp, new egret.Rectangle(0, 0, mydisp.width, mydisp.height)); //将对象画到缓冲画布上（可指定画对象的某个区域，或画整个）
                var imageBase64 = rt.toDataURL("image/jpeg"); //转换为图片base64。  
                console.log(imageBase64);
                if (this.mBmp == null) {
                    alert("没有上传自己和娃娃的美照～");
                }
                if (this.editText.text == "" || this.editText.text.length < 30) {
                    alert("请输入不少于30字的玩家秀内容");
                }
                break;
        }
    };
    Show.prototype.onData = function (texture) {
        console.log(" ===============");
        Data.textureHead = texture;
        this.drawTextureHead();
    };
    Show.prototype.drawTextureHead = function () {
        var self = this;
        AppCanvas.addChild(new PhotoClip(Data.textureHead, function (texture_) {
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
            var width_ = 50 / self.mBmp.width;
            self.mBmp.width = width_ * self.mBmp.width;
            self.mBmp.height *= width_;
        }));
    };
    return Show;
}(eui.Component));
__reflect(Show.prototype, "Show", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=Show.js.map