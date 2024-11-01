function initialize() {
  const content = document.querySelector("#shop-all-list");
  if (content != null) {
    const sections = content.querySelectorAll("li");
    const store = new Map();

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];

      const image = section.querySelector("img");
      const title = section.querySelector("h4");
      const location = section.querySelectorAll(".tag");

      store.set(image.src, {
        title: `${title.innerText}(${location[1].innerText})`,
        image: image.src,
      });
    }

    // 更新存储
    chrome.storage.local.set({ items: [...store.values()] }, () => {
      console.log("Image URLs updated11:", store.size);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const mutationObserver = new MutationObserver(initialize);
  console.log(4444, "xxxxstore");
  //   const intersectionObserver = new IntersectionObserver(
  //     (entries) => {
  //       console.log("entries", entries);
  //       // entries.forEach((entry) => {
  //       //   if (entry.isIntersecting && !items.includes(entry.target.src)) {
  //       //     items.push(entry.target.src);

  //       //     // 更新存储
  //       //     chrome.storage.local.set({ items }, () => {
  //       //       console.log("Image URL added on intersection:", entry.target.src);
  //       //     });
  //       //   }
  //       // });
  //     },
  //     { root: null, rootMargin: "0px", threshold: 0.1 }
  //   );

  // 观察整个文档，监听 DOM 子节点和属性的变化
  mutationObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });

  //   intersectionObserver.observe(document.body, {
  //     childList: true,
  //     subtree: true,
  //   });
});

console.log(5);

const mutationObserver = new MutationObserver(initialize);

mutationObserver.observe(document.body, {
  childList: true,
  subtree: true,
});
