var width = window.innerWidth + "px",
    height = window.innerHeight + "px";
var $ = name => document.querySelector(name);
var hidden = name => document.querySelector(name).style.display = "none";
var getObj = function(obj){
    this.obj = obj;
    this.down = function(f){
        this.obj.addEventListener("mousedown",f);
    }
    this.move = function(f){
        window.addEventListener("mousemove",f);
    }
    this.up = function(f){
        window.addEventListener("mouseup",f);
    }
    this.data = {
        X: 0,
        Y: 0,
        flag: false,
        moveX: 0,
        endX: 0
    }
}
var Ajax = function(data){
    this.data = data;
    if(window.XMLHttpRequest){
        this.xmlhttp = new XMLHttpRequest();
    } else {
        this.xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    var result = data.result;
    this.xmlhttp.onreadystatechange = function(){
        if (this.readyState==4 && this.status==200){
            result(this.responseText);
        }
     }
    this.data.open = data.open;
    this.data.method = data.method;
    this.xmlhttp.open(this.data.method,this.data.open,true);
    this.xmlhttp.send();
}
var About = function(num){
    if(num < 60){
        if(num < 10){
            return "00:0" + parseInt(num);
        } else {
            return "00:" + parseInt(num);
        }
    } else {
        if(parseInt(num / 60) < 10){
            if(parseInt(num % 60) < 10){
                return "0" + parseInt(num / 60) + ":0" + parseInt(num) % 60;
            } else {
                return "0" + parseInt(num / 60) + ":" + parseInt(num) % 60;
            }
        } else {
            return parseInt(num / 60) + ":" + parseInt(num) % 60;
        }
    }
}
var pY = function(){
    return Number(passage.style.transform.split("px")[0].split("(")[1]);
}