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
                :data-phone="item.phone[index1]"
                class="widget__name"
                >{{ name }}
              </text>

              <text
                @tap="callPhone"
                :data-phone="item.phone[index1]"
                class="phoneText"
                >{{ item.phone[index1] }}
              </text>

              <image
                @tap="callPhone"
                :data-phone="item.phone[index1]"
                class="widget__arrow"
                mode="aspectFill"
                src="http://xue.ccy1994.top/xiaochengxu/mini-tools/static/pages/my_module/phone/phone.png"
              ></image>

              <view
                @tap="callPhone"
                :data-phone="item.phone[index1]"
                :class="
                  'widget__line' + (index1 == 0 ? ' widget__line_first' : '')
                "
              ></view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data: function () {
    return {
      isRelease: true,
      list: [
        {
          id: "view",
          name: "紧急电话",
          open: !1,
          subName: [
            "火警",
            "盗警",
            "急救",
            "报时",
            "电力抢修",
            "管道液化气抢修",
            "市话障碍",
            "交通事故",
            "天气预报",
            "号码查询",
            "自来水抢修",
          ],
          phone: [
            "119",
            "110",
            "120",
            "117",
            "95598",
            "87221599",
            "112",
            "122",
            "121",
            "114",
            "87011670",
          ],
        },
        {
          id: "form",
          name: "银行电话",
          open: !1,
          subName: [
            "工商银行",
            "建设银行",
            "农业银行",
            "中国银行",
            "交通银行",
            "浦发银行",
            "民生银行",
            "兴业银行",
            "中信银行",
            "深圳发展银行",
            "华夏银行",
            "招商银行",
            "广发银行",
            "广东农信",
            "光大银行",
          ],
          phone: [
            "95588",
            "95533",
            "95599",
            "95566",
            "95559",
            "95528",
            "95568",
            "95561",
            "95558",
            "95501",
            "95577",
            "95555",
            "95508",
            "96138",
            "95595",
          ],
        },
        {
          id: "feedback",
          name: "快递电话",
          open: !1,
          subName: [
            "申通快递",
            "EMS",
            "顺丰速运",
            "圆通速递",
            "中通速递",
            "韵达快运",
            "百世快递",
            "天天快递",
            "德邦快递",
            "速尔快递",
            "中铁快运",
            "UPS",
          ],
          phone: [
            "95543",
            "11183",
            "95338",
            "95554",
            "95311",
            "95546",
            "95320",
            "4001888888",
            "95353",
            "4008822168",
            "95572",
            "4008208388",
          ],
        },
        {
          id: "baoxian",
          name: "保险电话",
          open: !1,
          subName: [
            "中国人保",
            "中国人寿",
            "中国平安",
            "太平洋保险",
            "泰康人寿",
            "新华人寿",
          ],
          phone: ["95518", "95519", "95511", "95500", "95522", "95567"],
        },
        {
          id: "nav",
          name: "通讯客服",
          open: !1,
          subName: [
            "中国移动",
            "中国联通",
            "中国电信",
            "中国网通",
            "中国铁通",
            "中国邮政",
          ],
          phone: ["10086", "10010", "10000", "10060", "10050", "11185"],
        },
        {
          id: "media",
          name: "投诉举报",
          open: !1,
          subName: [
            "消费者投诉热线",
            "价格投诉热线",
            "质量投诉",
            "环保投诉",
            "税务投诉",
            "公共卫生监督",
            "电信投诉",
            "市长热线",
            "法律援助",
            "妇女维权",
            "民工维权",
          ],
          phone: [
            "12315",
            "12358",
            "12365",
            "12369",
            "12366",
            "12320",
            "12300",
            "12366",
            "12351",
            "12338",
            "12333",
          ],
        },
        {
          id: "map",
          name: "铁路航空",
          subName: [
            "铁路",
            "国航",
            "海航",
            "南航",
            "东航",
            "深航",
            "厦航",
            "山航",
          ],
          phone: [
            "12306",
            "4008100999",
            "950718",
            "4006695539",
            "95530",
            "4008895080",
            "95557",
            "4006096777",
          ],
        },
        {
          id: "canvas",
          name: "售后服务",
          subName: [
            "苹果",
            "诺基亚",
            "三星",
            "联想",
            "戴尔",
            "索尼",
            "飞利浦",
            "松下",
            "东芝",
            "TCL",
          ],
          phone: [
            "4006272273",
            "4008800123",
            "8008108888",
            "8008580888",
            "8008209000",
            "8008201201",
            "8008100781",
            "8008108208",
            "4008123456",
            "400-812-3456",
          ],
        },
        {
          id: "canvas1",
          name: "其他常用电话",
          subName: [
            "工资拖欠举报电话",
            "经济犯罪举报中心",
            "打拐买举报电话",
            "土地矿产法律热线",
            "水利工程建设举报",
            "扫黄打非举报电话",
            "农业安全生产事故",
            "消费者申诉举报电话",
            "税务违法举报",
          ],
          phone: [
            "010-68304532",
            "010-65204333",
            "010-84039250",
            "16829999",
            "010-63205050",
            "010-65254722",
            "010-64192512",
            "12315",
            "010-63417425",
          ],
        },
      ],
    };
  },
  onLoad() {
    this.setData({
      isRelease: getApp().globalData.isRelease,
    });
  },
  methods: {
    widgetsToggle: function (e) {
      for (
        var n = e.currentTarget.id, a = this.list, o = 0, p = a.length;
        o < p;
        ++o
      )
        a[o].id == n ? (a[o].open = !a[o].open) : (a[o].open = !1);
      this.setData({
        list: a,
      });
    },
    callPhone: function (e) {
      wx.makePhoneCall({
        phoneNumber: e.target.dataset.phone,
      });
    },
  },

  onShareAppMessage: function () {
    return {
      title: "常用电话大全",
      path: "/pages/my_module/phone/phone",
    };
  },
  onShareTimeline: function (e) {
    return {
      title: "常用电话大全",
      path: "/pages/my_module/phone/phone",
    };
  },
};
</script>
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
