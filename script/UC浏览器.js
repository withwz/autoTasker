// 启动无障碍服务
auto();

let ucBrowser = {};

// 主程序
ucBrowser.start = function () {
  launchApp("UC浏览器极速版");
  // 等待应用选择界面出现
  sleep(3000);

  if (id("id_welfare_box_toolbar").exists()) {
    id("id_welfare_box_toolbar").findOne().parent().click();
  } else {
    console.log("未找到元素");
  }
  sleep(3000);

  home();
  console.log("脚本执行完毕");
};

// ucBrowser.start();
module.exports = ucBrowser;
