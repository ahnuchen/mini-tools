var videoAd = null;
let myCallback;
let oTime = 0;
let rewarded = {
  initAd(callback) {
    myCallback = callback;
    if (uni.createRewardedVideoAd) {
      videoAd = uni.createRewardedVideoAd({
        adUnitId: getApp().globalData.adUnitId,
      });
      videoAd.onError((err) => {
        uni.hideLoading();
        console.log(err);
        callback();
      });
      videoAd.onClose((res) => {
        uni.hideLoading();
        if (res && res.isEnded) {
          console.log("激励视频 正常播放结束");
          callback();
        } else {
          console.log("激励视频 正常播放结束");
          uni.showToast({
            title: "你已经取消了!",
            icon: "none",
            duration: 3000,
          });
        }
      });
    }
  },
  show() {
    let cTime = new Date().getTime();
    if (cTime - oTime <= 2000) {
      return;
    }
    oTime = cTime;
    if (videoAd == null) {
      console.log("激励视频 初始化失败");
      myCallback();
      return;
    }
    uni.showLoading({
      title: "加载中",
    });
    videoAd.load().then(() => {
      uni.hideLoading();
      videoAd.show();
    });
  },
};
module.exports = {
  rewarded,
};
