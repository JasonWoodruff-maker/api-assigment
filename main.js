const monsterInput = document.getElementById("monsterInput");
const searchButton = document.getElementById("searchButton");
const monsterResult = document.getElementById("monsterResult");

searchButton.addEventListener("click", () => {
  const monsterName = monsterInput.value.toLowerCase();
  if (monsterName) {
    searchMonster(monsterName);
  } else {
    monsterResult.innerHTML = "Please enter a monster name.";
  }
});

function searchMonster(monsterName) {
  monsterResult.innerHTML = "Searching...";

  axios
    .get(`https://www.dnd5eapi.co/api/monsters`)
    .then((response) => {
      const monsters = response.data.results;
      const matchedMonster = monsters.find(
        (monster) => monster.name.toLowerCase() === monsterName
      );

      if (matchedMonster) {
        console.log(matchedMonster)
        axios
          .get(`https://www.dnd5eapi.co${matchedMonster.url}`)
          .then((monsterResponse) => {
            const monsterData = monsterResponse.data;
            console.log(monsterData)
            monsterResult.innerHTML = `
              <h2>${monsterData.name}</h2>
              <p>Alignment: ${monsterData.alignment}</p>
              <p>Challenge rateing: ${monsterData.challenge_rating}</p>
              <p>Armor Class: ${monsterData.armor_class[0].value}</p>
              <p>Strength: ${monsterData.strength}</p>
              <p>Constitution: ${monsterData.constitution}</p>
              <p>Dexterity: ${monsterData.dexterity}</p>
              <p>Intelligence: ${monsterData.intelligence}</p>
              <p>Wisdom: ${monsterData.wisdom}</p>
              <p>Charisma: ${monsterData.charisma}</p>
              <p>Speed: ${monsterData.speed.walk}</p>
              <p>Average Hitpoints: ${monsterData.hit_points}</p>
              <p>Hitpoint dice: ${monsterData.hit_points_roll}</p>
              <p>1st Action: ${monsterData.actions[0].name} Desc: ${monsterData.actions[0].desc}</p>
              
            `;
          })
          .catch((error) => {
            monsterResult.innerHTML = "Error fetching monster details.";
          });
      } else {
        monsterResult.innerHTML = "Monster not found.";
      }
    })
    .catch((error) => {
      monsterResult.innerHTML = "Error fetching monsters.";
    });
}