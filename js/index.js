const answer = "APPLE";

let index = 0;
let attempts = 0;
let timer;

function appStart() {
  const displayGameOver = () => {
    const div = document.createElement("div");
    div.innerText = "GAME OVER";
    div.style =
      "display:flex; justify-content:center; align0item:center; position:absolute; top:40vh; left:45vw; background-color: white; width: 200px; height: 100px;justify-content: center;align-items: center;";
    document.body.appendChild(div);
  };
  const nextLine = () => {
    if (attempts === 6) return gameover();
    attempts += 1;
    index = 0;
  };
  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameOver();
    clearInterval(timer);
  };
  const handleEnterKey = () => {
    let score = 0;
    //정답확인코드
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const letter = block.innerText;
      const answer_letter = answer[i];
      if (letter === answer_letter) {
        score += 1;
        block.style.background = "#6AAA64";
      } else if (answer.includes(letter)) block.style.background = "#c9b458";
      else block.style.background = "#787c7e";
      block.style.color = "white";
    }
    if (score === 5) gameover();
    else nextLine();
  };
  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      thisBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };
  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );
    if (event.key === "BackSpace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
    }
    if (index === 5) return;
  };
  const startTimer = () => {
    const startTime = new Date();

    function setTime2() {
      const nowTime = new Date();
      const outTime = new Date(nowTime - startTime);
      const minute = outTime.getMinutes().toString();
      const second = outTime.getSeconds().toString();
      const time = document.querySelector(".timer");
      time.innerText = `${minute.padStart(2, "0")}:${second.padStart(2, "0")}`;
    }

    timer = setInterval(setTime2, 1000);
  };
  startTimer();
  window.addEventListener("keydown", handleKeydown);
}

appStart();
