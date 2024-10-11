// 启动无障碍服务
auto();

// 导入OCR模块
let ocr = require("../modules/ocr");

let douyin = {};

// 主程序
douyin.start = function () {
  // 初始化OCR
  if (!ocr.initOcr()) {
    console.error("OCR初始化失败");
    exit();
  }

  // 打开抖音极速版
  launchApp("抖音极速版");
  // 等待应用选择界面出现
  sleep(3000);

  // 点击第一个应用选项
  click(device.width * 0.1, device.height * 0.93);
  // 等待应用启动
  sleep(3000);

  // 点击底部中间"赚钱"tab
  click(device.width / 2, device.height * 0.93);

  console.log("开始 OCR 识别");

  const target = ocr.findElementByText("去签到");
  console.log("OCR 识别结果:", target);
  if (target) {
    click(target.center.x, target.center.y);
  } else {
    console.log("未找到 '去签到' 按钮，无法点击");
  }

  // 关闭app
  sleep(2000);
};

module.exports = douyin;
