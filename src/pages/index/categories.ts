const subCategories = new Array(15).fill({
    title: '标题文字',
    label: '这是描述这是描述',
    url: '/pages/qrcode/index'
}, 0, 24)

export const categories: {
    label: string,
    title: string,
    icon: string,
    items: { title: string, label?: string, url: string, shortDesc?: string, icon?: string }[]
}[] = [
    {
        label: '图片工具',
        title: '图片工具',
        icon: 'thumb-up',
        items: [
            {
                title: '二维码生成',
                label: '二维码生成是一个专业、免费的二维码生成工具。它可以将域名、汉字、名字、英文生成二维码，通过可用通过该工具生成的二维码使用在各个场景中，适合程序员、运营名、产品等有二维码需求的用户进行使用',
                url: '/pages/qrcode/index',
                shortDesc: '域名、汉字、英文生成二维码',
                icon: 'https://m4.publicimg.browser.qq.com/imgUpload/qbtool.t_tool_info/b91aa2df_PzgvtAd45lU.png'
            }
        ]
    },
    {
        label: '数据换算',
        title: '数据换算工具',
        icon: 'qrcode',
        items: [
            {
                title: '温度转换',
                label: '温度转换是一款多功能的数据处理软件，支持多平台应用。它可以将任意格式的数字转换为所需的模拟温度值，例如摄氏度、华氏度、开尔文等，适合温度不同场合转换有严格要求的用户',
                url: '/pages/temperaturetrans/temperaturetrans',
                shortDesc: '摄氏度、华氏度、开尔文等温度换算',
                icon: 'https://m4.publicimg.browser.qq.com/imgUpload/qbtool.t_tool_info/b91aa2df_pIStnjBbjgv.png'
            },
            {
                title: '日期计算',
                shortDesc: '计算日期时间间隔日期、n天后的日期',
                label: '温度转换是一款多功能的数据处理软件，支持多平台应用。它可以将任意格式的数字转换为所需的模拟温度值，例如摄氏度、华氏度、开尔文等，适合温度不同场合转换有严格要求的用户',
                url: '/pages/datecal/datecal',
                icon: 'https://m4.publicimg.browser.qq.com/imgUpload/qbtool.t_tool_info/b91aa2df_xHxN8T3u3Si.png'
            },
            {
                title: '亲戚关系计算器',
                shortDesc: '计算亲戚的称呼，亲戚之间的称呼',
                label: '',
                url: '/pages/relativesname/relativesname',
                icon: 'https://m4.publicimg.browser.qq.com/imgUpload/qbtool.t_tool_info/b91aa2df_5QJiaZbeCPA.png'
            },
        ]
    },
    {
        label: '生活娱乐',
        title: '生活娱乐工具',
        icon: 'location',
        items: [{
            title: '手持弹幕LED',
            url: '/pages/led/led',
            shortDesc: '手持LED工具，展示大号文字跑马灯',
            icon: 'https://m4.publicimg.browser.qq.com/imgUpload/qbtool.t_tool_info/b91aa2df_uKlrxP6XhFU.png'
        }, {
            title: '车牌归属地',
            shortDesc: '查询全国各地车牌号属于的省市',
            url: '/pages/carnumber/carnumber',
            icon: 'https://m4.publicimg.browser.qq.com/imgUpload/qbtool.t_tool_info/b91aa2df_YMLnLlw29K2.png'
        },]
    },
    {
        label: '分类四',
        title: '标题四',
        icon: 'ie',
        items: subCategories
    },
]