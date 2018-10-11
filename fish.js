function Bird(){

    this.w = vMin/4.5;
    this.h = vMin/6.1;

    this.y = height/2-this.h;
    this.x = 180;

    this.kostylTop = 0
    this.kostylBot= 0
    this.kostylBack= 0
    this.kostylFront= 0

    this.gravity = vMin/2100;
    this.lift = -vMin/120;
    this.velocity = 0;

        if(this.velocity<=vMin/270){
            this.velocity=vMin/270
        }

        if(this.velocity>=-vMin/270){
            this.velocity=-vMin/270
        }

    this.bgc = ""

    this.up = function(){
        this.velocity = this.lift
    }

    this.update = function(){
        this.velocity +=this.gravity;
        this.y += this.velocity;

        if (this.y > height-this.h) {
            this.y = height-this.h;
            this.velocity = 0;
        }

        if (this.y <= 0) {
            this.y = 0;
            this.velocity = 0;  
        }
    }

    this.createBird = function(className){
        var div = document.createElement('div');
        div.className    = className;
        div.style.width  = this.w+"px";
        div.style.height = this.h+"px";
        div.style.position ="absolute";
        div.style.top = this.y + "px";
        div.style.left = this.x + "px";
        div.style.backgroundColor = this.bgc;
        return div;
    }
}