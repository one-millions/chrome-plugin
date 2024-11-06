document.addEventListener("DOMContentLoaded", async () => {
  // console.log("DOMContentLoaded");

  // 监听 storage 变化，实时更新侧边栏内容
  // chrome.storage.onChanged.addListener((changes, namespace) => {
  //   console.log(777, changes, namespace);
  //   const { newValue } = changes.items;

  //   if (newValue != null && newValue.length > 0) {
  //     const content = document.getElementById("imageList");
  //     //   json.innerText = JSON.stringify(data.newValue);
  //     content.innerHTML = "";

  //     for (let i = 0; i < newValue.length; i++) {
  //       const li = document.createElement("li");
  //       const img = document.createElement("img");
  //       const link = document.createElement("a");
  //       const title = document.createElement("h1");
  //       const item = newValue[i];

  //       img.src = item.image;
  //       img.width = 240;
  //       img.classList.add("rounded-md");
  //       title.innerText = item.title;
  //       link.target = "__blank";
  //       link.href = item.image;
  //       link.appendChild(img);
  //       link.appendChild(title);
  //       li.appendChild(link);
  //       content.appendChild(li);

  //       // window.open(item.url);
  //     }
  //   }
  // });

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

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  const content = document.getElementById("imageList");
  const { data } = message;

  // fetch("https://dog.ceo/api/breeds/image/random");
  content.innerHTML = "";

  if (data.length > 0) {
    for (let i = 0; i < data.length; i++) {
      const li = document.createElement("li");
      const img = document.createElement("img");
      const link = document.createElement("a");
      const title = document.createElement("h1");
      const item = data[i];

      img.src = item.image;
      img.width = 240;
      img.classList.add("rounded-md");
      title.innerText = `${item.title} / ${item.tag}`;
      link.target = "__blank";
      link.href = item.image;
      link.appendChild(img);
      link.appendChild(title);
      li.appendChild(link);
      content.appendChild(li);
    }
  }
});
