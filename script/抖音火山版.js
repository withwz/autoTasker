// 启动无障碍服务
auto();

let sc = require("../modules/simpleClick");
let dyHuoshan = {};

// 主程序
dyHuoshan.start = function () {
  // 打开抖音极速版
  launchApp("抖音火山版");
  // 等待应用选择界面出现
  sleep(1000);

  // 点击第一个应用选项
  click(device.width * 0.1, device.height * 0.93);
  // 等待应用启动
  sleep(3000);

  // 点击红包
  if (id("x8d").exists()) {
    let element = id("x8d").findOne(); // 获取元素
    let bounds = element.bounds();
    let centerX = (bounds.left + bounds.right) / 2;
    let centerY = (bounds.top + bounds.bottom) / 2;
    click(centerX, centerY);
  } else {
    console.log("c28未发现 ");
  }
  sleep(3000);

  console.log("向下滑动屏幕找到元素");
  // 向下滑动屏幕
  swipe(
    device.width / 2,
    device.height * 0.5,
    device.width / 2,
    device.height * 0.8,
    1000
  );

  sc.simpleClick("拍作品");
  sleep(3000);

  home();
  console.log("脚本执行完毕");
};

dyHuoshan.start();
// module.exports = dyHuoshan;
