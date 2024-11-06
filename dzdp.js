const searchList = document.querySelector("#shop-all-list");
const notFound = document.querySelector(".not-found");
const page = document.querySelector(".page .cur");

if (searchList != null && notFound == null) {
  const sections = searchList.querySelectorAll("li");
  const store = new Map();

  if (sections.length > 0) {
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const image = section.querySelector("img");
      const tag = section.querySelectorAll(".tag");
      const title = section.querySelector("h4");
      const link = section.querySelector("a");
      const key = link.getAttribute("data-shopid");
      const url = link.getAttribute("href");

      store.set(key, {
        title: title.innerText,
        tag: tag[0].innerText,
        image: image.src,
        url,
      });
    }

    chrome.runtime.sendMessage({
      type: "updateSidebar",
      data: [...store.values()],
    });
  }
}

// 详情页
const basicInfo = document.querySelector("#basic-info");

if (basicInfo != null) {
  const addressNode = basicInfo.querySelector(".map_address");
  const phoneNode = basicInfo.querySelector(".tel");
  const other = basicInfo.querySelector(".other");
  const businessTimeNode = other.querySelector(".item");
  const comment = document.querySelector("#reviewlist-wrapper");
  const keywords = ["毛孩子", "宠物友好", "狗", "可带宠物"];

  const data = {
    address: "",
    phone: "",
    businessTime: "",
    comment: [],
  };

  data.address = addressNode.innerText;
  data.businessTime = businessTimeNode.innerText;
  data.phone = phoneNode.textContent.replace("电话：", "").trim();

  const mutationObserver = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        const nodes = mutation.target.querySelectorAll(".comment-item");
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          const descNode = node.querySelector(".desc");
          const photoNode = node.querySelector(".photos");
          const description = keywords.find(
            (item) => descNode.innerText.indexOf(item) > -1
          );
          let urls = [];

          if (photoNode != null) {
            const photos = photoNode.querySelectorAll("img");
            if (photos != null) {
              urls = Array.from(photos).map((item) => item.src);
            }
          }

          if (description != null) {
            data.comment.push({
              description: descNode.innerText,
              photos: urls,
            });
          }
        }
      }

      console.log("[res]", data);
    }
  });

  mutationObserver.observe(comment, {
    childList: true, // 观察目标子节点的变化，是否有添加或者删除
  });
}
