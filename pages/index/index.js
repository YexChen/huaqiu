//index.js
Page({
  data: {
    pages : this
  },
  //造球运动
  create_ball: function (canvas,color,y) {

    canvas.setFillStyle(color);
    canvas.beginPath();
    //canvas.arc(Math.random()*350,Math.random() * 600,10,0,2*Math.PI);
    canvas.arc(100,y, 10, 0, 2 * Math.PI);
    canvas.fill();
    //console.log(this.create_ball);
    //window.requestAnimationFrame(this.create_ball(canvas));
  },
//颜色生成器
  colorGenerator : function(){
    var temp = "#";
    for(var counter = 0;counter <6;counter ++){
      temp += (Math.floor((Math.random() * 100)) % 16).toString(16); 
      //console.log(temp);
    }
    return temp;
  },
  balls_object : [{

  }],

  create_a_ball : function(color = "#ff0000",canvas){
    var vx = Math.floor(Math.random() * 10 * (Math.random() > 0.5 ? 1 : (-1)));
    var vy = Math.floor(Math.random() * 10 * (Math.random() > 0.5 ? 1 : (-1)));
    //画球
    canvas.setFillStyle(color);
    canvas.beginPath();
    canvas.arc(187, 301, 10, 0, 2 * Math.PI);
    canvas.fill();
    //
    //随机颜色加入缓存数组
    var myColor = this.colorGenerator();
    var pages = this;
    pages.balls_object.push({
        x : 189,
        y : 301,
        vx : vx,
        vy : vy,
        color : myColor
    });
  },

  ball_move : function(canvas){
    var pages = this;
    var content = pages.balls_object;
        /*  旧版本的缓存处理，注释掉
    var times = (content.length - 30) > 0 ? (content.length - 30) : 1;
    console.log(content.length);
    console.log(times);
    */
    /* 清理掉缓存 */
    if((content.length - 40)>0) {
      content.splice(0,1);
    }
   // console.log(content);
    //缓存清理完毕
    for (var count = 1; count < pages.balls_object.length ;count ++)
    {
      //console.log(content[1].x);
      //位移
      content[count].x += content[count].vx;
      content[count].y += content[count].vy;

      //加速度减慢
      content[count].vy +=0.1;
      
      //添加颜色
      var color = content[count].color;
      //console.log(content[1].x);


      //画球
      pages.ball_draw(content[count].x, content[count].y,canvas,color);
    }
    canvas.draw();
  },

  ball_draw : function(x,y,canvas,color = "#ff0000"){
    canvas.setFillStyle(color);
    canvas.beginPath();
    canvas.arc(x, y, 10, 0, 2 * Math.PI);
    canvas.fill();

  },

  onReady: function () {
   var  context = wx.createCanvasContext("canvas");
   var pages = this;
   var y = 10;
   var t = 0;
   requestAnimationFrame(function animates(){
     //第一步，记录帧数
     t++;
     //第二步，创建1个新的小球
      pages.create_a_ball(pages.colorGenerator,context);
     //第三步，对每一个小球进行位置变换
     pages.ball_move(context);
     //第四步，清除push中前面的数据（进一步优化）


     //这个是课堂代码
     /*
     var color = pages.colorGenerator();
     y += 1;
     pages.create_ball(context, color,y);
     */
     //context.draw();
     requestAnimationFrame(animates);
   });
   //requestanimationframe针对每一祯进行变化


      //画出
      //context.draw()
  }
})
