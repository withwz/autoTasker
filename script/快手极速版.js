// 启动无障碍服务
auto();

let sc = require("../modules/simpleClick");
// 导入OCR模块
let ocr = require("../modules/ocr");

let kuaishou = {};

// 主程序
kuaishou.start = function () {
  // 初始化OCR
  if (!ocr.initOcr()) {
    console.error("OCR初始化失败");
    exit();
  }

  launchApp("快手极速版");
  // 等待应用选择界面出现
  sleep(3000);

  // TODO 签到

  sc.simpleClick("去赚钱");
  sleep(3000);

  sc.simpleClick("领现金");
  sleep(3000);

  sc.simpleClick("立即兑换");
  sleep(3000);

  if (id("share_close_panel").exists()) {
    id("share_close_panel").findOne().click();
    sleep(3000);
  }

  sc.simpleClick("立即提现");
  sleep(3000);
  console.log("脚本执行完毕");
};

// kuaishou.start();
module.exports = kuaishou;
