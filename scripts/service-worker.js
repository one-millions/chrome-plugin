// // import "./sw-omnibox.js";
// // import "./sw-tips.js";

// const GOOGLE_ORIGIN = "https://www.google.com";

// chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
//   if (!tab.url) return;
//   const url = new URL(tab.url);
//   console.log(url);
//   // Enables the side panel on google.com
//   if (url.origin === GOOGLE_ORIGIN) {
//     await chrome.sidePanel.setOptions({
//       tabId,
//       path: "sidepanel.html",
//       enabled: true,
//     });
//   } else {
//     // Disables the side panel on all other sites
//     await chrome.sidePanel.setOptions({
//       tabId,
//       enabled: false,
//     });
//   }
// });

// const tldLocales = {
//   "com.au": "Australia",
//   "com.br": "Brazil",
// };

// chrome.runtime.onInstalled.addListener(async () => {
//   for (let [tld, locale] of Object.entries(tldLocales)) {
//     chrome.contextMenus.create({
//       id: tld,
//       title: locale,
//       type: "normal",
//       contexts: ["selection"],
//     });
//   }
// });

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

  //   chrome.sidePanel
  //     .setPanelBehavior({ openPanelOnActionClick: true })
  //     .catch((error) => console.log(error));
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url != null) {
    const isDzdpSearch =
      /^https:\/\/www\.dianping\.com\/search\/keyword\/\d+\/\d+_[\w%]+$/.test(
        tab.url
      );

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
