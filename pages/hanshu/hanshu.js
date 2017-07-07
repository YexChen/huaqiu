// pages/hanshu/hanshu.js
Page({
  swichpages : function(){
    wx.navigateTo({
      url: "pages/index/index",
    })
  },
  onReady: function () {
    var arr = [];
    arr.push(100),
    arr.push("喵喵喵"),
    arr.push(23333);
    arr.push("手动滑稽");
    for(var i = 0;i < arr.length;i++){
    console.log(arr[i]);
    }
  }
})