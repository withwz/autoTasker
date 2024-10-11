let handlePermissionDialog = require("./handlePermissionDialog");

// 导入百度 Paddle OCR 预测器
const Predictor = com.baidu.paddle.lite.ocr.Predictor;

// OCR 预测器实例
let predictor = null;
// OCR 初始化状态标志
let initialized = false;

/**
 * 初始化 OCR 引擎
 * @param {boolean} [useSlim=true] - 是否使用轻量级模型
 * @returns {boolean} 初始化是否成功
 */
function initOcr(useSlim) {
  useSlim = useSlim === undefined ? true : useSlim;
  if (initialized) return true;

  predictor = new Predictor();

  const loading = threads.disposable();
  threads.start(function () {
    loading.setAndNotify(predictor.init(context, useSlim));
  });

  const loadSuccess = loading.blockedGet();
  if (!loadSuccess) {
    console.error("初始化OCR失败");
    return false;
  }

  initialized = true;
  return true;
}

/**
 * 截图并进行 OCR 识别
 * @returns {Array|null} OCR 识别结果，失败时返回 null
 */
function captureAndOcr() {
  if (!initialized) {
    console.error("OCR未初始化，请先调用initOcr()");
    return null;
  }

  // 在截图之前处理权限弹窗
  handlePermissionDialog();

  let img;
  try {
    img = captureScreen();
    if (!img) {
      console.error("截图失败");
      return null;
    }

    const result = predictor.runOcr(img.getBitmap());
    return result;
  } catch (error) {
    console.error("OCR 过程中发生错误:", error);
    return null;
  } finally {
    if (img) {
      img.recycle();
    }
  }
}

/**
 * 根据文本查找页面元素
 * @param {string} text - 要查找的文本
 * @param {number} [threshold=0.7] - 相似度阈值
 * @returns {Object|null} 找到的元素信息，包含文本和位置，未找到时返回 null
 */
function findElementByText(text, threshold) {
  threshold = threshold || 0.7; // 默认相似度阈值
  const ocrResult = captureAndOcr();
  if (!ocrResult) {
    console.log("OCR 识别失败，返回 null");
    return null;
  }
  console.log("OCR 识别结果数量:", ocrResult.length);

  for (let i = 0; i < ocrResult.length; i++) {
    console.log(
      `识别结果 ${i + 1}:`,
      JSON.stringify({
        label: ocrResult[i].label,
        confidence: ocrResult[i].confidence,
        bounds: ocrResult[i].bounds,
      })
    );

    if (
      ocrResult[i].label.indexOf(text) !== -1 ||
      similarity(ocrResult[i].label, text) >= threshold
    ) {
      console.log("找到匹配文本:", ocrResult[i].label);
      return {
        text: ocrResult[i].label,
        bounds: ocrResult[i].bounds,
        center: {
          x: (ocrResult[i].bounds.left + ocrResult[i].bounds.right) / 2,
          y: (ocrResult[i].bounds.top + ocrResult[i].bounds.bottom) / 2,
        },
      };
    }
  }
  console.log("未找到匹配文本");
  return null;
}

/**
 * 计算两个字符串的相似度
 * @param {string} str1 - 第一个字符串
 * @param {string} str2 - 第二个字符串
 * @returns {number} 相似度，范围 0-1
 */
function similarity(str1, str2) {
  const len1 = str1.length;
  const len2 = str2.length;
  const maxLen = Math.max(len1, len2);
  const distance = levenshteinDistance(str1, str2);
  return (maxLen - distance) / maxLen;
}

/**
 * 计算两个字符串的莱文斯坦距离
 * @param {string} str1 - 第一个字符串
 * @param {string} str2 - 第二个字符串
 * @returns {number} 莱文斯坦距离
 */
function levenshteinDistance(str1, str2) {
  const m = str1.length;
  const n = str2.length;
  const dp = [];
  for (let i = 0; i <= m; i++) {
    dp[i] = [i];
  }
  for (let j = 1; j <= n; j++) {
    dp[0][j] = j;
  }
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i][j - 1], dp[i - 1][j]) + 1;
      }
    }
  }
  return dp[m][n];
}

// 导出模块函数
module.exports = {
  initOcr: initOcr,
  captureAndOcr: captureAndOcr,
  findElementByText: findElementByText,
};
