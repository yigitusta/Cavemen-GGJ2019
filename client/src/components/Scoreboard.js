import meat from '../assets/images/meat.png';

const scoreBoard = document.querySelector(".online-players");

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
  li.appendChild(meatImg);
  scoreBoard.querySelector("ul").appendChild(li);
}

export function sort() {

}