class Hand extends eui.Component implements eui.UIComponent {
    private handL:eui.Image = null;
    private handR:eui.Image = null;
    private shadow:eui.Image = null;

    private handArm:eui.Group = null;
    public constructor() {
        super();
        this.skinName = "resource/skins/hand.exml";
    }

    protected partAdded(partName:string, instance:any) {
        super.partAdded(partName, instance);
        if (instance == this.shadow) {
            this.shadow.alpha = 5;
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

    public playAction() {
        egret.Tween.get(this.handArm,{loop:false}).to({y:200},3000);
        egret.Tween.get(this.handL, {loop:false}).to({rotation:30}, 150, egret.Ease.circOut ); 
        egret.Tween.get(this.handR, {loop:false}).to({rotation:-30}, 150, egret.Ease.circOut ); 
    }
}