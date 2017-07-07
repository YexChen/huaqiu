//index.js
Page({
  data: {
    pages: this,
  },
  flag : 0,
  xiaoye : function(){
    this.flag = 1;
  },
  pants : function(){
    this.flag = 2;
  },
  yinyang : function(){
    this.flag = 3;
  },
  //造球运动
  create_ball : function (canvas, color, y) {

    canvas.setFillStyle(color);
    canvas.beginPath();
    //canvas.arc(Math.random()*350,Math.random() * 600,10,0,2*Math.PI);
    canvas.arc(100, y, 10, 0, 2 * Math.PI);
    canvas.fill();
    //console.log(this.create_ball);
    //window.requestAnimationFrame(this.create_ball(canvas));
  },
  //颜色生成器

  //滑稽生成器（误
  imageCreator : function(){
    var muUrl = "/images/huaji.png";
    return muUrl;
  },



  onReady: function () {
    var flag = 0;
    var context = wx.createCanvasContext("canvas");
    var y = 10;
    var t = 0;
    var balls_object2 =  [{ }];
    var pages = this;

    function xiaoye(){
      flag = 1;
    }

    function ball_draw(x, y, canvas, image){
      //console.log(image);
      canvas.drawImage(image, x, y, 50, 50);
    }


    function ball_move(canvas){
      var content = balls_object2;
      //console.log(content);
      /*  旧版本的缓存处理，注释掉
  var times = (content.length - 30) > 0 ? (content.length - 30) : 1;
  console.log(content.length);
  console.log(times);
  */
      /* 清理掉缓存 */
      if ((content.length - 40) > 0) {
        content.splice(0, 1);
      }
      // console.log(content);
      //缓存清理完毕
      for (var count = 1; count < balls_object2.length; count++) {
        //console.log(content[1].x);
        //位移
        content[count].x += content[count].vx;
        content[count].y += content[count].vy;

        //加速度减慢
        content[count].vy += 0.1;

        //添加颜色
        var image = content[count].image;
        //console.log(content[1].x);


        //画球
        ball_draw(content[count].x, content[count].y, canvas, image);
      }
      canvas.draw();
    }

    function create_a_ball(color = "#ff0000", canvas){
      var vx = Math.floor(Math.random() * 10 * (Math.random() > 0.5 ? 1 : (-1)));
      var vy = Math.floor(Math.random() * 10 * (Math.random() > 0.5 ? 1 : (-1)));
      //画球
      //
      //随机颜色加入缓存数组
      var myImage = imageCreator();
      balls_object2.push({
        x: 189,
        y: 301,
        vx: vx,
        vy: vy,
        image: myImage
      });
    }

    function colorGenerator(){
      var temp = "#";
      for (var counter = 0; counter < 6; counter++) {
        temp += (Math.floor((Math.random() * 100)) % 16).toString(16);
        //console.log(temp);
      }
      return temp;
    } 

    function imageCreator(){
      var myUrl = "";
      if(pages.flag ==0)
      myUrl = "/images/huaji.png";
      if(pages.flag ==1)
      myUrl = "/images/xiaoye.png";
      if(pages.flag ==2)
      myUrl = "/images/pants.png";
      if (pages.flag == 3)
      myUrl = "/images/taiji.png";
      return myUrl;
    }

    requestAnimationFrame(function animates() {
      //第一步，记录帧数
      t++;
      //第二步，创建1个新的小球
      create_a_ball(colorGenerator(), context);
      //第三步，对每一个小球进行位置变换
      ball_move(context);
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
