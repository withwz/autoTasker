"ui";
let common = require("./modules/common");
let douyin = require("./script/抖音极速版");
let douyin2 = require("./script/抖音极速版2");
let kuaishou = require("./script/快手极速版");
let ucBrowser = require("./script/UC浏览器");
// 参考 https://github.com/ChancenJ/Autojs_Sign-in/blob/mulappdev/AutoSign/main.js

let consoleon = false; //标记console是否强制打开
let running = null;
let lock = threads.lock();

function dy() {
  lock.lock();
  while (running != null) {}
  running = threads.start(douyin.start);
  lock.unlock();
  running.join();
  running = null;
}

function dy2() {
  lock.lock();
  while (running != null) {}
  running = threads.start(douyin2.start);
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

function uc() {
  lock.lock();
  while (running != null) {}
  running = threads.start(ucBrowser.start);
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
    <checkbox id="douyin" text="抖音极速版" checked="true" />
    <checkbox id="douyin2" text="抖音极速版2" checked="true" />
    <checkbox id="kuaishou" text="快手极速版" checked="true" />
    <checkbox id="ucBrowser" text="UC浏览器" checked="true" />
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
    if (ui.douyin.isChecked()) {
      threads.start(dy);
    }
    if (ui.douyin2.isChecked()) {
      threads.start(dy2);
    }
    if (ui.kuaishou.isChecked()) {
      threads.start(ks);
    }
    if (ui.ucBrowser.isChecked()) {
      threads.start(uc);
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
