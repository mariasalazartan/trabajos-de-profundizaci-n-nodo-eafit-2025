document.addEventListener("DOMContentLoaded", () => {
    const cardContainer = document.getElementById("card-container");
    const likeButton = document.getElementById("like");
    const dislikeButton = document.getElementById("dislike");
    const fightButton = document.getElementById("fight");
    const likedList = document.getElementById("liked-list");
    let characters = [];
    let currentIndex = 0;
    let likedCharacters = [];

    // Agregar fuente personalizada
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    document.body.style.backgroundImage = "url('https://th.bing.com/th/id/R.cb4523b2ed29fcfa6118c9ce5d249127?rik=P8rrjJlQ9xZfOg&pid=ImgRaw&r=0')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.fontFamily = "'Press Start 2P', cursive";

    fetch("https://rickandmortyapi.com/api/character")
      .then((response) => response.json())
      .then((data) => {
        characters = data.results;
        displayCharacter();
      });

    function displayCharacter() {
      if (currentIndex >= characters.length) {
        cardContainer.innerHTML = "<p class='text-xl text-green-400 font-bold'>No more characters!</p>";
        return;
      }

      const character = characters[currentIndex];
      cardContainer.innerHTML = `
      <div class="swipe-animation absolute inset-0 bg-[#1C1C1C] rounded-2xl shadow-lg p-4 text-center border-4 border-green-400 font-press-start">
        <img src="${character.image}" alt="${character.name}" class="w-full h-3/4 object-cover rounded-t-2xl border-4 border-green-400 shadow-md">
        <div class="p-4">
          <h2 class="text-2xl font-bold text-green-400">${character.name}</h2>
          <p class="text-gray-300">${character.species}</p>
          <p class="text-gray-300">${character.status}</p>
        </div>
      </div>
    `;
    }

    function swipe(direction) {
      const card = cardContainer.firstElementChild;
      card.classList.add(direction === "like" ? "swipe-like" : "swipe-dislike");

      setTimeout(() => {
        if (direction === "like") {
          likedCharacters.push(characters[currentIndex]);
          updateLikedList();
        }
        currentIndex++;
        displayCharacter();
      }, 500);
    }

    function updateLikedList() {
      likedList.innerHTML = likedCharacters.map((c) => `
        <div class='flex items-center bg-[#1C1C1C] rounded-lg shadow-md p-2 border-2 border-green-400 mb-2'>
          <img src='${c.image}' alt='${c.name}' class='w-12 h-12 rounded-full border-2 border-green-400'>
          <p class='ml-3 text-green-400 font-semibold font-press-start'>${c.name}</p>
        </div>
      `).join("");
    }

    function battle() {
      if (likedCharacters.length < 2) {
        alert("Add at least two characters to start a battle!");
        return;
      }
      let fighter1 = likedCharacters[Math.floor(Math.random() * likedCharacters.length)];
      let fighter2 = likedCharacters[Math.floor(Math.random() * likedCharacters.length)];
      while (fighter1 === fighter2) {
        fighter2 = likedCharacters[Math.floor(Math.random() * likedCharacters.length)];
      }
      cardContainer.innerHTML = `
      <div class="battle-animation h-full flex items-center justify-center bg-[#1C1C1C] rounded-2xl shadow-lg p-6 border-4 border-green-400 font-press-start">
        <div class="fighter text-center">
          <img src="${fighter1.image}" alt="${fighter1.name}" class="rounded-full w-32 h-32 border-4 border-green-400 shadow-md">
          <p class="text-green-400 text-lg font-bold">${fighter1.name}</p>
        </div>
        <p class="text-4xl text-yellow-400 animate-pulse">⚔️</p>
        <div class="fighter text-center">
          <img src="${fighter2.image}" alt="${fighter2.name}" class="rounded-full w-32 h-32 border-4 border-green-400 shadow-md">
          <p class="text-green-400 text-lg font-bold">${fighter2.name}</p>
        </div>
      </div>
    `;
      setTimeout(() => {
        document.querySelectorAll(".fighter")[Math.random() > 0.5 ? 0 : 1].classList.add("attack");
        setTimeout(() => {
          alert(`${Math.random() > 0.5 ? fighter1.name : fighter2.name} wins!`);
          displayCharacter();
        }, 500);
      }, 1000);
    }

    function styleButton(button, text, bgColor, borderColor) {
      button.innerHTML = text;
      button.style.backgroundColor = bgColor;
      button.style.color = "black";
      button.style.border = `2px solid ${borderColor}`;
      button.style.fontFamily = "'Press Start 2P', cursive";
      button.style.padding = "10px 20px";
      button.style.margin = "5px";
      button.style.cursor = "pointer";
      button.style.transition = "transform 0.2s ease-in-out";
      button.onmouseover = () => button.style.transform = "scale(1.1)";
      button.onmouseout = () => button.style.transform = "scale(1)";
    }

    styleButton(likeButton, "👍 Like", "#00ff00", "#00cc00");
    styleButton(dislikeButton, "👎 Dislike", "#ff0000", "#cc0000");
    styleButton(fightButton, "⚡ Battle", "#ffcc00", "#cc9900");

    likeButton.addEventListener("click", () => swipe("like"));
    dislikeButton.addEventListener("click", () => swipe("dislike"));
    fightButton.addEventListener("click", battle);
});
