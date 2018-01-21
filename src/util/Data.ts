class Data {

    // 微信信息
    public static weChat_name:string = "";
    public static weChat_headUrl:string = "";
    public static weChat_from:string = "";
    public static weChat_openid:string = "";

    // 微信appid 
    public static wx_appId = "wxdfb3530f672883c1";           
    // 微信sceret
    public static wx_secret = "3703eb5b3f6eb5aa64d82fa553ed90e";

    public static userKey = "oexAxwoclOGqj-CFIq0NULqlx2xs";

    // 娃娃json数据表
    public static wawaJson = null;
    // 选中的娃娃信息
    public static selectData:any = null;
    // 当前选中的头像纹理
    public static textureHead: egret.RenderTexture

    // 抓手停留在娃娃身上的index
    public static onWawaIndex:number = -1;

    // 指令返回
    // 游戏基础信息
    public static cmd_userInfo = null;
    // 夹娃娃返回成功
    public static cmd_winnig = null;
    // 玩家秀返回玩家所有头像指令
    public static cmd_pictures = null;  
}