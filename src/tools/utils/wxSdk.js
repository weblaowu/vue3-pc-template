import wx from "weixin-js-sdk";

// 初始化设置
export default function initWxConf(conf = {}) {
  console.log("conf: ", conf);
  return new Promise((resolve) => {
    wx.config({
      debug: false,
      appId: conf.appId,
      timestamp: conf.timestamp,
      nonceStr: conf.nonceStr,
      signature: conf.signature,
      jsApiList: [""],
      // 小程序跳转
      openTagList: ["wx-open-launch-weapp"],
    });
    wx.ready(() => {
      console.log("ready:~~~~~~");
      resolve(true);
    });
  });
}
