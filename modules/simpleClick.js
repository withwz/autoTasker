// 简化的通用点击函数
function simpleClick(targetText) {
  let element = text(targetText).findOne(6000);
  if (!element) {
    console.log("未找到目标元素：" + targetText);
    return false;
  }

  let bounds = element.bounds();
  let centerX = (bounds.left + bounds.right) / 2;
  let centerY = (bounds.top + bounds.bottom) / 2;

  console.log("点击位置：(" + centerX + ", " + centerY + ")");
  return click(centerX, centerY);
}

module.exports = {
  simpleClick: simpleClick,
};
