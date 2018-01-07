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
/**
 * 下面的示例使用 WebSocketExample 类创建新 WebSocket 对象，然后与服务器通讯。
 */
var socket = null;
var WebSocketExample = (function (_super) {
    __extends(WebSocketExample, _super);
    function WebSocketExample() {
        var _this = _super.call(this) || this;
        _this.text = "TestWebSocket";
        socket = _this;
        _this.initStateText();
        _this.initWebSocket();
        return _this;
    }
    WebSocketExample.prototype.initStateText = function () {
        this.stateText = new egret.TextField();
        this.stateText.size = 22;
        this.stateText.text = this.text;
        this.stateText.width = 480;
        this.addChild(this.stateText);
    };
    WebSocketExample.prototype.initWebSocket = function () {
        //创建 WebSocket 对象
        this.socket = new egret.WebSocket();
        //设置数据格式为二进制，默认为字符串
        this.socket.type = egret.WebSocket.TYPE_BINARY;
        //添加收到数据侦听，收到数据会调用此方法
        this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        //添加链接打开侦听，连接成功会调用此方法
        this.socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        //添加链接关闭侦听，手动关闭或者服务器关闭连接会调用此方法
        this.socket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
        //添加异常侦听，出现异常会调用此方法
        this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
        //连接服务器
        this.socket.connect("echo.websocket.org", 80);
    };
    WebSocketExample.prototype.sendData = function (array) {
        // 创建 ByteArray 对象
        var byte = new egret.ByteArray();
        // 数据 
        var data = array[0];
        byte.writeUTF("zww");
        // 写入指令号
        byte.writeUTF(data.commond);
        // 数据长度
        var infoData = data.info;
        if (infoData && infoData.length > 0) {
            for (var i = 0; i < infoData.length; i++) {
                var typeOut = typeof (infoData[i]);
                if (typeOut == "number")
                    byte.writeInt(infoData[i]);
                if (typeOut == "string")
                    byte.writeUTF(infoData[i]);
                if (typeOut == "boolean")
                    byte.writeBoolean(infoData[i]);
            }
        }
        byte.writeUTF("end");
        byte.position = 0;
        // 发送数据
        this.socket.writeBytes(byte, 0, byte.bytesAvailable);
    };
    WebSocketExample.prototype.onSocketOpen = function () {
        this.trace(">>>>>>>>>>>>>>> WebSocketOpen <<<<<<<<<<<<<<<<<");
    };
    WebSocketExample.prototype.onSocketClose = function () {
        this.trace(">>>>>>>>>>>>>>> WebSocketClose <<<<<<<<<<<<<<<<<");
    };
    WebSocketExample.prototype.onSocketError = function () {
        this.trace(">>>>>>>>>>>>>>> WebSocketError <<<<<<<<<<<<<<<<<");
    };
    WebSocketExample.prototype.onReceiveMessage = function (e) {
        // 创建 ByteArray 对象
        var byte = new egret.ByteArray();
        // 读取数据
        this.socket.readBytes(byte);
        // 跳过指令头"zww"获取数据
        byte.position = 5;
        //读取字符串信息
        var commond = byte.readUTF();
        // 登录指令 
        if (commond == "login") {
        }
        // 解析指令尾，error则是解析位数出错
        var end = byte.readUTF();
        if (end == "end") {
            this.trace("[" + commond + "] 指令解析sucess");
        }
        else {
            this.trace("[" + commond + "] 指令解析error");
        }
    };
    WebSocketExample.prototype.trace = function (msg) {
        this.text = this.text + "\n" + msg;
        this.stateText.text = this.text;
        egret.log(msg);
    };
    return WebSocketExample;
}(egret.DisplayObjectContainer));
__reflect(WebSocketExample.prototype, "WebSocketExample");
//# sourceMappingURL=WebSocket.js.map