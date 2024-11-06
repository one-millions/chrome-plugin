// // import "./sw-omnibox.js";
// // import "./sw-tips.js";

// 设置全局右侧侧边栏
chrome.runtime.onInstalled.addListener(() => {
  console.log("Image Collector extension installed.");

  chrome.scripting
    .registerContentScripts([
      {
        id: "dzdp-script",
        js: ["dzdp.js"],
        matches: ["*://dianping.com/*"],
      },
      {
        id: "xhs-script",
        js: ["xhs.js"],
        matches: ["*://xiaohongshu.com/*"],
      },
    ])
    .then(() => console.log("xhs-script && dzdp-script registration complete"))
    .catch((err) => console.warn("unexpected error", err));

  // chrome.sidePanel
  //   .setPanelBehavior({ openPanelOnActionClick: true })
  //   .catch((error) => console.log(error));
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url != null) {
    const regexp = new RegExp("^(http|https)://.*.dianping.com/?.*$");
    const isDzdpSearch = regexp.test(tab.url);

    if (isDzdpSearch) {
      chrome.scripting
        .executeScript({
          target: { tabId: tabId },
          files: ["dzdp.js"],
        })
        .then(() => console.log("dzdp-script execute complete"))
        .catch((err) => console.warn("unexpected error", err));
    }
  }
});
