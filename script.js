let API_KEY = "";
let SEARCH_TERM = "";

const searchButtonElement = document.getElementById("search");

searchButtonElement.addEventListener("click", () => {
  let apikeyValue = document.getElementById("api-key").value;
  let searchValue = document.getElementById("search-box").value;
  console.log(apikeyValue);
  if (apikeyValue !== "") {
    API_KEY = apikeyValue;
  } else {
    alert("Please enter valid API");
  }
  if (searchValue.length < 3) {
    document.querySelector(".warning").innerHTML = "";
    const warning = document.querySelector(".warning");
    warning.innerText = "Search term should be at least of 3 characters";
  } else {
    SEARCH_TERM = searchValue;
  }
  if (apikeyValue !== "" && searchValue.length >= 3) {
    document.querySelector(".warning").innerText = "";
    fetchData();
  }
});

async function fetchData() {
  document.querySelector(".cards-container").innerHTML = "";
  let number = 0;
  const endPoint = `https://www.omdbapi.com/?s=${SEARCH_TERM}&apikey=${API_KEY}`;
  document.querySelector(".cards-container").style.display = "none";
  try {
    document.querySelector(".spinner-container").style.display = "flex";
    const response = await fetch(endPoint);
    const result = await response.json();
    try {
      console.log(result.Error);
      if (result.Error === "Invalid API key!") {
        const warningContainer = document.createElement("p");
        warningContainer.className = "api-failed";
        warningContainer.innerText =
          "You have entered incorrect API \uD83D\uDE13";
        document.querySelector(".cards-container").style.display = "flex";
        document.querySelector(".spinner-container").style.display = "none";
        document
          .querySelector(".cards-container")
          .appendChild(warningContainer);
        console.log("executed!");
        return;
      } else if (result.Error === "Movie not found!") {
        const warningContainer = document.createElement("p");
        warningContainer.className = "api-failed";
        warningContainer.innerText = "Movie Not Found \uD83D\uDE13";
        document.querySelector(".cards-container").style.display = "flex";
        document.querySelector(".spinner-container").style.display = "none";
        document
          .querySelector(".cards-container")
          .appendChild(warningContainer);
        console.log("executed!");
      }
    } catch (error) {
      console.log(error);
    }
    console.log(result);
    console.log(result.Search);
    result.Search.forEach((element) => {
      const card = document.createElement("div");

      const imdbId = `https://www.imdb.com/title/${element.imdbID}`;
      card.className = "card";
      if (element.Poster === "N/A") {
        card.innerHTML = `<img src="https://amir0707k.github.io/Accio_FE3_CE1/poster-holder.jpg" id="image-title" alt=""> 
            <div class="details">
                <p id="number">${(number = number + 1)}</p>
                <p id="movie-name">
                    ${element.Title}, ${element.Year}
                </p>
            </div>
            <div><p><a href="${imdbId}">More Details</a></p></div>
                `;
      } else {
        card.innerHTML = `<img src="${element.Poster}" id="image-title" alt=""> 
            <div class="details">
                <p id="number">${(number = number + 1)}</p>
                <p id="movie-name">
                    ${element.Title}, ${element.Year}
                </p>
            </div>
           <a class="more-details" href="${imdbId}" target="_blank">More Details</a>
                `;
      }

      document.querySelector(".cards-container").appendChild(card);
    });
    document.querySelector(".spinner-container").style.display = "none";
    document.querySelector(".cards-container").style.display = "flex";
  } catch (error) {
    console.log(error);
  }
}
