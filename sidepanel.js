document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOMContentLoaded");

  // 监听 storage 变化，实时更新侧边栏内容
  chrome.storage.onChanged.addListener((changes, namespace) => {
    const { newValue: items } = changes.items;
    console.log(777, changes);

    if (items.length > 0) {
      const content = document.getElementById("imageList");
      //   json.innerText = JSON.stringify(data.items);
      content.innerHTML = "";

      for (let i = 0; i < items.length; i++) {
        const li = document.createElement("li");
        const img = document.createElement("img");
        const link = document.createElement("a");
        const title = document.createElement("h1");
        const item = items[i];

        img.src = item.image;
        img.width = 240;
        img.classList.add("rounded-md");
        title.innerText = item.title;
        link.target = "__blank";
        link.href = item.image;
        link.appendChild(img);
        link.appendChild(title);
        li.appendChild(link);
        content.appendChild(li);
      }
    }
  });

  async function getCurrentTab() {
    const queryOptions = { active: true, currentWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }

  const injectFunction = document.getElementById("inject-function");
  injectFunction.addEventListener("click", async () => {
    const tab = await getCurrentTab();

    if (tab.url != null && tab.url.startsWith("https")) {
      // window.postMessage(
      //   { type: "FROM_PAGE", text: "Hello from the webpage!" },
      //   "*"
      // );
      // chrome.scripting
      //   .executeScript({
      //     target: { tabId: tab.id },
      //     files: ["xhs.js"],
      //   })
      //   .catch((error) => console.error("unexpected error ", error));
    }
  });
});
