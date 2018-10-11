function Bg (){

    this.w = document.documentElement.clientWidth;
    this.h = document.documentElement.clientHeight;

    this.x = width
    // this.speed = vMin/280 ;

    this.speed = 0.4;
    this.currPos = 75;

    this.bgImg = "bg.jpg" 

    this.setPositionX = function(n){
         this.x = n 

    }

    this.update = function(){
        // this.x -= this.speed 
        this.currPos -= this.speed 
    }

    this.createImg = function(className){
        var img = new Image();
        img.className = className;
        img.height = this.h
        img.src = this.bgImg
        img.style.position = "absolute"
        img.style.zIndex = "-1"
        
        return img;
    }
}