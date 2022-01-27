let color = "#3aa757";
let toggle = true;

let board_category = ["자유게시판", "내가 싼 똥"];

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  chrome.storage.sync.set({ toggle });
  chrome.storage.sync.set({ board_category });

  console.log("Default background color set to %cgreen", `color: ${color}`);
  console.log(toggle, board_category);
});

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content-script.js"],
  });
});
