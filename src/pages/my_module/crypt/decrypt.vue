<template>
  <view>
    <view class="page container">
      <view
        class="org-section padding-xl radius shadow-warp bg-white margin-top"
        v-if="org"
      >
        <textarea
          @input="onInput"
          class="org-text"
          :disabled="inprogress"
          name="orgText"
          placeholder="请输入要解密文本"
          rows="6"
          :value="encText"
        >
        </textarea>

        <view class="btn-area">
          <button @click="onPaste" class="my-btn" :disabled="encText.length">
            一键粘贴
          </button>
          <button @click="onClean" class="my-btn">清空内容</button>
        </view>

        <view class="secret-area">
          <view class="secret-input-area">
            <input
              @input="onSecret"
              class="secret-input"
              maxlength="16"
              name="secret"
              :password="!showPassword"
              placeholder="请输入密钥"
              :value="secret"
            />
            <image
              @tap="showPasswordFun"
              class="show-password-icon"
              src="http://xue.ccy1994.top/xiaochengxu/mini-tools/static/pages/my_module/crypt/eye-close.png"
              v-if="!showPassword"
            ></image>
            <image
              @tap="showPasswordFun"
              class="show-password-icon"
              src="http://xue.ccy1994.top/xiaochengxu/mini-tools/static/pages/my_module/crypt/eye.png"
              v-if="showPassword"
            ></image>
          </view>
        </view>
        <button @tap="dec" class="start-btn">解密</button>
      </view>
      <view
        class="dec-section padding-xl radius shadow-warp bg-white margin-top"
        style="margin: 10% auto; border-radius: 20rpx; width: 95%"
        v-if="!org"
      >
        <textarea
          class="org-text"
          :disabled="true"
          maxlength="0"
          name="decText"
          placeholder="解密结果"
          :value="decText"
        >
        </textarea>
        <view class="btn-area">
          <button @click="copyToClipBoard" class="my-btn">复制内容</button>
        </view>
        <button @tap="back" class="start-btn">返回</button>
      </view>
    </view>
    <button @tap="qjm" class="start-btn">去加密</button>
    <view style="font-size: 25rpx; text-align: left; margin: 5%">
      说明：本工具使用AES算法对文本进行加密解密，没有密钥，任何人无法查看加密内容(本工具完全本地进行加解密).
    </view>

    <!-- <view style="width: 96%;margin: 20rpx auto;">
<ad unit-id="{{bannerUnitId}}" ad-intervals="30"></ad>
</view> -->
  </view>
</template>

<script>
import CryptoJS from "./utils/aes_util.js";

export default {
  data() {
    return {
      bannerUnitId: getApp().globalData.bannerUnitId,
      encText: "",
      secret: "",
      org: 1,
      showPassword: 0,
      decText: "",
      inprogress: "",
    };
  },
  onLoad: function (t) {
    if (t.enctext) {
      this.setData({
        encText: t.enctext,
      });
    }
  },
  onShareAppMessage: function () {
    return {
      title: "文本解密工具",
      path: "/pages/my_module/crypt/decrypt",
    };
  },
  onShareTimeline: function (t) {
    return {
      title: "文本解密工具",
      path: "/pages/my_module/crypt/decrypt",
    };
  },
  methods: {
    qjm: function (t) {
      uni.navigateTo({
        url: "./crypt",
      });
    },

    dec: function (t) {
      var e = this.encText;
      if (0 != e.length) {
        var n = this.secret;
        if (n && 0 != n.length) {
          for (var o = [], s = 0; s < 16; s++) {
            if (s < n.length) {
              o.push(n.charCodeAt(s));
            } else {
              o.push(0);
            }
          }
          let dncrypt = CryptoJS.AesDecryptECB(e, o);
          this.setData({
            decText: dncrypt,
            org: 0,
          });
        } else {
          uni.showModal({
            title: "提示",
            content: "密钥不能为空",
            showCancel: false,
            success: function (t) {},
          });
        }
      } else {
        uni.showModal({
          title: "提示",
          content: "待解密内容为空",
          showCancel: false,
          success: function (t) {},
        });
      }
    },

    showPasswordFun: function (t) {
      var e = this.showPassword;
      this.setData({
        showPassword: !e,
      });
    },

    copyToClipBoard: function (t) {
      uni.setClipboardData({
        data: this.decText,
        success: function (t) {
          uni.getClipboardData({
            success: function (t) {
              console.log(t.data);
            },
          });
        },
      });
    },

    onPaste: function (t) {
      var that = this;
      uni.getClipboardData({
        success: function (t) {
          var a = that.encText + t.data;
          that.setData({
            encText: a,
          });
        },
      });
    },

    onClean: function (t) {
      this.setData({
        encText: "",
      });
    },

    onInput: function (t) {
      var e = t.detail.value;
      this.setData({
        encText: e,
      });
    },

    onSecret: function (t) {
      var e = t.detail.value;
      this.setData({
        secret: e,
      });
    },

    showPasswordFun: function (t) {
      var e = this.showPassword;
      this.setData({
        showPassword: !e,
      });
    },

    back() {
      console.log("占位：函数 back 未声明");
    },
  },
};
</script>
<style>
.enc-text {
  border: 1px solid gray;
  color: gray;
  display: flex;
  flex-wrap: wrap;
  height: 400rpx;
  margin-bottom: 20rpx;
  margin-top: 20rpx;
  padding: 10rpx 10rpx 60rpx;
  position: relative;
  width: 90%;
}

.secret-input {
  border-bottom: 1px solid gray;
  font-size: 28rpx;
  height: 80rpx;
  padding-left: 20rpx;
  width: 90%;
}

.org-section {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 5% auto;
  width: 98%;
}

.org-section,
.org-text {
  border-radius: 20rpx;
  font-size: 32rpx;
}

.org-text {
  background-color: #f5f5f5;
  border: 1px solid gray;
  font-weight: 800;
  height: 400rpx;
  margin-top: 20rpx;
  padding: 20rpx 20rpx 60rpx;
  position: relative;
  width: 90%;
}

.btn-area {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 90%;
  margin-top: 20rpx;
}

.btn-area,
.my-btn {
  align-items: center;
  display: flex;
}

.my-btn {
  background: #1296db;
  color: #fff;
  font-size: 30rpx;
  height: 50rpx;
  justify-content: center;
  margin-left: 20rpx;
  margin-right: 20rpx;
}

.text-count {
  bottom: 15rpx;
  font-size: 28rpx;
  left: 20rpx;
  position: absolute;
}

.secret-area {
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin-top: 40rpx;
  width: 90%;
}

.secret-area,
.secret-input-area {
  display: flex;
}

.secret-input-area {
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
}

.secret-input {
  border-bottom: 1px solid gray;
  font-size: 28rpx;
  height: 80rpx;
  padding-left: 20rpx;
  width: 90%;
}

.show-password-icon {
  height: 40rpx;
  width: 40rpx;
  z-index: 99;
}

.start-btn {
  background: #1296db;
  color: #fff;
  height: 80rpx;
  margin-bottom: 20rpx;
  margin-top: 40rpx;
  width: 45%;
}

.enc-section,
.start-btn {
  align-items: center;
  display: flex;
  font-size: 32rpx;
  justify-content: center;
}

.enc-section {
  background: #f0f4f3;
  flex-direction: column;
  width: 100%;
}

.enc-text {
  border: 1px solid gray;
  color: gray;
  display: flex;
  flex-wrap: wrap;
  height: 400rpx;
  margin-bottom: 20rpx;
  margin-top: 20rpx;
  padding: 10rpx 10rpx 60rpx;
  position: relative;
  width: 90%;
}

.padding-xl {
  padding: 10rpx;
}

.radius {
  border-radius: 6rpx;
}

.shadow-warp {
  box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
  width: 90%;
}
</style>
