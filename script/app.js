// getting dom reffarence

const userContainer = document.getElementById(`userContainer`);
const button = document.getElementById(`reandomButton`);
const card = document.getElementById(`card`);
const names = document.getElementById(`name`);
const startTime = document.getElementById(`startTime`);
const coundown = document.getElementById(`coundown`);
const hide = document.getElementById(`hide`);
const tooltip = document.getElementById(`tooltip`);

// rendering all the user;
userContainer.innerHTML = `${users
  .map((user) => {
    return `
    <div class="userCard">
    <div class="userImage">
        <img src="${user.userImage}" alt="" />
    </div>
    <div class="name">
        <h3 id="userName">${user.userFname}</h3>
        <div class="iconBox">
            <a href="${user.github}"><i class="fab fa-github-square"></i></a>

            <a href="${user.linkedin}"><i class="fab fa-linkedin"></i></a>
              <a href="${user.facebook}">
                <i class="fab fa-facebook-square"></i>
            </a>
        </div>
    </div>
</div>
    
    `;
  })
  .join("")}`;

// disable button

let nameForCount;

function disableButton(btn) {
  btn.style.pointerEvents = `none`;

  btn.style.opacity = `.3`;
}

function enableButton(btn) {
  btn.style.pointerEvents = ``;
  btn.style.opacity = `1`;
}
let tracker = 1;

function clickEvent() {
  // if (tracker > 1) {
  //   shoewTooltip(`Please Finised The Previous Tasks`);
  //   disableButton(button, true);
  // }

  const allElement = document.getElementsByClassName(`userCard`);
  const arr = [...allElement];
  let random = Math.floor(Math.random() * arr.length);
  arr[random].classList.add(`hide`);
  let imgElement = arr[random].querySelector(".userCard img");
  let imgSRC = imgElement.getAttribute(`src`);
  let textElement = arr[random].querySelector(".userCard #userName").innerHTML;

  card.innerHTML = `
    <div class="userCard green">
    <div class="userImage">
        <img src="${imgSRC}" alt="" />
    </div>
    <div class="uerName">
        <h3 id="userName">${textElement}</h3>
    </div>
    </div>`;

  names.innerHTML = `${textElement} `;
  hide.classList.add(`show`);

  disableButton(button);

  enableButton(coundown);

  nameForCount = textElement;
}

// create a coundown timer

function timeKeeper() {
  let timer = 120; //we are using 2min of time, thats why it's start from 120 and reduce by one after every second
  const timeintv = setInterval(() => {
    timer--;

    // dooing raff
    let min = Math.floor(timer / 60);
    let sec = timer - min * 60;
    if (min < 10) {
      min = `0${min}`;
    }
    if (sec < 10) {
      sec = `0${sec}`;
    }

    startTime.innerHTML = `<h4 class="countSentence">${nameForCount} you have <span class="time"> ${min}:${sec} </span> remaining </h4>`;
    if (timer < 1) {
      clearInterval(timeintv);
      hide.classList.remove(`show`);
      enableButton(button);
      button.innerHTML = `Choose SomeOne Else`;
      startTime.textContent = ``;
    } else {
      disableButton(coundown);
    }
  }, 1000);

  console.log(tracker);
}

// ========I will work on tooltip on next weakend
// for tooltip
// function shoewTooltip(message) {
//   tooltip.classList.add(`notificationVisible`);
//   tooltip.innerHTML = message;
// }

button.addEventListener(`click`, clickEvent);
coundown.addEventListener(`click`, timeKeeper);