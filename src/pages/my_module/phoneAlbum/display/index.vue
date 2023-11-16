<template>
  <view>
    <canvas
      canvasId="myCanvas"
      :style="
        'position:fixed; left:100%; width:' +
        canvasWidth +
        'px; height:' +
        canvasHeight +
        'px'
      "
    ></canvas>
    <view class="myContainer">
      <image
        class="userImage"
        mode="aspectFit"
        :src="userImage"
        :style="
          'position:absolute; margin-left:' +
          (bgMarginLeft + marginLeft) +
          'px;  margin-top:' +
          (bgMarginTop + marginTop) +
          'px; width:' +
          picWidth +
          'px;  height:' +
          picHeight +
          'px; background-color:black'
        "
      ></image>
      <image
        class="iPhoneBg"
        :src="selectedBgItem.selectedSrc"
        :style="
          'position: absolute; margin-left:' +
          bgMarginLeft +
          'px;margin-top:' +
          bgMarginTop +
          'px; width:' +
          bgWidth +
          'px; height:' +
          bgHeight +
          'px'
        "
      ></image>
      <view style="display: flex; flex: 1; flex-direction: row-reverse">
        <view
          class="btn-area"
          :style="
            'display:flex; width:' +
            (screenWidth * 0.4 - bgMarginLeft) +
            'px; flex-direction:column;justify-content:center; align-items:center'
          "
        >
          <text style="font-size: 25rpx; margin-bottom: 10rpx"
            >{{ selectedBgItem.title }}
          </text>
          <radio-group
            @change="radioChange"
            class="group"
            v-if="selectedBgItem.srcs.length != 1"
            style="margin-bottom: 30rpx; width: 75%"
          >
            <view
              class="label-2"
              style="height: 60rpx"
              v-for="(item, index) in selectedBgItem.srcs"
              :key="index"
            >
              <label class="label-2__text">
                <radio
                  hidden
                  :checked="item.checked"
                  :id="item.name"
                  :value="index"
                ></radio>
                <view class="label-2__icon">
                  <view
                    class="label-2__icon-checked"
                    :style="'opacity:' + (item.checked ? 1 : 0)"
                  ></view>
                </view>
                <text style="font-size: 30rpx">{{ item.name }}</text>
              </label>
            </view>
          </radio-group>
          <button @tap="createPic" class="butss">保存图片</button>
          <view class="text">
            <text
              >如果保存过程中，制作过慢请耐心等待，或者请再次点击【保存图片】
            </text>
          </view>
        </view>
      </view>
      <scroll-view
        class="scroll-view_H"
        :scrollX="true"
        style="width: 100%; height: 220rpx"
      >
        <view
          style="
            display: flex;
            flex-direction: row;
            height: 220rpx;
            width: 100%;
          "
        >
          <view
            @tap="changeBg"
            :data-index="index"
            style="
              height: 220rpx;
              width: 200rpx;
              display: flex;
              flex-direction: column;
              align-items: center;
            "
            v-for="(item, index) in bgSrc"
            :key="index"
          >
            <image
              mode="aspectFit"
              :src="item.srcs[item.selectedSrcIndex].src"
              style="width: 200rpx; height: 180rpx"
            ></image>

            <text
              style="
                font-size: 20rpx;
                padding-top: 10rpx;
                padding-bottom: 10rpx;
              "
            >
              {{ item.title }}
            </text>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
getApp();
var e = null;
export default {
  data() {
    return {
      userImage: "",
      userImageWidth: 0,
      userImageHeight: 0,
      userImageK: 0,
      bgMarginLeft: 20,
      bgMarginTop: 20,
      bgSrc: [
        {
          selectedSrcIndex: 0,
          selectedSrc:
            "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/iphone-11-pro-max-silver.png",
          srcs: [
            {
              name: "银 色",
              src: "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/iphone-11-pro-max-silver.png",
              checked: "true",
              isCDN: "true",
            },
            {
              name: "深空灰",
              src: "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/iphone-11-pro-max-space-gray.png",
              isCDN: "true",
            },
            {
              name: "金 色",
              src: "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/iphone-11-pro-max-gold.png",
              isCDN: "true",
            },
            {
              name: "无刘海",
              src: "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/iphone-11-pro-max-no.png",
              isCDN: "true",
            },
          ],
          title: "iPhone 11 Pro/Max",
          originBgFrame: [0, 0, 509, 1020],
          originPicFrame: [37, 27, 436, 944],
          originBgOffset: [80, 40],
        },
        {
          selectedSrcIndex: 0,
          selectedSrc:
            "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/iphone-11-pro-desk-2.png",
          srcs: [
            {
              name: "带刘海",
              src: "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/iphone-11-pro-desk-2.png",
              checked: "true",
              isCDN: "true",
            },
            {
              name: "无刘海",
              src: "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/iphone-11-pro-desk-no.png",
              isCDN: "true",
            },
          ],
          title: "iPhone 11 Pro 充电",
          originBgFrame: [0, 0, 943, 1055],
          originPicFrame: [487, 323, 310, 670],
          originBgOffset: [0, 0],
        },
        {
          selectedSrcIndex: 0,
          selectedSrc:
            "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/iphone-11-pro-max-in-hand-01.png",
          srcs: [
            {
              name: "带刘海",
              src: "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/iphone-11-pro-max-in-hand-01.png",
              checked: "true",
              isCDN: "true",
            },
            {
              name: "无刘海",
              src: "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/iphone-11-pro-max-in-hand-01-no.png",
              isCDN: "true",
            },
          ],
          title: "iPhone 11 Pro 手持",
          originBgFrame: [0, 0, 872, 591],
          originPicFrame: [365, 104, 168, 363],
          originBgOffset: [0, 0],
        },
        {
          selectedSrcIndex: 0,
          selectedSrc:
            "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/iphone-11-pro-max-in-hand-02.png",
          srcs: [
            {
              name: "带刘海",
              src: "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/iphone-11-pro-max-in-hand-02.png",
              checked: "true",
              isCDN: "true",
            },
            {
              name: "无刘海",
              src: "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/iphone-11-pro-max-in-hand-02-no.png",
              isCDN: "true",
            },
          ],
          title: "iPhone 11 Pro 手持",
          originBgFrame: [0, 0, 713, 980],
          originPicFrame: [272, 145, 263, 569],
          originBgOffset: [0, 0],
        },
        {
          selectedSrcIndex: 0,
          selectedSrc:
            "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/iphone-11-pro-max-plants.png",
          srcs: [
            {
              name: "带刘海",
              src: "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/iphone-11-pro-max-plants.png",
              checked: "true",
              isCDN: "true",
            },
            {
              name: "无刘海",
              src: "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/iphone-11-pro-max-plants-no.png",
              isCDN: "true",
            },
          ],
          title: "iPhone 11 Pro 多肉",
          originBgFrame: [0, 0, 900, 756],
          originPicFrame: [82, 170, 193, 417],
          originBgOffset: [0, 0],
        },
        {
          selectedSrcIndex: 0,
          selectedSrc:
            "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/iphone-11-pro-max-card.png",
          srcs: [
            {
              name: "带刘海",
              src: "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/iphone-11-pro-max-card.png",
              checked: "true",
              isCDN: "true",
            },
            {
              name: "无刘海",
              src: "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/iphone-11-pro-max-card-no.png",
              isCDN: "true",
            },
          ],
          title: "iPhone 11 Pro 黑卡",
          originBgFrame: [0, 0, 829, 728],
          originPicFrame: [129, 124, 187, 403],
          originBgOffset: [0, 0],
        },
        {
          selectedSrcIndex: 0,
          selectedSrc:
            "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/iphone-11-white.png",
          srcs: [
            {
              name: "白 色",
              src: "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/iphone-11-white.png",
              checked: "true",
              isCDN: "true",
            },
            {
              name: "黑 色",
              src: "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/iphone-11-black.png",
              isCDN: "true",
            },
            {
              name: "红 色",
              src: "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/iphone-11-red.png",
              isCDN: "true",
            },
            {
              name: "黄 色",
              src: "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/iphone-11-yellow.png",
              isCDN: "true",
            },
            {
              name: "无刘海",
              src: "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/iphone-11-black-no.png",
              isCDN: "true",
            },
          ],
          title: "iPhone 11",
          originBgFrame: [0, 0, 497, 993],
          originPicFrame: [40, 32, 414, 900],
          originBgOffset: [80, 40],
        },
        {
          selectedSrcIndex: 0,
          selectedSrc:
            "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/iphone-8-plus-grey.png",
          srcs: [
            {
              name: "黑 色",
              src: "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/iphone-8-plus-grey.png",
              checked: "true",
              isCDN: "true",
            },
            {
              name: "银 色",
              src: "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/iphone-8-plus-silver.png",
              isCDN: "true",
            },
            {
              name: "金 色",
              src: "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/iphone-8-plus-gold.png",
              isCDN: "true",
            },
          ],
          title: "iPhone 7/8 Plus",
          originBgFrame: [0, 0, 446, 916],
          originPicFrame: [27, 101, 393, 699],
          originBgOffset: [80, 40],
        },
        {
          selectedSrcIndex: 0,
          selectedSrc:
            "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/iphone-se-space-gray.png",
          srcs: [
            {
              name: "深空灰",
              src: "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/iphone-se-space-gray.png",
              checked: "true",
              isCDN: "true",
            },
            {
              name: "玫瑰金",
              src: "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/iphone-se-rose-gold.png",
              isCDN: "true",
            },
            {
              name: "金 色",
              src: "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/iphone-se-gold.png",
              isCDN: "true",
            },
            {
              name: "银 色",
              src: "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/iphone-se-gold.png",
              isCDN: "true",
            },
          ],
          title: "iPhone SE/5s/5",
          originBgFrame: [0, 0, 383, 801],
          originPicFrame: [26, 111, 329, 585],
          originBgOffset: [80, 40],
        },
        {
          selectedSrcIndex: 0,
          selectedSrc:
            "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/huawei-mate30.png",
          srcs: [
            {
              name: "带刘海",
              src: "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/huawei-mate30.png",
              isCDN: "true",
              checked: "true",
            },
            {
              name: "无刘海",
              src: "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/huawei-mate30-no.png",
              isCDN: "true",
            },
          ],
          title: "Huawei Mate 30",
          originBgFrame: [0, 0, 360, 668],
          originPicFrame: [35, 22, 288, 625],
          originBgOffset: [40, 24],
        },
        {
          selectedSrcIndex: 0,
          selectedSrc:
            "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/xiaomi-10-pro-sky-blue.png",
          srcs: [
            {
              name: "星空蓝",
              src: "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/xiaomi-10-pro-sky-blue.png",
              checked: "true",
              isCDN: "true",
            },
            {
              name: "无摄像头",
              src: "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/xiaomi-10-pro-sky-blue-no.png",
              isCDN: "true",
            },
          ],
          title: "小米10 Pro",
          originBgFrame: [0, 0, 600, 1199],
          originPicFrame: [31, 20, 537, 1163],
          originBgOffset: [64, 58],
        },
        {
          selectedSrcIndex: 0,
          selectedSrc:
            "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/xiaomi-mix-3-no.png",
          srcs: [
            {
              name: "无后盖",
              src: "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/xiaomi-mix-3-no.png",
              checked: "true",
              isCDN: "true",
            },
          ],
          title: "小米MIX 3",
          originBgFrame: [0, 0, 468, 880],
          originPicFrame: [46, 36, 374, 810],
          originBgOffset: [40, 20],
        },
        {
          selectedSrcIndex: 0,
          selectedSrc:
            "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/xiaomi-mix-3-palace.png",
          srcs: [
            {
              name: "故宫版",
              src: "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/xiaomi-mix-3-palace.png",
              checked: "true",
              isCDN: "true",
            },
            {
              name: "经典黑",
              src: "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/xiaomi-mix-3-black.png",
              isCDN: "true",
            },
          ],
          title: "小米MIX3 带后盖",
          originBgFrame: [0, 0, 782, 880],
          originPicFrame: [341, 28, 382, 828],
          originBgOffset: [64, 58],
        },
        {
          selectedSrcIndex: 0,
          selectedSrc:
            "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/xiaomi-mix-alpho-2.png",
          srcs: [
            {
              name: "星空蓝",
              src: "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/xiaomi-mix-alpho-2.png",
              checked: "true",
              isCDN: "true",
            },
          ],
          title: "小米MIX Alrha",
          originBgFrame: [0, 0, 604, 881],
          originPicFrame: [198, 204, 264, 572],
          originBgOffset: [0, 0],
        },
        {
          selectedSrcIndex: 0,
          selectedSrc:
            "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/oppo-reno3-pro.png",
          srcs: [
            {
              name: "日出印象",
              src: "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/oppo-reno3-pro.png",
              isCDN: "true",
              checked: "true",
            },
            {
              name: "无摄像头",
              src: "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/oppo-reno3-pro-no.png",
              isCDN: "true",
            },
          ],
          title: "OPPO Reno3 Rro",
          originBgFrame: [0, 0, 600, 1181],
          originPicFrame: [52, 40, 496, 1102],
          originBgOffset: [30, 20],
        },
        {
          selectedSrcIndex: 0,
          selectedSrc:
            "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/one-plus7-pro-black.png",
          srcs: [
            {
              name: "黑 色",
              src: "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/one-plus7-pro-black.png",
              isCDN: "true",
              checked: "true",
            },
          ],
          title: "One Plus 7 Pro",
          originBgFrame: [0, 0, 538, 980],
          originPicFrame: [57, 29, 423, 914],
          originBgOffset: [0, 40],
        },
        {
          selectedSrcIndex: 0,
          selectedSrc:
            "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/samsung-galaxy-note-10.png",
          srcs: [
            {
              name: "星空蓝",
              src: "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/samsung-galaxy-note-10.png",
              isCDN: "true",
              checked: "true",
            },
            {
              name: "无摄像头",
              src: "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/samsung-galaxy-note-10-no.png",
              isCDN: "true",
            },
          ],
          title: "Samsung Note 10",
          originBgFrame: [0, 0, 702, 1256],
          originPicFrame: [83, 53, 533, 1140],
          originBgOffset: [40, 24],
        },
        {
          selectedSrcIndex: 0,
          selectedSrc:
            "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/samsung-galaxy-s10-silver.png",
          srcs: [
            {
              name: "黑  色",
              src: "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/samsung-galaxy-s10-silver.png",
              isCDN: "true",
              checked: "true",
            },
            {
              name: "无摄像头",
              src: "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/samsung-galaxy-s10-silver-no.png",
              isCDN: "true",
            },
          ],
          title: "Samsung S10",
          originBgFrame: [0, 0, 642, 1228],
          originPicFrame: [56, 51, 530, 1117],
          originBgOffset: [40, 40],
        },
        {
          selectedSrcIndex: 0,
          selectedSrc:
            "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/apple-watch-42mm-silver.png",
          srcs: [
            {
              name: "银 蓝",
              src: "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/phoneAlbum/apple-watch-42mm-silver.png",
              isCDN: "true",
              checked: "true",
            },
          ],
          title: "AppleWatch",
          originBgFrame: [0, 0, 512, 950],
          originPicFrame: [100, 280, 312, 390],
          originBgOffset: [58, 0],
        },
      ],
      selectedBgItem: {
        selectedSrc: "",
        title: "",
        srcs: [],
      },
      canvasWidth: 0,
      canvasHeight: 0,
      screenWidth: 375,
      screenHeight: 667,
      windowHeight: 603,
      pixelRatio: 2,
      bgWidth: 225,
      bgHeight: 449,
      picWidth: 180,
      picHeight: 319,
      marginLeft: 23,
      marginTop: 66,
    };
  },
  onLoad: function (e) {
    this.onLoadClone3389(e);
  },
  onShareAppMessage: function () {
    return {
      path: "/pagesA/pages/album/index",
      title: "推荐使用【有料工具】截图、壁纸分享必备小程序",
      desc: "让您轻松的把截图套上手机壳，再分享截图、壁纸或者App给好友呢！",
      imageUrl:
        "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/images-share.png",
    };
  },
  onReady: function () {
    if (uni.createInterstitialAd) {
      (e = uni.createInterstitialAd({
        adUnitId: "adunit-46faf356d01e8f5d",
      })).onLoad(function () {
        console.log("onLoad event emit");
      });
      e.onError(function (e) {
        console.log("onError event emit", e);
      });
      e.onClose(function (e) {
        console.log("onClose event emit", e);
      });
    }
  },
  onShow: function () {
    if (e) {
      e.show().catch(function (e) {
        console.error(e);
      });
    }
  },
  methods: {
    onLoadClone3389: function (e) {
      this.setData({
        userImage: e.pic,
        userImageWidth: e.width,
        userImageHeight: e.height,
        userImageK: e.k,
      });
      var that = this;
      if (e.k > 2) {
        this.setData({
          selectedBgItem: this.bgSrc[3],
        });
      } else {
        this.setData({
          selectedBgItem: this.bgSrc[0],
        });
      }
      uni.getSystemInfo({
        success: function (e) {
          that.setData({
            screenWidth: e.screenWidth,
            screenHeight: e.screenHeight,
            windowHeight: e.windowHeight,
            pixelRatio: e.pixelRatio,
          });
          that.findPosition(0);
        },
      });
    },

    changeBg: function (e) {
      this.findPosition(e.currentTarget.dataset.index);
    },

    redrawCanvas: function () {
      this.setUpCanvas();
      var e = this;
      e.showCanvas = true;
      var s = e.selectedBgItem.originBgFrame;
      var t = e.selectedBgItem.originPicFrame;
      var i = e.selectedBgItem.originBgOffset;
      var n = t[3] / t[2];
      var c = 0;
      var o = 0;
      var r = t[2];
      var a = t[3];
      if (n > e.userImageK) {
        (a = (e.userImageHeight * t[2]) / e.userImageWidth),
          (o = (t[3] - a) / 2);
      } else {
        (r = (e.userImageWidth * t[3]) / e.userImageHeight),
          (c = (t[2] - r) / 2);
      }
      var u = uni.createCanvasContext("myCanvas");
      u.clearRect(0, 0, s[2] + 2 * i[0], s[3] + 2 * i[1]);
      u.fillStyle = "#ffffff";
      u.fillRect(0, 0, s[2] + 2 * i[0], s[3] + 2 * i[1]);
      u.fillStyle = "#000000";
      u.fillRect(i[0] + t[0], i[1] + t[1], t[2], t[3]);
      u.drawImage(e.userImage, i[0] + t[0] + c, i[1] + t[1] + o, r, a);
      u.drawImage(
        e.selectedBgItem.selectedSrc,
        0,
        0,
        s[2],
        s[3],
        i[0],
        i[1],
        s[2],
        s[3],
      );
      u.draw(false, this.saveToAlbum);
    },

    cleanCanvas: function () {
      this.setData({
        canvasHeight: 0,
        canvasWidth: 0,
      });
    },

    setUpCanvas: function () {
      var e = this.selectedBgItem;
      var s = e.originBgFrame[2] + 2 * e.originBgOffset[0];
      var t = e.originBgFrame[3] + 2 * e.originBgOffset[1];
      this.setData({
        canvasHeight: t,
        canvasWidth: s,
      });
    },

    saveToAlbum: function () {
      var that = this;
      uni.canvasToTempFilePath({
        quality: 1,
        canvasId: "myCanvas",
        success: function (s) {
          that.cleanCanvas();
          uni.authorize({
            scope: "scope.writePhotosAlbum",
            success: function () {
              uni.saveImageToPhotosAlbum({
                filePath: s.tempFilePath,
                success: function (s) {
                  that.showCanvas = false;
                  uni.navigateTo({
                    url: "/pages/my_module/phoneAlbum/success/index",
                  });
                },
              });
            },
          });
        },
      });
    },

    createPic: function () {
      uni.showLoading({
        title: "制作中",
      });
      var e = this.selectedBgItem;
      var s = e.selectedSrcIndex;
      if (e.srcs[s].isCDN) {
        var that = this;
        uni.getImageInfo({
          src: e.srcs[s].src,
          success: function (s) {
            uni.saveFile({
              tempFilePath: s.path,
              success: function (s) {
                e.selectedSrc = s.savedFilePath;
                that.redrawCanvas();
              },
            });
          },
        });
      } else {
        this.redrawCanvas();
      }
    },

    findPosition: function (e) {
      var s = this.bgSrc[e];
      var t = s.originBgFrame[2];
      var i = s.originBgFrame[3];
      var n = s.originPicFrame[2];
      var c = s.originPicFrame[3];
      var o = s.originPicFrame[0];
      var r = s.originPicFrame[1];
      var a = this.windowHeight - 220 / this.pixelRatio;
      var u = (0.6 * this.screenWidth - this.bgMarginLeft) / t;
      var p = a / i;
      if (p < u) {
        u = p;
      }
      var l = o * u - Math.floor(o * u);
      var h = r * u - Math.floor(r * u);
      var g = Math.round(n * u) - n * u;
      var m = Math.round(c * u) - c * u;
      t = Math.round(t * u);
      i = Math.round(i * u);
      n = Math.round(n * u);
      c = Math.round(c * u);
      o = Math.floor(o * u);
      r = Math.floor(r * u);
      if (l >= g) {
        n++;
      }
      if (h >= m) {
        c++;
      }
      var d = (a - i) / 2;
      this.setData({
        selectedBgItem: s,
        bgWidth: t,
        bgHeight: i,
        picWidth: n,
        picHeight: c,
        marginLeft: o,
        marginTop: r,
        bgMarginTop: d,
      });
    },

    radioChange: function (e) {
      var s = e.detail.value;
      if (s != this.selectedBgItem.selectedSrcIndex) {
        for (var t = 0; t < this.selectedBgItem.srcs.length; ++t) {
          var i = this.selectedBgItem.srcs[t];
          t == s
            ? ((i.checked = true),
              (this.selectedBgItem.selectedSrcIndex = s),
              (this.selectedBgItem.selectedSrc = i.src))
            : (i.checked = false);
        }
        this.setData({
          selectedBgItem: this.selectedBgItem,
        });
      }
    },
  },
};
</script>
<style>
.myContainer {
  display: flex;
  flex-direction: column;
  height: 90vh;
  overflow: hidden;
  width: 100%;
}

.label-2__icon {
  background: #d3d3d3;
  border-radius: 50px;
  display: inline-block;
  height: 18px;
  margin-right: 10px;
  position: relative;
  vertical-align: middle;
  width: 18px;
}

.label-2__icon-checked {
  background: #1aad19;
  border-radius: 50%;
  height: 12px;
  left: 3px;
  position: absolute;
  top: 3px;
  width: 12px;
}

.btn-area button {
  font-size: 32rpx;
  font-weight: 400;
  height: 96rpx;
  line-height: 96rpx;
  width: 240rpx;
}

.btn-area button,
.btn-area button:hover {
  background-color: #000;
  color: #fff;
}

.text {
  color: #7e8f8f;
  font-size: 24rpx;
  margin-left: 60rpx;
  margin-right: 52rpx;
  margin-top: 54rpx;
}
</style>
