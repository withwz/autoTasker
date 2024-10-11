"ui";
let common = require("./modules/common");
let douyin = require("./script/抖音极速版");
let kuaishou = require("./script/快手极速版");
// 参考 https://github.com/ChancenJ/Autojs_Sign-in/blob/mulappdev/AutoSign/main.js

let running = null;
let lock = threads.lock();
let consoleon = false; //标记console是否强制打开

function dy() {
  lock.lock();
  while (running != null) {}
  running = threads.start(douyin.start);
  lock.unlock();
  running.join();
  running = null;
}

function ks() {
  lock.lock();
  while (running != null) {}
  running = threads.start(kuaishou.start);
  lock.unlock();
  running.join();
  running = null;
}

ui.layout(
  <vertical padding="16">
    <Switch
      id="autoService"
      text="无障碍服务"
      checked="{{auto.service != null}}"
      margin="5 10"
      textSize="16sp"
    />
    <checkbox id="r1" text="抖音极速版" checked="true" />
    <checkbox id="r2" text="快手极速版" checked="true" />
    <button id="start" text="开始运行" />
    <button id="con" text="打开console" />
  </vertical>
);

ui.start.on("click", () => {
  if (auto.service == null) {
    toast("请开启无障碍服务！");
  }

  if (ui.start.getText() == "开始运行") {
    ui.start.setText("停止运行");
    if (ui.r1.isChecked()) {
      threads.start(dy);
    }
    if (ui.r2.isChecked()) {
      threads.start(ks);
    }
  } else {
    ui.start.setText("开始运行");
  }
});

ui.con.on("click", () => {
  if (ui.con.getText() == "打开console") {
    ui.con.setText("关闭console");
    threads.start(function () {
      common.consoleshow();
      consoleon = true;
    });
  } else {
    ui.con.setText("打开console");
    console.hide();
    consoleon = false;
  }
});
