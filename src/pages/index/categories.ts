const subCategories = new Array(15).fill(
  {
    title: "标题文字",
    label: "这是描述这是描述",
    url: "/pages/qrcode/index",
  },
  0,
  24,
);

export const categories: {
  label: string;
  title: string;
  icon: string;
  items: {
    title: string;
    label?: string;
    url: string;
    shortDesc?: string;
    icon?: string;
  }[];
}[] = [
  {
    label: "图片工具",
    title: "图片工具",
    icon: "thumb-up",
    items: [
      {
        title: "二维码生成",
        label:
          "二维码生成是一个专业、免费的二维码生成工具。它可以将域名、汉字、名字、英文生成二维码，通过可用通过该工具生成的二维码使用在各个场景中，适合程序员、运营名、产品等有二维码需求的用户进行使用",
        url: "/pages/qrcode/index",
        shortDesc: "域名、汉字、英文生成二维码",
        icon: "/static/icons/b91aa2df_PzgvtAd45lU.png",
      },
      {
        title: "二维码识别",
        url: "/pages/my_module/scanQrcode/scanQrcode",
        icon: "/static/icons/eqweimashibie.png",
      },
      // {
      //   title: "国旗头像制作",
      //   label: "",
      //   url: "/pages/my_module/flag/index",
      //   shortDesc: "",
      //   icon: "/static/icons/guoqitouxiang.png",
      // },
      // {
      //   title: "带壳截图",
      //   url: "/pages/my_module/phoneAlbum/index",
      //   icon: "/static/icons/phoneAlbum.png",
      // },
      {
        title: "图片拼接",
        url: "/pages/my_module/screenshotConnect/screenshotConnect",
        icon: "/static/icons/tupianpinjie.png",
      },
      {
        title: "九宫格切图",
        url: "/pages/my_module/cuttingNine/cuttingNine",
        icon: "/static/icons/jiugongge.png",
      },
    ],
  },
  {
    label: "生活娱乐",
    title: "生活娱乐工具",
    icon: "location",
    items: [
      {
        title: "退休年龄",
        url: "/pages/retire/retire",
        shortDesc: "法定退休年龄计算器",
        icon: "/static/icons/retire.png",
      },
      {
        title: "手持弹幕LED",
        url: "/pages/led/led",
        shortDesc: "手持LED工具，展示大号文字跑马灯",
        icon: "/static/icons/b91aa2df_uKlrxP6XhFU.png",
      },
      {
        title: "亲戚称呼计算器",
        shortDesc: "计算我对亲戚的称呼和亲戚对我的称呼",
        label: "",
        url: "/pages/relativesname/relativesname",
        icon: "/static/icons/b91aa2df_5QJiaZbeCPA.png",
      },
      {
        title: "倒计时",
        url: "/pages/my_module/countDown/countDown",
        icon: "/static/icons/daojishi0.png",
      },
      {
        title: "全屏时钟",
        url: "/pages/my_module/clock/clock",
        icon: "/static/icons/quanpinshizhong0.png",
      },
      {
        title: "手机清灰",
        url: "/pages/my_module/qh/index",
        icon: "/static/icons/shoujiqinghui.png",
      },
    ],
  },
  {
    label: "测算工具",
    title: "测算工具工具",
    icon: "location",
    items: [
      {
        title: "一生时间",
        url: "/pages/my_module/lifeTime/lifeTime",
        icon: "/static/icons/yishengshijian.jpg",
      },
      {
        title: "房贷计算器",
        url: "/pages/my_module/calc_mortgage/index",
        icon: "/static/icons/fangdaijisuanqi.png",
      },
      {
        title: "尺码计算",
        url: "/pages/my_module/calc_size/index",
        icon: "/static/icons/chimajisuan.png",
      },
      {
        title: "色盲测试",
        url: "/pages/my_module/blind/blind",
        icon: "/static/icons/semangceshi8.png",
      },
      {
        title: "尺子",
        url: "/pages/my_module/ruler/ruler",
        icon: "/static/icons/ruler.png",
      },
      {
        title: "量角器",
        url: "/pages/my_module/protractor/protractor",
        icon: "/static/icons/liangjiaoqi.png",
      },
      {
        title: "BMI计算器",
        url: "/pages/my_module/bmi/bmi",
        icon: "/static/icons/bmijisuanqi.png",
      },
      {
        title: "血型计算",
        url: "/pages/my_module/blood/blood",
        icon: "/static/icons/xuexingjisuan.png",
      },
    ],
  },
  {
    label: "数据换算",
    title: "数据换算工具",
    icon: "qrcode",
    items: [
      {
        title: "温度转换",
        label:
          "温度转换是一款多功能的数据处理软件，支持多平台应用。它可以将任意格式的数字转换为所需的模拟温度值，例如摄氏度、华氏度、开尔文等，适合温度不同场合转换有严格要求的用户",
        url: "/pages/temperaturetrans/temperaturetrans",
        shortDesc: "摄氏度、华氏度、开尔文等温度换算",
        icon: "/static/icons/b91aa2df_pIStnjBbjgv.png",
      },
      {
        title: "日期计算",
        shortDesc: "计算日期时间间隔日期、n天后的日期",
        label:
          "温度转换是一款多功能的数据处理软件，支持多平台应用。它可以将任意格式的数字转换为所需的模拟温度值，例如摄氏度、华氏度、开尔文等，适合温度不同场合转换有严格要求的用户",
        url: "/pages/datecal/datecal",
        icon: "/static/icons/b91aa2df_xHxN8T3u3Si.png",
      },
      {
        title: "随机数",
        url: "/pages/my_module/randomNum/randomNum",
        icon: "/static/icons/suijishu.png",
      },
      {
        title: "文本加密",
        url: "/pages/my_module/crypt/crypt",
        icon: "/static/icons/wenbenjiami.png",
      },
      {
        title: "文本解密",
        url: "/pages/my_module/crypt/decrypt",
        icon: "/static/icons/wenbenjiemi.png",
      },
    ],
  },

  {
    label: "信息查询",
    title: "信息查询工具",
    icon: "location",
    items: [
      {
        title: "车牌归属地",
        shortDesc: "查询全国各地车牌号属于的省市",
        url: "/pages/carnumber/carnumber",
        icon: "/static/icons/b91aa2df_YMLnLlw29K2.png",
      },
      {
        title: "常用号码",
        url: "/pages/my_module/phone/phone",
        icon: "/static/icons/changyoingdianhua.png",
      },
    ],
  },
  {
    label: "开发工具",
    title: "开发工具",
    icon: "ie",
    items: [
      {
        title: "url编解码",
        url: "/pages/urlencode/urlencode",
        shortDesc: "域名decode和encode",
        icon: "/static/icons/20220215_vkxz563mr1i.png",
      },
      {
        title: "json格式化",
        url: "/pages/jsonbeautify/jsonbeautify",
        shortDesc: "在线美化JSON数据",
        icon: "/static/icons/20220215_an12qpaobs.png",
      },
    ],
  },
];
