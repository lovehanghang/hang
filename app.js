const audio = $("audio"),play_icon = $(".im .play a:nth-child(2)"),now = $(".now");
var timer;
(function(){
    audio.addEventListener("loadedmetadata",function(){
        $(".allTime").innerHTML = About(audio.duration);
        this.volume = "0.4";
        $(".rect_s span").style.width = audio.volume * rect_s.offsetWidth + "px";
    });
    audio.addEventListener("play",function(){
        now.innerHTML = About(audio.currentTime);
        $(".number").innerHTML = "";
        $(".number").style.backgroundImage = "url(wave.gif)";
        $(".rect span").style.width = this.currentTime / this.duration * 100 + "%";
        timer = setInterval(function(){
            now.innerHTML = About(audio.currentTime);
            $(".rect span").style.width = audio.currentTime / audio.duration * 100 + "%";
            Word();
        },1000);
    });
    audio.addEventListener("pause",function(){
        clearInterval(timer);
    });
    audio.addEventListener("ended",function(){
        play_icon.style["backgroundImage"] = "url(play.png)";
    });
})();
$(".cd img").addEventListener("error",function(){
    this.src = "lazy.png";
});
audio.src = t;
$(".cd img").src = imgurl;
function play(){
    if(audio.paused){
        audio.play();
        play_icon.style.backgroundImage = "url(playing.png)";
    } else {
        audio.pause();
        play_icon.style.backgroundImage = "url(play.png)";
    }
}
(function(){
    let point = $(".rect"),point_left = $(".rect span");
    Obj = new getObj(point);
    Obj.down(
        function(e){
            Obj.data.X = e.pageX;
            point_left.style.width = Obj.data.X - (window.innerWidth * 0.23) + "px";
            Obj.data.flag = true;
            if(audio.played.length != 0 && !audio.paused){
                clearInterval(timer);
            }
        }
    );
    Obj.move(
        function(e){
            if(Obj.data.flag){
                e.preventDefault();
                Obj.data.moveX = e.pageX - Obj.data.X;
                point_left.style.width = point_left.offsetWidth + Obj.data.moveX + "px";
                now.innerHTML = About(((point_left.offsetWidth + Obj.data.moveX) / point.offsetWidth) * audio.duration);             
                Obj.data.X = e.pageX;
            }
        }
    )
    Obj.up(
        function(){
            if(!Obj.data.flag){
                return;
            }
            audio.currentTime = point_left.offsetWidth / 500 * audio.duration;
            now.innerHTML = About(audio.currentTime);
            Word();
            Obj.data.flag = false;
            if(audio.played.length != 0 && !audio.paused){
                timer = setInterval(function(){
                    now.innerHTML = About(audio.currentTime);
                    $(".rect span").style.width = audio.currentTime / audio.duration * 100 + "%";
                    Word();
                },1000);
            }
        }
    )
})();
var passage = $(".passage");
var maxH =  -passage.offsetHeight;
window.addEventListener("mouseup",function(){
    if(!can){
        return;
    } else {
        can = false;
        re = true;
        if(pY() > 0){
            passage.style.transform = "translateY(0px)";
        } else if(pY() < maxH){
            passage.style.transform = "translateY(" + maxH + "px)";
        }
        return;
    }
});
var word_arr = Time;
var p = 0,o = null;
var Words = function(){
        p = audio.currentTime;
        word_arr.forEach(function(value,index,array){
            if(p >= value && p < word_arr[index + 1]||p>=array[array.length - 1]){
                o = index;
            }
            if(p < word_arr[0]){
                o = null;
            }
        });
}
var fontH = 33,g = 0;
var Word = function(){
    if(!re){
        return;
    }
    Words();
    if(o == null){
        passage.querySelectorAll("p").forEach(function(value,index){
            passage.querySelectorAll("p")[index].classList.remove("special");
        });
        passage.style.transform = "translateY(0px)";
        return;
    }
    if(o * fontH >= -g){
        passage.style.transform = "translateY(-" + (o * fontH  + g) + "px)";
    }
    passage.querySelectorAll("p").forEach(function(value,index,array){
        array[index].classList.remove("special");
    });
    $(".passage p:nth-child("+(o+1)+")").classList.add("special");
}
var cansee = $(".cansee"),oldY = 0,newY = 0,can = false,z = 0,re = true;
cansee.addEventListener("mousedown",function(e){
    oldY = e.pageY;
    can = true;
});
window.addEventListener("mousemove",function(e){
    e.preventDefault();
    if(can){
        re = false;
        newY = e.pageY - oldY;
        if(passage.style.transform !== ""){
            z = pY();
        } else {
            z = 0;
        }
        passage.style.transform = "translateY(" + (z + newY) + "px)";
        oldY = e.pageY;
    }
});
var input = document.querySelectorAll(".lists ul .border");
var w = 0;
function chek(num){
    if(w == 0){
        if(num < 0){
            input.forEach(function(value,index,array){
                array[index].style.borderColor = "white";
            });
        } else {
            input[num].style.borderColor = "white";
        }
        w++;
    } else {
        if(num < 0){
            input.forEach(function(value,index,array){
                array[index].style.borderColor = "hsla(0,0%,88.2%,.2)";
            });
        } else {
            input[num].style.borderColor = "hsla(0,0%,88.2%,.2)";
        }
        w = 0;
    }
}
var rect_s = $(".rect_s"),sX,eX,s_flag = false;
var rect_span = $(".rect_s span");
rect_s.addEventListener("mousedown",function(e){
    sX = e.pageX;
    s_flag = true;
});
window.addEventListener("mousemove",function(e){
    if(s_flag){
        eX = e.pageX - sX;
        rect_span.style.width = rect_span.offsetWidth + eX +"px";
        audio.volume = rect_span.offsetWidth / rect_s.offsetWidth;
        sX = e.pageX;
    }
});
window.addEventListener("mouseup",function(){
    if(s_flag){
        s_flag = false;
    }
});
function ui(){
    $(".mask").style.display = "flex";
    $(".real_mask").style.display = "block";
    f_1 = true;
}
$(".real_mask").addEventListener("click",function(){
    hidden(".mask");
    hidden(".real_mask");
});
var f_2 = false;
$(".menu a:nth-child(4)").addEventListener("click",function(e){
    e.preventDefault();
    if(!f_2){
        $(".talking").style.transform = "translateX(0)";
        f_2 = true;
    } else {
        $(".talking").style.transform = "translateX(100%)";
        f_2 = false;
    }
});
var easy_f = false;
function easy(){
    if(!easy_f){
        hidden(".console");
        hidden(".cd");
        hidden(".copy");
        $(".passage").style.fontSize = "22px";
        $(".con").style.justifyContent = "center";
        $(".sing").style.marginLeft = "0";
        $(".sing").style.width = "400px";
        $(".cansee").style.width = "400px";
        $(".cansee").style.height = "330px";
        $(".passage").style.color = "white";
        fontH = 51;
        maxH =  -passage.offsetHeight;
        easy_f = true;
        $(".im .menu a:nth-child(5)").style.backgroundPosition = "0 -311px";
        g = -150;
        if(o * fontH >= -g){
            passage.style.transform = "translateY(-" + (o * fontH  + g) + "px)";
        } else {
            passage.style.transform = "translateY(0px)";
        }
    } else {
        $(".console").style.display = "inline-block";
        $(".cd").style.display = "inline-block";
        $(".copy").style.display = "inline-block";
        $(".passage").style.fontSize = "14px";
        $(".con").style.justifyContent = "space-between";
        $(".sing").style.marginLeft = "140px";
        $(".sing").style.width = "250px";
        $(".cansee").style.width = "206px";
        $(".cansee").style.height = "66px";
        $(".passage").style.color = "hsla(0,0%,88.2%,.8)";
        fontH = 33;
        g = 0;
        maxH =  -passage.offsetHeight;
        if(o * fontH >= -g){
            passage.style.transform = "translateY(-" + (o * fontH  + g) + "px)";
        }
        easy_f = false;
        $(".im .menu a:nth-child(5)").style.backgroundPosition = "0 -282px";
    }
}