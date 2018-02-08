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
Data.share_link = encodeURIComponent(location.href.split("#")[0]);
Data.share_title = "就爱夹娃娃";
Data.share_desc = "抓娃娃高手";
Data.share_imgUrl = Data.weChat_headUrl;
// 娃娃json数据表
Data.wawaJson = null;
// 选中的娃娃信息
Data.selectData = null;
// 抓手停留在娃娃身上的index
Data.onWawaIndex = -1;
// 指令返回
// 游戏基础信息
Data.cmd_userInfo = null;
// 夹娃娃返回成功
Data.cmd_winnig = null;
// 玩家秀返回玩家所有头像指令
Data.cmd_pictures = null;
// 抓到的娃娃记录
Data.cmd_wawaLog = null;
__reflect(Data.prototype, "Data");
//# sourceMappingURL=Data.js.map