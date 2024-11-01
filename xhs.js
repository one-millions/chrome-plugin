function initialize() {
  const sections = document.querySelectorAll("section");
  const store = new Map();

  console.log(sections);

  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];

    const image = section.querySelector("img");
    const span = section.querySelector(
      "span[data-v-0cdd7be0][data-v-69111fe1]"
    );

    // 过滤视频类型的帖子
    if (image != null) {
      const { src } = image;
      const title = span != null ? span.innerHTML : "";
      store.set(src, {
        title, // 过滤没标题的帖子
        image: src,
      });
    }
  }

  // 更新存储
  chrome.storage.local.set({ items: [...store.values()] }, () => {
    console.log("Image URLs updated11:", store.size);
  });
}

function initializexxxxxxxxx() {
  let items = [];
}

document.addEventListener("DOMContentLoaded", () => {
  // const mutationObserver = new MutationObserver(initialize);
  // const intersectionObserver = new IntersectionObserver(
  //   (entries) => {
  //     console.log("entries", entries);
  //     // entries.forEach((entry) => {
  //     //   if (entry.isIntersecting && !items.includes(entry.target.src)) {
  //     //     items.push(entry.target.src);
  //     //     // 更新存储
  //     //     chrome.storage.local.set({ items }, () => {
  //     //       console.log("Image URL added on intersection:", entry.target.src);
  //     //     });
  //     //   }
  //     // });
  //   },
  //   { root: null, rootMargin: "0px", threshold: 0.1 }
  // );
  // 观察整个文档，监听 DOM 子节点和属性的变化
  // mutationObserver.observe(document.body, {
  //   childList: true,
  //   subtree: true,
  // });
  // intersectionObserver.observe(document.body, {
  //   childList: true,
  //   subtree: true,
  // });
});

initialize();

window.addEventListener(
  "message",
  (event) => {
    if (event.data.type && event.data.type === "FROM_PAGE")
      console.log("message", event);
  },
  false
);
