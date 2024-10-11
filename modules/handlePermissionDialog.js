function handlePermissionDialog() {
  console.log("检查权限弹窗...");
  let button = text("立即开始").findOne(3000);
  if (button) {
    console.log("发现权限弹窗，点击'立即开始'");
    button.click();
    sleep(1000); // 等待弹窗消失
    return true;
  }
  console.log("未发现权限弹窗");
  return false;
}

module.exports = handlePermissionDialog;
