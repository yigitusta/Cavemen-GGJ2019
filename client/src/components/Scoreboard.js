import meat from '../assets/images/meat.png';

const scoreBoard = document.querySelector(".online-players");

const list = scoreBoard.querySelector("ul");

export function close() {
  scoreBoard.classList.add("hidden");
}

export function open() {
  scoreBoard.classList.remove("hidden");
}

export function addPlayers(players) {
  players.forEach(player => addPlayer(player));
}

export function updatePlayer({id, food}) {
  document.getElementById(id).querySelector(".score-meat").innerText = food;
}

export function removePlayer({id}) {
  document.getElementById(id).remove();
}

export function addPlayer({id, food, username}) {
  const li = document.createElement("li");
  li.setAttribute("id", id);
  const name = document.createElement("span");
  name.setAttribute("class", "score-name");
  name.innerText = username;
  li.appendChild(name);
  const score = document.createElement("span");
  score.setAttribute("class", "score-meat");
  score.innerText = food;
  li.appendChild(score);
  const meatImg = document.createElement("img");
  meatImg.setAttribute("src", meat);
  meatImg.setAttribute("class", "score-meat-img");
  li.appendChild(meatImg);
  list.appendChild(li);
}

export function startSorting() {
  setInterval(() => {
    const els = Array.from(list.children);

    els.sort((a, b) => {
      const scoreA = parseInt(a.querySelector(".score-meat").innerText);
      const scoreB = parseInt(b.querySelector(".score-meat").innerText);
      if (scoreA === scoreB) return 0;
      else if (scoreA > scoreB) return -1;
      else return 1;
    });

    els.forEach(el => list.appendChild(el));
  }, 2000)
}