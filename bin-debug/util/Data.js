var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Data = (function () {
    function Data() {
    }
    return Data;
}());
// 微信信息
Data.weChat_name = "";
Data.weChat_headUrl = "";
Data.weChat_from = "";
Data.weChat_openid = "";
// 微信appid 
Data.wx_appId = "wxdfb3530f672883c1";
// 微信sceret
Data.wx_secret = "3703eb5b3f6eb5aa64d82fa553ed90e";
Data.userKey = "oexAxwoclOGqj-CFIq0NULqlx2xs";
// 娃娃json数据表
Data.wawaJson = null;
// 选中的娃娃信息
Data.selectData = null;
// 抓手停留在娃娃身上的index
Data.onWawaIndex = -1;
// 指令返回
Data.cmd_userInfo = null;
Data.cmd_winnig = null;
__reflect(Data.prototype, "Data");
//# sourceMappingURL=Data.js.map