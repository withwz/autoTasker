// 启动无障碍服务
auto();

let baidu = {};

// 主程序
baidu.start = function () {
  // 打开抖音极速版
  launchApp("百度极速版");
  // 等待应用选择界面出现
  sleep(3000);

  // 点击底部中间"赚钱"tab
  click(device.width / 2, device.height * 0.93);


  // 关闭app
  sleep(2000);
};

module.exports = baidu;
