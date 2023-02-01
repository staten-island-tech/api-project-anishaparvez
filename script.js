const apiKey = "";
const apiHost =
  "https://www.grammy.com/news/2022-grammys-complete-winners-nominees-nominations-list";

const searchButton = document.getElementById("searchButton");
const clearButton = document.getElementById("clearButton");
const artistRankInput = document.getElementById("artistRank");
const artistContainer = document.getElementById("artistContainer");

searchButton.addEventListener("click", function () {
  const artistRank = artistRankInput.value;
  fetch(
    `https://www.grammy.com/news/2022-grammys-complete-winners-nominees-nominations-list/?rank=${artistRank}`,
    {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": apiHost,
      },
    }
  )
    .then((response) => response.json())
    .then((artist) => {
      const artist = artist.find(
        (artist) => artist.rank === parseInt(artistRank)
      );
      if (!artist) {
        artistContainer.innerHTML = "<p>artist not found</p>";
        return;
      }
      const artistCard = `
                <div class="artist-card">
                    <h2>${artist.title}</h2>
          <p>Rank: ${artist.rank}</p>
          <p>Year Released: ${artist.year}</p>
                    <img src="${artist.image}" alt="${artist.title} poster">
          <br>
          <h3>artist Description: ${artist.description}</h3>
                </div>
            `;
      artistContainer.innerHTML = artistCard;
    })
    .catch((error) => console.error(error));
});

clearButton.addEventListener("click", function () {
  artistContainer.innerHTML = "";
});
