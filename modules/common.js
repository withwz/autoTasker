//通用函数

var common = {};

common.consoleshow = function () {
  console.show();
  console.setTitle("签到", "#ffd9d2e9", 25);
  console.setCanInput(false);
  console.setBackgroud("#806741a7");
  console.setLogSize(9);
  console.setPosition(400, 20);
  sleep(10);
  console.setSize(device.width / 2.8, device.height / 8);
};

module.exports = common;
