<template>
  <view>
    <view class="page container">
      <view class="org-section padding-xl radius shadow-warp" v-if="org">
        <textarea
          @input="onInput"
          class="org-text"
          :disabled="inprogress"
          maxlength="500"
          name="orgText"
          placeholder="请输入要加密文本"
          rows="6"
          :value="orgText"
        >
        </textarea>
        <view class="btn-area">
          <text class="text-count">{{ textCount }}/500</text>
          <view style="display: flex">
            <button v-on:click="onPaste" class="my-btn">一键粘贴</button>
            <button v-on:click="onClean" class="my-btn">清空内容</button>
          </view>
        </view>
        <view class="secret-area">
          <view class="secret-input-area">
            <input
              @input="onSecret"
              class="secret-input"
              maxlength="16"
              name="secret"
              :password="!showPassword"
              placeholder="请输入密钥，长度6-16个字符"
              :value="secret"
            />
            <image
              v-on:click="showPasswordFun"
              class="show-password-icon"
              src="http://xue.ccy1994.top/xiaochengxu/mini-tools/static/pages/my_module/crypt/eye-close.png"
              v-if="!showPassword"
            ></image>
            <image
              v-on:click="showPasswordFun"
              class="show-password-icon"
              src="http://xue.ccy1994.top/xiaochengxu/mini-tools/static/pages/my_module/crypt/eye.png"
              v-if="showPassword"
            ></image>
          </view>
        </view>
        <button v-on:click="enc" class="start-btn">加密</button>
      </view>
      <view class="enc-section padding-xl radius shadow-warp" v-if="!org">
        <textarea
          class="enc-text"
          :disabled="true"
          maxlength="0"
          name="encText"
          placeholder="加密结果（密文）"
          :value="encText"
        >
        </textarea>
        <view class="btn-area">
          <button v-on:click="copyToClipBoard" class="my-btn">复制密文</button>
        </view>
        <button v-on:click="back" class="start-btn">返回</button>
      </view>
    </view>
    <button v-on:click="qjm" class="start-btn">去解密</button>
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
      orgText: "",
      textCount: 0,
      secret: "",
      fullFeature: 0,
      org: 1,
      showPassword: 0,
      encText: "",
      inprogress: "",
    };
  },
  onLoad: function (t) {},
  onShareAppMessage: function () {
    return {
      title: "文本加密工具",
      path: "/pages/my_module/crypt/crypt",
    };
  },
  onShareTimeline: function (t) {
    return {
      title: "文本加密工具",
      path: "/pages/my_module/crypt/decrypt",
    };
  },
  methods: {
    qjm: function (t) {
      uni.navigateTo({
        url: "./decrypt",
      });
    },

    enc: function (t) {
      var e = this.orgText;
      if (0 != e.length) {
        var n = this.secret;
        if (n && 0 != n.length) {
          if (
            (!n.match(/\d/) && !n.match(/[a-zA-Z]/) && !n.match("_")) ||
            n.length < 6 ||
            n.length > 16
          ) {
            uni.showModal({
              title: "提示",
              content:
                "密钥长度需要6-16个字符，只能包含英文字母，数字或字符'_'",
              showCancel: false,
              success: function (t) {},
            });
          } else {
            for (var o = [], s = 0; s < 16; s++) {
              if (s < n.length) {
                o.push(n.charCodeAt(s));
              } else {
                o.push(0);
              }
            }
            let encrypt = CryptoJS.AesEncryptECB(e, o);
            this.setData({
              encText: encrypt,
              org: 0,
            });
          }
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
          content: "待加密内容为空",
          showCancel: false,
          success: function (t) {},
        });
      }
    },

    back: function (t) {
      this.setData({
        org: 1,
      });
    },

    copyToClipBoard: function (t) {
      uni.setClipboardData({
        data: this.encText,
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
          var a = that.orgText + t.data;
          if (a.length > 500) {
            a = a.substr(0, 500);
          }
          that.setData({
            orgText: a,
            textCount: a.length,
          });
        },
      });
    },

    onClean: function (t) {
      this.setData({
        orgText: "",
        textCount: 0,
      });
    },

    onInput: function (t) {
      var e = t.detail.value;
      this.setData({
        orgText: e,
        textCount: e.length,
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

.enc-section {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 5% auto;
  width: 98%;
}

.enc-section,
.enc-text {
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
  justify-content: space-between;
  width: 96%;
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
  font-size: 28rpx;
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
