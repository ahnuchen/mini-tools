<template>
  <view class="index" v-if="!isRelease">
    <view class="body">
      <view class="widgets">
        <view class="widgets__item" v-for="(item, index) in list" :key="index">
          <view
            @tap="widgetsToggle"
            :class="'widgets__info ' + (item.open ? 'widgets__info_show' : '')"
            :id="item.id"
          >
            <text class="widgets__info-name">{{ item.name }}</text>
            <image
              class="widgets__info-img"
              mode="aspectFill"
              src="http://xue.ccy1994.top/xiaochengxu/mini-tools/static/pages/my_module/phone/arrowright.png"
            ></image>
          </view>

          <view
            :class="'widgets__list ' + (item.open ? 'widgets__list_show' : '')"
          >
            <view
              @tap="callPhone"
              class="widget"
              :data-phone="item.phone[index]"
              hoverStartTime="10"
              hoverStayTime="100"
              v-for="(name, index1) in item.subName"
              :key="index1"
            >
              <text
                @tap="callPhone"
                :data-phone="item.phone[index]"
                class="widget__name"
                >{{ name }}</text
              >

              <text
                @tap="callPhone"
                :data-phone="item.phone[index]"
                class="phoneText"
                >{{ item.phone[index] }}</text
              >

              <image
                @tap="callPhone"
                :data-phone="item.phone[index]"
                class="widget__arrow"
                mode="aspectFill"
                src="http://xue.ccy1994.top/xiaochengxu/mini-tools/static/pages/my_module/phone/phone.png"
              ></image>

              <view
                @tap="callPhone"
                :data-phone="item.phone[index]"
                :class="
                  'widget__line ' + (index == 0 ? 'widget__line_first' : '')
                "
              ></view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style>
.index {
  background-color: #fbf9fe;
  flex: 1;
  font-family:
    -apple-system-font,
    Helvetica Neue,
    Helvetica,
    sans-serif;
  font-size: 32rpx;
  min-height: 100%;
}

.head {
  line-height: 1;
  padding: 80rpx;
}

.body {
  overflow: hidden;
  padding-left: 30rpx;
  padding-right: 30rpx;
}

.title {
  font-size: 52rpx;
}

.desc {
  color: #888;
  font-size: 28rpx;
  margin-top: 10rpx;
}

.widgets__item {
  background-color: #fff;
  border-radius: 20rpx;
  cursor: pointer;
  margin-bottom: 20rpx;
  margin-top: 20rpx;
  overflow: hidden;
}

.widgets__info {
  align-items: center;
  background: #dfdfdf;
  display: flex;
  flex-direction: row;
  padding: 40rpx;
}

.widgets__info_show .widgets__info-img {
  transform: rotate(-180deg);
}

.widgets__info-name {
  flex: 1;
}

.widgets__info-img {
  height: 32rpx;
  transform: rotate(0deg);
  transition: transform 0.4s;
  transition:
    transform 0.4s,
    -webkit-transform 0.4s;
  width: 32rpx;
}

.widgets__list {
  display: none;
}

.widgets__list .phoneText {
  color: #515151;
  float: right;
  margin-right: 25px;
}

.widgets__list_show {
  display: block;
}

.widget {
  padding: 26rpx 40rpx;
  position: relative;
}

.widget__arrow {
  height: 32rpx;
  position: absolute;
  right: 44rpx;
  top: 28rpx;
  width: 32rpx;
}

.widget__line {
  background-color: #f0f0f0;
  content: " ";
  height: 2rpx;
  left: 40rpx;
  position: absolute;
  right: 0;
  top: 0;
}

.widget__line_first {
  background-color: #d8d8d8;
  left: 0;
  right: 0;
}
</style>
