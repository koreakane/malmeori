function boardClick(board_input = "자유게시판") {
  let result = document.getElementsByClassName("option_list");

  // console.log(result);

  const boards = result[0].childNodes;

  // console.log(boards);

  let boardData = [];

  boards.forEach((val) => {
    let text = val.firstChild.innerText.trim();
    text = text.replace(/\n/g, "");
    boardData.push(text);
  });

  // console.log(boardData);

  // let board_input = "자유게시판"; //선택 가능한 게시판 변수

  let selectedIndex = 0;

  boardData.forEach((val, index) => {
    if (val.includes(board_input)) {
      selectedIndex = index;
    }
  });

  // let selectedIndex = boardData.indexOf(board_input);

  // console.log(board_input);
  // console.log(selectedIndex);

  boards[selectedIndex].firstElementChild.click();

  // console.log("----------------------");
}

function categoryClick(category_input = "내가 싼 똥") {
  let count = 0;

  let interval = setInterval(function () {
    findCategory();
    count++;
    if (count >= 20) {
      console.log("stop");
      clearInterval(interval);
    }
  }, 200);

  const findCategory = () => {
    let optionList = document.getElementsByClassName("option_list");

    console.log(optionList);

    const categories = optionList[1].childNodes;

    console.log(categories.length);

    if (categories.length > 0) {
      let categoryData = [];

      categories.forEach((val) => {
        let text = val.firstChild.innerText.trim();
        text = text.replace(/\n/g, "");
        categoryData.push(text);
      });

      console.log(categoryData);

      // let category_input = "내가 싼 똥"; //선택 가능한 게시판 변수

      let categoryIndex = -1;

      categoryData.forEach((val, index) => {
        console.log(val, category_input, index);
        if (val.includes(category_input)) {
          categoryIndex = index;
        }
      });

      if (categoryIndex !== -1) {
        console.log(categoryData, category_input, categoryIndex);

        // let categoryIndex = categoryData.indexOf(category_input);

        categories[categoryIndex].firstElementChild.click();
        clearInterval(interval);
      }
    }
  };
}

window.onload = function () {
  chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (var key in changes) {
      var storageChange = changes[key];
      console.log(
        `Storage key "${key}" in namespace "${namespace}" changed. 
          Old value was "${storageChange.oldValue}", new value is "${storageChange.newValue}".`
      );

      if (key === "board_category") {
        const board_input = storageChange.newValue[0];
        const category_input = storageChange.newValue[1];

        window.setTimeout(() => boardClick(board_input), 100);
        window.setTimeout(() => categoryClick(category_input), 101);
      }
    }
  });

  chrome.storage.sync.get(["toggle", "board_category"], function (data) {
    console.log(data);

    const { toggle, board_category } = data;

    const board_input = board_category[0];
    const category_input = board_category[1];

    if (toggle) {
      window.setTimeout(() => boardClick(board_input), 1000);
      window.setTimeout(() => categoryClick(category_input), 1001);
    } else console.log("not toggled");
  });
};
