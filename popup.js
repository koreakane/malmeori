chrome.storage.sync.get("toggle", ({ toggle }) => {
  console.log("first toggle is : ", toggle);

  document.getElementById("toggle").checked = !toggle;
});

chrome.storage.sync.get("board_category", ({ board_category }) => {
  console.log(board_category);

  const data = board_category.join("/");

  console.log(data);

  document.getElementById("selection_id").value = data;
});

window.onload = function () {
  document.getElementById("button").addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.storage.sync.get("toggle", ({ toggle }) => {
      console.log("currentToggle : ", toggle);

      if (toggle) {
        chrome.storage.sync.set({ toggle: false });
        document.getElementById("toggle").checked = true;
        console.log("now toggle go false");
      } else {
        chrome.storage.sync.set({ toggle: true });
        document.getElementById("toggle").checked = false;
        console.log("now toggle go true");
      }
    });

    // chrome.scripting.executeScript({
    //   target: { tabId: tab.id },
    //   function: toggleExtension,
    // });
  });

  let select = document.getElementById("selection_id");

  select.addEventListener("change", function () {
    console.log(select.value);

    const selected = select.value;

    const splitData = selected.split("/");

    chrome.storage.sync.set({ board_category: splitData });

    // just for test
  });
};

// function toggleExtension() {
//   chrome.storage.sync.get("toggle", ({ toggle }) => {
//     console.log(toggle);

//     if (toggle) {
//       chrome.storage.sync.set({ toggle: false });
//       document.getElementById("toggle").checked = true;
//     } else {
//       chrome.storage.sync.set({ toggle: true });
//       document.getElementById("toggle").checked = false;
//     }
//   });
// }
