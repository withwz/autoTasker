// 启动无障碍服务
auto();

let sc = require("../modules/simpleClick");
let kuaishou = {};

// 主程序
kuaishou.start = function () {
  launchApp("快手极速版");
  // 等待应用选择界面出现
  sleep(3000);

  sc.simpleClick("去赚钱");
  sleep(3000);

  sc.simpleClick("立即签到");
  sleep(3000);

  home();
  console.log("脚本执行完毕");
};

// kuaishou.start();
module.exports = kuaishou;
