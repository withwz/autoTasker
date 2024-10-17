// 启动无障碍服务
auto();

let sc = require("../modules/simpleClick");
let douyin = {};

// 主程序
douyin.start = function () {
  // 打开抖音极速版
  launchApp("抖音极速版");
  // 等待应用选择界面出现
  sleep(3000);

  // 点击第二个应用选项
  click(device.width * 0.3, device.height * 0.93);
  // 等待应用启动
  sleep(3000);

  // 点击底部中间"赚钱"tab
  click(device.width / 2, device.height * 0.93);

  sc.simpleClick("立即签到");
  sc.simpleClick("去签到");
  sleep(3000);

  home();
  console.log("脚本执行完毕");
};

// douyin.start()
module.exports = douyin;
