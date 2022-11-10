const audio = $("audio"),start = $(".play i:nth-child(2)"),passage = $(".passage"),now = $(".now");
audio.addEventListener("loadedmetadata",function(){
    if(audio.duration != 0){
        //处理浏览器兼容问题
        audio.play();
        audio.pause();
    }
    $(".allTime").innerHTML = About(audio.duration);
    audio.volume = "1";
});
$(".login").style.top = window.innerHeight - 400 + "px";
var timer;
start.addEventListener("click",function(){
    if(audio.played.length === 0 || audio.paused){
        audio.play();
        start.style.backgroundImage = "url(playing.png)";
    } else {
        audio.pause();
        start.style.backgroundImage = "url(play.png)";
    }
});
audio.addEventListener("play",function(){
    timer = setInterval(function(){
        Word();
    },1000);
});
audio.addEventListener("pause",function(){
    clearInterval(timer);
});
function Word(){
    Time.forEach(function(value,index,array){
        if(audio.currentTime >= value && audio.currentTime < array[index+1]
            || audio.currentTime >= value && index == array.length - 1){
            $(".passage p").forEach(function(value){
                value.style.color = "white";
            });
            $(".passage p")[index].style.color = "orange";
            passage.style.transform = `translateY(-${27 * index}px)`;
            span.style.width = audio.currentTime / audio.duration * jin.offsetWidth + "px";
            now.innerHTML = About(audio.currentTime);
        }
    });
}
const jin = $(".jin"),span = $(".jin span");
(function(){
    let startX,moveX;
    jin.addEventListener("touchstart",function(e){
        startX = e.targetTouches[0].pageX;
        clearInterval(timer);
    });
    jin.addEventListener("touchmove",function(e){
        e.preventDefault();
        moveX = e.targetTouches[0].pageX - startX;
        span.style.width = span.offsetWidth + moveX + "px";
        startX = e.targetTouches[0].pageX;
    });
    jin.addEventListener("touchend",function(){
        audio.currentTime = span.offsetWidth / jin.offsetWidth * audio.duration;
        Word();
        if(audio.played.length != 0 && !audio.paused){
            timer = setInterval(function(){
                Word();
            },1000);
        }
    });
    jin.addEventListener("click",function(e){
        span.style.width = e.pageX - ((window.innerWidth - jin.offsetWidth) / 2 ) + "px";
        audio.currentTime = span.offsetWidth / jin.offsetWidth * audio.duration;
        Word();
    });
})();
$(".im").addEventListener("touchmove",function(e){
    e.preventDefault();
});
$(".user_login").addEventListener("click",function(e){
    e.preventDefault();
    $(".login").style.transform = "translateY(0)";
});
(function(){
    let dataY,useY = 0;
    $(".login").addEventListener("touchstart",function(e){
        dataY = e.targetTouches[0].pageY;
    });
    $(".login").addEventListener("touchmove",function(e){
        e.preventDefault();
        useY += e.targetTouches[0].pageY - dataY;
        if(useY < 0){
            return;
        }
        $(".login").style.transition = "none";
        $(".login").style.transform = `translateY(${useY}px)`;
        dataY = e.targetTouches[0].pageY;
    });
    $(".login").addEventListener("touchend",function(){
        $(".login").style.transition = "all 0.3s";
        if(useY > 110){
            $(".login").style.transform = "translateY(100%)";
        } else {
            $(".login").style.transform = "translateY(0)";
        }
        dataY = 0;
        useY = 0;
    });
})();
(function(){
    let dataY,useY = 0;
    let obj = $(".ping_real");
    obj.addEventListener("touchstart",function(e){
        dataY = e.targetTouches[0].pageY;
    });
    obj.addEventListener("touchmove",function(e){
        e.preventDefault();
        useY += e.targetTouches[0].pageY - dataY;
        if(useY < 0){
            return;
        }
        obj.style.transition = "none";
        obj.style.transform = `translateY(${useY}px)`;
        dataY = e.targetTouches[0].pageY;
    });
    obj.addEventListener("touchend",function(){
        obj.style.transition = "all 0.3s";
        if(useY > 110){
            obj.style.transform = "translateY(100%)";
        } else {
            obj.style.transform = "translateY(0)";
        }
        dataY = 0;
        useY = 0;
    });
})();
$("#login").addEventListener("touchstart",function(e){
    let x = e.pageX;
    document.body.style.setProperty("--left",(x - $("#login").getBoundingClientRect().left) + "px");
    document.body.style.setProperty("--c","scale(5)");
    setTimeout(function(){
        document.body.style.setProperty("--left","35px");
        document.body.style.setProperty("--c","scale(0)");
    },1000);
});
$("#login").addEventListener("click",service);
function getPings(){
    let xmlhttp;
    if(window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState==4 && xmlhttp.status==200){
            $(".ping_real").innerHTML = "<h3>全部评论</h3>";
            result_json = eval(`(${xmlhttp.responseText})`);
            result_json.content.forEach(function(value,index){
                value = eval(`(${value})`);
                $(".ping_real").innerHTML += `<div class="userPing"><img src="app.webp" alt=""><div class="content"><p class="userData"><span>${value.name}</span><span>2022.10.10</span></p><p>${value.content}</p></div></div>`;
            });
        }
    }
    xmlhttp.open("GET","pings.php",true);
    xmlhttp.send();
}
$(".ping a").addEventListener("click",function(e){
    e.preventDefault();
    getPings();
    $(".ping_real").style.transform = "translateY(0)";
});