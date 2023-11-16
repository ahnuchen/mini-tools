<template>
  <view class="after-navber" v-if="!isRelease">
    <view class="container">
      <form @submit="formSubmit">
        <view>
          <picker
            @change="bindPickerChange"
            class="seachInput"
            mode="multiSelector"
            :range="blood"
            :value="b"
          >
            <view class="picker"
              >您的血型：{{ blood[0][b[0]] }} , 配偶血型：{{ blood[1][b[1]] }}
              <wd-icon name="edit-outline" size="40rpx"></wd-icon>
            </view>
          </picker>
        </view>
        <view class="itemButtom">
          <button class="seachButtom" formType="submit">查询</button>
        </view>
      </form>
      <view class="paragraphs" v-if="flag == 1">
        <view class="paragraph">{{ dataInfo }}</view>
      </view>
      <view class="tool-info">
        <text class="title">血型知识</text>
        <text class="info">
          在医学上，血型一般分为 AA 、OA、BB 、OB、AB 和 O 型六种血型，AA 型和
          OA 型统称为 A 型，BB 型和 OB 型也统称为 B 型。
          子女的血型是取父亲血型的一部分（ A 、B 或 O ）和母亲血型的一部分（ A
          、B 或
          O）混合而成的新的血型，这个新的血型就是子女的血型，所以子女的血型与父母的血型有关。
        </text>
      </view>
    </view>
    <!-- <view style="width: 92%;margin: 10rpx auto;">
<ad unit-id="{{bannerUnitId}}" ad-intervals="30"></ad>
</view> -->
  </view>
</template>

<script>
var app = getApp();
export default {
  data() {
    return {
      isRelease: true,
      bannerUnitId: getApp().globalData.bannerUnitId,
      b: [0, 0],
      blood: [
        ["A型", "B型", "O型", "AB型"],
        ["A型", "B型", "O型", "AB型"],
      ],
      setBlood: ["A", "B", "O", "AB"],
      dataInfo: [],
      flag: 0,
    };
  },
  onLoad: function (B) {
    this.setData({
      isRelease: getApp().globalData.isRelease,
    });
  },
  onShow: function () {
    app.globalData.pages = getCurrentPages();
  },
  onShareAppMessage: function (B) {
    return {
      title: "子女血型查询",
      path: "/pages/my_module/blood/blood",
    };
  },
  onShareTimeline: function (B) {
    return {
      title: "子女血型查询",
      path: "/pages/my_module/blood/blood",
    };
  },
  methods: {
    bindPickerChange: function (B) {
      this.setData({
        b: B.detail.value,
      });
    },

    formSubmit: function (B) {
      var A = "请选择正确的血型";
      var t = this.setBlood[this.b[0]];
      var a = this.setBlood[this.b[1]];
      if ("A" == t && "B" == a) {
        A = "您的孩子的血型可能为 A 型、B 型、AB 型、O 型";
      }
      if ("B" == t && "A" == a) {
        A = "您的孩子的血型可能为 A 型、B 型、AB 型、O 型";
      }
      if ("A" == t && "A" == a) {
        A = "您的孩子的血型可能为 A 型或 O 型，不可能为 B 型 和 AB 型";
      }
      if ("A" == t && "O" == a) {
        A = "您的孩子的血型可能为 A 型或 O 型，不可能为 B 型 和 AB 型";
      }
      if ("O" == t && "A" == a) {
        A = "您的孩子的血型可能为 A 型或 O 型，不可能为 B 型 和 AB 型";
      }
      if ("A" == t && "AB" == a) {
        A = "您的孩子的血型可能为  A 型 、B型 及 AB型之一，不可能为 O 型";
      }
      if ("AB" == t && "A" == a) {
        A = "您的孩子的血型可能为  A 型 、B型 及 AB型之一，不可能为 O 型";
      }
      if ("B" == t && "B" == a) {
        A = "您的孩子的血型可能为 B 型或 O 型，不可能为 A 型 和 AB 型";
      }
      if ("B" == t && "O" == a) {
        A = "您的孩子的血型可能为 B 型或 O 型，不可能为 A 型 和 AB 型";
      }
      if ("O" == t && "B" == a) {
        A = "您的孩子的血型可能为 B 型或 O 型，不可能为 A 型 和 AB 型";
      }
      if ("B" == t && "AB" == a) {
        A = "您的孩子的血型可能为  A 型 、B型 及 AB型之一，不可能为 O 型";
      }
      if ("AB" == t && "B" == a) {
        A = "您的孩子的血型可能为  A 型 、B型 及 AB型之一，不可能为 O 型";
      }
      if ("O" == t && "O" == a) {
        A = "您的孩子的血型可能为 O 型，不可能为 A 型、B 型和 AB 型";
      }
      if ("O" == t && "AB" == a) {
        A = "您的孩子的血型可能为 A 型或 B 型，不可能为 O 型 和 AB 型";
      }
      if ("AB" == t && "O" == a) {
        A = "您的孩子的血型可能为 A 型或 B 型，不可能为 O 型 和 AB 型";
      }
      if ("AB" == t && "AB" == a) {
        A = "您的孩子的血型可能为  A 型 、B型 及 AB型之一，不可能为 O 型";
      }
      this.setData({
        dataInfo: A,
        flag: 1,
      });
    },
  },
};
</script>
<style>
.container {
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  margin-top: 20rpx;
  padding: 15rpx 0;
}

form {
  margin: 10px auto;
  width: 90%;
}

.itemTitle {
  font-size: 17pt;
  width: 90%;
}

.seachInput {
  background-color: #f5f4f9;
  border-radius: 20rpx;
  font-size: 13pt;
  height: 30pt;
  line-height: 30pt;
  padding: 5px;
  text-align: center;
}

.itemButtom {
  padding: 5px 5px 5px 0;
}

.seachButtom {
  background-color: #1aad19;
  margin-top: 10%;
  text-align: center;
}

.resetButtom,
.seachButtom {
  border-radius: 3pt;
  color: #fff;
  font-size: 13pt;
  height: 30pt;
  line-height: 30pt;
  width: 60pt;
}

.resetButtom {
  background-color: #e64340;
  float: left;
  margin-left: 5px;
}

.paragraphs {
  background-color: #ececec;
  border-radius: 20rpx;
  color: #353535;
  font-size: 14pt;
  margin-top: 20px;
  padding: 6px 0;
  text-align: left;
  width: 90%;
}

.paragraph {
  line-height: 25px;
  margin-left: 5px;
}

.hint {
  color: grey;
  font-size: 12px;
  margin: 15px;
}

.tool-info {
  padding-top: 2rem;
  width: 90%;
}

.tool-info .title {
  font-size: 16px;
  font-weight: 700;
  padding-bottom: 5px;
}

.tool-info .info {
  color: #666;
  font-size: 16px;
  line-height: 1.6;
  padding-bottom: 10px;
}
</style>
