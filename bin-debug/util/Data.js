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
Data.wx_secret = "60e599a7707892b29774eaf91fd3cd57";
__reflect(Data.prototype, "Data");
//# sourceMappingURL=Data.js.map