var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Show = (function (_super) {
    __extends(Show, _super);
    function Show() {
        var _this = _super.call(this) || this;
        _this.closeBtn = null;
        _this.editText = null;
        _this.ciBtn = null;
        _this.showWrite = null;
        _this.showAll = null;
        _this.cellMaxNum = 0;
        _this.scrollerShow = null;
        _this.imgScroller = null;
        _this.publishBtn = null;
        _this.showMyself = null;
        _this.sureBtn = null;
        _this.mBmp = null;
        _this._texture = null;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.uiCompHandler, _this);
        _this.skinName = "resource/skins/show.exml";
        return _this;
    }
    Show.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
        if (instance == this.closeBtn || instance == this.ciBtn || instance == this.sureBtn || instance == this.publishBtn) {
            instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        }
        if (instance == this.scrollerShow) {
            instance.addEventListener(eui.UIEvent.CHANGE_END, this.onScroll, this);
        }
    };
    Show.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    Show.prototype.onScroll = function (e) {
        switch (e.type) {
            case "changeEnd":
                // 300 是cell高，400 是显示区域高
                if (this.scrollerShow.viewport.scrollV >= this.cellMaxNum * 300 - 400) {
                    this.sendGetAllShowCommond();
                }
                break;
        }
    };
    Show.prototype.setShowState = function (group) {
        this.showAll.visible = false;
        this.showWrite.visible = false;
        this.showMyself.visible = false;
        group.visible = true;
    };
    Show.prototype.uiCompHandler = function () {
        // 初始化 showAll
        this.setShowState(this.showAll);
        this.sendGetAllShowCommond();
    };
    Show.prototype.sendGetAllShowCommond = function () {
        Utils.sendHttpServer("http://wawa.sz-ayx.com//api/Beautiful/Beautiful/userkey/" + Data.userKey, true, function (e) {
            WaitConnect.closeConnect(500);
            var request = e.currentTarget;
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
            }
            else {
                alert("error 返回玩家秀信息失败");
            }
        }, this);
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
                var img = new egret.Bitmap();
                img.texture = this._texture;
                var mydisp = img;
                var rt = new egret.RenderTexture(); //建立缓冲画布
                rt.drawToTexture(mydisp, new egret.Rectangle(0, 0, mydisp.width, mydisp.height)); //将对象画到缓冲画布上（可指定画对象的某个区域，或画整个）
                var imageBase64 = rt.toDataURL("image/jpeg"); //转换为图片base64。  
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
                var sendDataStr = '{"userkey":"' + Data.userKey + '","data":"' + imageBase64 + '","contens":"' + Utils.getChar(this.editText.text, 45 * 3) + '"}';
                Utils.sendHttpPostServer("http://wawa.sz-ayx.com/api/Beautiful/index", sendDataStr, function (e) {
                    WaitConnect.closeConnect();
                    // 上传头像
                    console.log("Beautiful data : ", e.target.data);
                    var cmd_data = JSON.parse(e.target.data);
                    switch (cmd_data["state"]) {
                        case "1":
                            alert(cmd_data["msg"]);
                            this.setShowState(this.showAll);
                            break;
                        case "2":
                            alert(cmd_data["msg"]);
                            break;
                    }
                }, this);
                break;
            case this.publishBtn:
                this.setShowState(this.showWrite);
                break;
        }
    };
    Show.prototype.onData = function (texture) {
        WaitConnect.closeConnect();
        Data.textureHead = texture;
        this.drawTextureHead();
    };
    Show.prototype.drawTextureHead = function () {
        var self = this;
        AppCanvas.addChild(new PhotoClip(Data.textureHead, function (texture_) {
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
            var width_ = 50 / self.mBmp.width;
            self.mBmp.width = width_ * self.mBmp.width;
            self.mBmp.height *= width_;
        }));
    };
    return Show;
}(eui.Component));
__reflect(Show.prototype, "Show", ["eui.UIComponent", "egret.DisplayObject"]);
var ShowCell = (function (_super) {
    __extends(ShowCell, _super);
    function ShowCell(cellData) {
        var _this = _super.call(this) || this;
        _this.descLabel = null;
        _this.nameLabel = null;
        _this.time = null;
        _this.img = null;
        _this.headImg = null;
        _this._cellData = null;
        _this._cellData = cellData;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.uiCompHandler, _this);
        _this.skinName = "resource/skins/showCell.exml";
        return _this;
    }
    ShowCell.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    ShowCell.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    ShowCell.prototype.uiCompHandler = function () {
        var _this = this;
        // desc
        this.descLabel.text = this._cellData["contens"];
        this.descLabel.width = 270;
        this.descLabel.height = 50;
        this.descLabel.wordWrap = true;
        // name 
        this.nameLabel.text = this._cellData["username"];
        this.nameLabel.anchorOffsetX = this.nameLabel.width / 2;
        // time
        this.time.text = Utils.getLocalTime(this._cellData["addtime"]);
        this.time.anchorOffsetX = this.time.width;
        // img 
        var img = document.createElement("img");
        img.src = this._cellData["img"];
        img.onload = function () {
            var texture = new egret.Texture();
            var bitmapdata = new egret.BitmapData(img);
            texture.bitmapData = bitmapdata;
            // img
            var imgReview = new egret.Bitmap(texture);
            imgReview.y = _this.img.y;
            imgReview.x = _this.img.x;
            _this.addChild(imgReview);
            var rate = _this.img.width / imgReview.width;
            imgReview.width *= rate;
            imgReview.height *= rate;
        };
        // head
        RES.getResByUrl(this._cellData["userheader"], getResComplete, this, RES.ResourceItem.TYPE_IMAGE);
        function getResComplete(data) {
            // this.headImg.source = data;
            var imgReview = new egret.Bitmap(data);
            var rate = this.headImg.width / imgReview.width;
            imgReview.x = this.headImg.x;
            imgReview.y = this.headImg.y;
            this.addChild(imgReview);
            imgReview.width *= rate;
            imgReview.height *= rate;
        }
    };
    return ShowCell;
}(eui.Component));
__reflect(ShowCell.prototype, "ShowCell", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=Show.js.map