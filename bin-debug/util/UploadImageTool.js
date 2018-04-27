var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var UploadImageTool = (function () {
    function UploadImageTool() {
    }
    UploadImageTool.showChoose = function (call, obj, loadFun) {
        if (loadFun === void 0) { loadFun = null; }
        UploadImageTool.mCall = call;
        UploadImageTool.mObj = obj;
        UploadImageTool.loadingFun = loadFun;
        var fileInput = document.getElementById("fileInput_xy");
        if (fileInput) {
            document.body.removeChild(fileInput);
            fileInput = null;
        }
        if (!fileInput) {
            fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*;';
            if (fileInput['capture']) {
                fileInput['capture'] = 'capture';
            }
            fileInput.style.zIndex = '-999';
            fileInput.style.position = 'absolute;';
            fileInput.style.display = 'none';
            fileInput.id = 'fileInput_xy';
            document.body.appendChild(fileInput);
        }
        // if (!UploadImageTool.mInit) {
        UploadImageTool.mInit = true;
        fileInput.onchange = UploadImageTool.onSelectFile;
        // }
        fileInput.click();
    };
    UploadImageTool.onSelectFile = function (e) {
        var fileInput = document.getElementById("fileInput_xy");
        var file = fileInput['files'][0];
        if (!file) {
            return;
        }
        var type = file.type;
        if (!type) {
            type = UploadImageTool.mime[file.name.match(/\.([^\.]+)$/i)[1]];
        }
        var ret = UploadImageTool.getUrlOf(file);
        UploadImageTool.tmpCreateImage(ret, file);
    };
    UploadImageTool.getUrlOf = function (file) {
        if (window['URL'] != undefined)
            return window['URL']['createObjectURL'](file);
        else
            return window['webkitURL']['createObjectURL'](file);
    };
    UploadImageTool.tmpCreateImage = function (uri, file) {
        if (UploadImageTool.loadingFun) {
            UploadImageTool.loadingFun();
        }
        WaitConnect.openConnect();
        var image = document.createElement("img");
        image.onload = function () {
            EXIF.getData(file, function () {
                var exifInfo = EXIF.getTag(file, 'Orientation');
                /*
                    0°	1
                    顺时针90°	6
                    逆时针90°	8
                    180°	3
                */
                var texture = new egret.RenderTexture();
                var bmd = new egret.BitmapData(image);
                var bmp = new egret.Bitmap(bmd);
                var sp = new egret.DisplayObjectContainer();
                sp.addChild(bmp);
                var r = exifInfo + '';
                var w = bmd.width;
                var h = bmd.height;
                var scale = Math.min(UploadImageTool.imageSize.y / h, UploadImageTool.imageSize.x / w, 1);
                w *= scale;
                h *= scale;
                bmp.width = w;
                bmp.height = h;
                w = Math.round(w);
                h = Math.round(h);
                var rect = new egret.Rectangle(0, 0, w, h);
                switch (r) {
                    case '3':
                        bmp.rotation = 180;
                        bmp.x = w;
                        bmp.y = h;
                        rect.width = w;
                        rect.height = h;
                        break;
                    case '6':
                        bmp.rotation = 90;
                        bmp.x = h;
                        rect.width = h;
                        rect.height = w;
                        break;
                    case '8':
                        bmp.rotation = -90;
                        bmp.y = w;
                        rect.width = h;
                        rect.height = w;
                        break;
                }
                texture.drawToTexture(sp, rect);
                UploadImageTool.mCall.apply(UploadImageTool.mObj, [texture]);
                UploadImageTool.mCall = null;
                UploadImageTool.mObj = null;
                UploadImageTool.loadingFun = null;
            });
            document.body.removeChild(image);
        };
        image.src = uri;
        image.style.display = 'none';
        document.body.appendChild(image);
    };
    UploadImageTool.imageSize = new egret.Point(640, 1050);
    UploadImageTool.mime = { 'png': 'image/png', 'jpg': 'image/jpeg', 'jpeg': 'image/jpeg', 'bmp': 'image/bmp' };
    return UploadImageTool;
}());
__reflect(UploadImageTool.prototype, "UploadImageTool");
//# sourceMappingURL=UploadImageTool.js.map