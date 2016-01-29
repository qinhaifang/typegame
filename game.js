function game(){
 this.clientw=document.documentElement.clientWidth;
 this.clienth=document.documentElement.clientHeight;
 this.letterArr=["A","B","E","G","H","I","J","K","L","M","N","O","P","Q","R"];
 this.letterLen=5;
 this.speed=3;
 this.spans=[];
 this.die=10;
 this.sore=0;
 this.soreEle=document.getElementsByClassName("sore")[0].getElementsByTagName("span")[1];
 this.dieEle=document.getElementsByClassName("die")[0].getElementsByTagName("span")[1];
 this.step=10;
 this.aa=1;
}
game.prototype={
   play:function(){
       //将字母显示到body里面
       this.getLetter(this.letterLen);
       this.move();
       this.key();
   },
    key:function(){
        var that=this;
      document.onkeydown=function(e){
          var ev=e||window.event;
          var code=String.fromCharCode(ev.keyCode);
          for(var i=0;i<that.spans.length;i++){
              if(that.spans[i].innerHTML==code){
                  document.body.removeChild(that.spans[i]);
                  that.spans.splice(i,1);
                  that.getLetter(1);
                  that.sore++;
                  that.soreEle.innerHTML=that.sore;
                  if(that.sore%that.step==0){
                      that.aa++
                      alert("第"+that.aa+"关");
                      that.next();
                  }
              }
          }
      }
    },

    next:function(){
      clearInterval(this.t);
      for(var i=0;i<this.spans.length;i++){
         document.body.removeChild(this.spans[i]);
      }
        this.spans=[];
        this.speed++;
        this.letterLen++;
        this.play();
    },

    move:function(){
       var that=this;
       this.t=setInterval(function(){
         for(var i=0;i<that.spans.length;i++){
             var top=that.spans[i].offsetTop+that.speed;
             that.spans[i].style.top=top+"px";
             if(top>that.clienth){
                 document.body.removeChild(that.spans[i]);
                 var game=document.getElementsByClassName("gameover")[0];
                 that.spans.splice(i,1);
                 that.getLetter(1);
                 that.die--;
                 that.dieEle.innerHTML=that.die;
                 if(that.die==0){
                     game.style.display="block";
                     // setTimeout(function(){
                     //     location.reload();
                     // },3000)

                 }
             }
         }
       },60)
    },

    getLetter:function(num){
        //先获取到指定的字母
        var arr=this.getRand(num);
        var posArr=[];
        var eleArr=[];
        //var img=[{A:"images/a.png"},{B:"images/b.png"},{E:"images/e.png"},{G:"images/g.png"},{H:"images/h.png"},{I:"images/i.png"},{J:"images/j.png"},{K:"images/k.png"},{L:"images/l.png"},{M:"images/m.png"},{N:"images/n.png"},{P:"images/p.png"},{Q:"images/q.png"},{R:"images/r.png"}];
        //var img=["images/0.png","images/1.png","images/2.png","images/3.png","images/4.png","images/5.png","images/6.png","images/7.png","images/8.png","images/9.png","images/10.png","images/11.png","images/12.png","images/13.png"];
        //console.log(img.length);
        for(var i=0;i<arr.length;i++){
            var span=document.createElement("span");
            span.innerHTML=arr[i];
            var x=(100+(this.clientw-200)*Math.random());
            var y=(100*Math.random());
            var width=80;
            //var imgr=img[Math.floor(Math.random()*img.length)];
            while (this.check1(posArr,x,width)){
                x=(100+(this.clientw-200)*Math.random());
            }

            posArr.push({minx:x,maxx:x+width});
            span.style.cssText="width:"+width+"px;position:absolute;left:"+x+"px;top:"+y+"px;color:#fff;text-align:center;line-height:70px";
            span.style.background="url(./images/"+arr[i]+".png) no-repeat";
            span.style.backgroundSize="contain";
            document.body.appendChild(span);
           // eleArr.push(span);
            this.spans.push(span);
        }
       // return eleArr;

    },
    check1:function(arr,x,width){
        for(var i=0;i<arr.length;i++){
            if(!(x+width<arr[i].minx||arr[i].maxx+width<x)){
                return true;
            }
        }
        return false;
    },
    getRand:function(num){
       var arr=[];
       for(var i=0;i<num;i++) {
           var rand = Math.floor(this.letterArr.length * Math.random());
           while(this.check(arr,this.letterArr[rand])){
               rand = Math.floor(this.letterArr.length * Math.random());
           }
           arr.push(this.letterArr[rand]);
       }
        return arr;
    },
    check:function(arr,val){
       for(var i=0;i<arr.length;i++){
           if(arr[i]==val){
               return true;
           }
       }
        return false;
    }
}