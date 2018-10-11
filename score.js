function Score (){
    this.x = 0;
    this.y = 0;

    this.w = "";
    this.h = "";

    this.tick = 0;
    this.total = 0;

    this.update = function(){
        this.total += this.tick;

    }
    this.createDiv = function(className){
        var div = document.createElement('div');
        div.className      = className;
        div.style.width  = this.w+"px";
        div.style.height = this.h+"px";
        div.style.top = this.y + "px";
        div.style.left = this.x + "px";
        return div
    }
}