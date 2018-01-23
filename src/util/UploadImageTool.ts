declare class EXIF {
    static getData(file: File, callback: Function);
    static getTag(file: File, tagName: string);
}

class UploadImageTool {
    public static imageSize:egret.Point = new egret.Point(640, 1050);

    private static mime = { 'png': 'image/png', 'jpg': 'image/jpeg', 'jpeg': 'image/jpeg', 'bmp': 'image/bmp' };

    private static mCall: Function;
    private static mObj: any;
    private static loadingFun: Function;

    private static mInit: boolean;

    public static showChoose(call: (texure: egret.RenderTexture) => void, obj: any, loadFun: Function = null): void {
        UploadImageTool.mCall = call;
        UploadImageTool.mObj = obj;
        UploadImageTool.loadingFun = loadFun;

        var fileInput: HTMLInputElement = document.getElementById("fileInput_xy") as HTMLInputElement;
        if (fileInput) {
            document.body.removeChild(fileInput);
            fileInput = null;
        }
        if (!fileInput) {
            fileInput = document.createElement('input') as HTMLInputElement;
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
    }


    private static onSelectFile(e: any) {
        var fileInput: HTMLElement = document.getElementById("fileInput_xy");
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
    }

    private static getUrlOf(file: File): string {
        if (window['URL'] != undefined)
            return window['URL']['createObjectURL'](file);
        else
            return window['webkitURL']['createObjectURL'](file);
    }

    private static tmpCreateImage(uri, file) {
        if (UploadImageTool.loadingFun) {
            UploadImageTool.loadingFun();
        }

		WaitConnect.openConnect();
        var image: HTMLImageElement = document.createElement("img");
        image.onload = function () {
            EXIF.getData(file, function () {
                var exifInfo = EXIF.getTag(file, 'Orientation');
                /*
                    0°	1
                    顺时针90°	6
                    逆时针90°	8
                    180°	3
                */

                var texture: egret.RenderTexture = new egret.RenderTexture();

                var bmd:egret.BitmapData = new egret.BitmapData(image);
                var bmp: egret.Bitmap = new egret.Bitmap(bmd);

                var sp: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
                sp.addChild(bmp);
                var r: string = exifInfo + '';


                var w: number = bmd.width;
                var h: number = bmd.height;
                var scale: number = Math.min(UploadImageTool.imageSize.y / h, UploadImageTool.imageSize.x / w, 1);

                w *= scale;
                h *= scale;

                bmp.width = w;
                bmp.height = h;

                w = Math.round(w);
                h = Math.round(h);
                var rect: egret.Rectangle = new egret.Rectangle(0, 0, w, h);
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
        }
        image.src = uri;
        image.style.display = 'none';
        document.body.appendChild(image);
    }

}