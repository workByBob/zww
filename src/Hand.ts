class Hand extends eui.Component implements eui.UIComponent {
    private handL:eui.Image = null;
    private handR:eui.Image = null;
    public shadow:eui.Image = null;

    private handArm:eui.Group = null;
    public constructor() {
        super();
        this.skinName = "resource/skins/hand.exml";
    }

    protected partAdded(partName:string, instance:any) {
        super.partAdded(partName, instance);
        if (instance == this.shadow) {
            // this.shadow.alpha = 0.5;
        }
    }

	protected childrenCreated():void {
		super.childrenCreated();

	}

    public moveAction(direction:string) {
        if (direction == "left") {
            egret.Tween.get(this.handL, {loop:false}).to({rotation:-30}, 150, egret.Ease.circOut ); 
            egret.Tween.get(this.handR, {loop:false}).to({rotation:-30}, 150, egret.Ease.circOut ); 
        }
        if (direction == "right") {
            egret.Tween.get(this.handL, {loop:false}).to({rotation:30}, 150, egret.Ease.circOut ); 
            egret.Tween.get(this.handR, {loop:false}).to({rotation:30}, 150, egret.Ease.circOut ); 
        }
        if (direction == "none") {
            egret.Tween.get(this.handL, {loop:false}).to({rotation:0}, 100); 
            egret.Tween.get(this.handR, {loop:false}).to({rotation:0}, 100); 
        }
    }

    public playAction(fun:Function) {
        var self = this;
        egret.Tween.get(this.handArm,{loop:false}).to({y:240},1500).call(function(){
            if (Data.onWawaIndex == -1) { // 没有在娃娃位置
                egret.Tween.get(this,{loop:false}).to({y:0},800).call(function(){
                    fun(0);
                });
                egret.Tween.get(self.handL, {loop:false}).to({rotation:0}, 150, egret.Ease.circOut ); 
                egret.Tween.get(self.handR, {loop:false}).to({rotation:0}, 150, egret.Ease.circOut ); 
            }else {
                if (Data.cmd_winnig["state"] == 2) { // 夹不中
                    fun(2);
                    egret.Tween.get(this,{loop:false}).to({y:0},800).call(function(){
                        fun(0);
                    });
                    egret.Tween.get(self.handL, {loop:false}).to({rotation:0}, 150, egret.Ease.circOut ); 
                    egret.Tween.get(self.handR, {loop:false}).to({rotation:0}, 150, egret.Ease.circOut ); 
                }else if (Data.cmd_winnig["state"] == 1){ // 夹中
                    fun(1);
                    egret.Tween.get(this,{loop:false}).to({y:0},800).call(function(){
                        fun(0);
                    });
                    egret.Tween.get(self.handL, {loop:false}).to({rotation:0}, 150, egret.Ease.circOut ); 
                    egret.Tween.get(self.handR, {loop:false}).to({rotation:0}, 150, egret.Ease.circOut ); 
                }
            }
        });
        egret.Tween.get(this.handL, {loop:false}).to({rotation:30}, 150, egret.Ease.circOut ); 
        egret.Tween.get(this.handR, {loop:false}).to({rotation:-30}, 150, egret.Ease.circOut ); 
    }
}