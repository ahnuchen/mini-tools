<template>
  <view>
    <canvas canvasId="bgCanvas" id="bgCanvas"></canvas>
    <canvas canvasId="textCanvas" id="textCanvas"></canvas>
  </view>
</template>

<script>
var t;
export default {
  data() {
    return {
      isRelease: true,
      color_array: ["白", "黑", "红", "橙", "黄", "绿", "青", "蓝", "紫"],
      color: [
        "#ffffff",
        "#000000",
        "#ff0000",
        "#ff8800",
        "#ffff00",
        "#00ff00",
        "#00fff0",
        "#0000ff",
        "#ff00ff",
      ],
      content: "请输入弹幕",
      speed: "5",
      fontSize: "200",
      fontColor: "0",
      bgColor: "1",
      direction: "leftToRight",
      pageH: 0,
      pageW: 0,
    };
  },
  onLoad: function (a) {
    this.setData({
      isRelease: getApp().globalData.isRelease,
    });
    if (t) {
      clearInterval(t);
    }
    var that = this;
    that.setData({
      content: a.content,
      speed: a.speed,
      fontSize: a.fontSize,
      fontColor: a.fontColor,
      bgColor: a.bgColor,
      direction: a.direction,
    });
    uni.getSystemInfo({
      success: function (t) {
        that.setData({
          pageH: t.windowHeight,
          pageW: t.windowWidth,
        });
      },
    });
    var o = that.color[parseInt(that.bgColor)];
    var n = uni.createCanvasContext("bgCanvas", this);
    n.setFillStyle(o);
    n.fillRect(0, 0, that.pageW, that.pageH);
    n.draw(true);
    if (uni.setNavigationBarColor) {
      uni.setNavigationBarColor({
        frontColor: o,
        backgroundColor: o,
      });
    }
    var r = 0;
    var i = 0;
    var d = parseInt(20 - 2 * that.speed + 1);
    var s = parseInt((that.fontSize * that.pageW) / 200);
    var l = that.color[parseInt(that.fontColor)];
    t = setInterval(function () {
      var t = uni.createCanvasContext("textCanvas", this);
      t.setFontSize(s);
      var a = t.measureText(that.content).width;
      t.setFillStyle(l);
      if ("rightToLeft" == that.direction) {
        t.translate(parseInt(0.45 * that.pageW), 0);
        t.rotate(-0.5 * Math.PI);
        t.save();
        if (r < -a - that.pageH) {
          r = 0;
        }
        t.setTextBaseline("middle");
        t.fillText(that.content, r--, 0);
        t.stroke();
        t.draw();
        t.restore();
      }
      if ("leftToRight" == that.direction) {
        t.translate(parseInt(0.45 * that.pageW), that.pageH);
        t.rotate(-0.5 * Math.PI);
        t.save();
        if (i > that.pageH) {
          i = -a;
        }
        t.setTextBaseline("middle");
        t.fillText(that.content.split("").reverse().join(""), i++, 0);
        t.stroke();
        t.draw();
        t.restore();
      }
    }, d);
  },
  onUnload: function () {
    clearInterval(t);
  },
  onHide: function () {
    clearInterval(t);
  },
  onShareAppMessage: function (t) {
    var that = this;
    return {
      title: "帮大忙工具箱--你收的一条手持弹幕!",
      path:
        "/pages/my_module/danmu/show_danmu?content=" +
        that.content +
        " & speed=" +
        that.speed +
        "&fontSize=" +
        that.fontSize +
        "&fontColor=" +
        that.fontColor +
        "&bgColor=" +
        that.bgColor +
        "&direction=" +
        that.direction,
    };
  },
  onShareTimeline: function () {},
  methods: {
    stopDanmu: function () {
      clearInterval(t);
    },
  },
};
</script>
<style>
page {
  padding: 0;
  margin: 0;
  width: 750rpx;
  height: 100%;
}

#bgCanvas,
#textCanvas {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
}

#textCanvas {
  z-index: 2;
}
</style>
