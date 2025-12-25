let input = document.getElementById("ville");
let bouton = document.getElementById("chercher");
let resultat = document.getElementById("resultat");
let main = document.querySelector("main");

bouton.addEventListener("click", () => {

  let ville = input.value.trim();
  input.value = "";
  if (!ville) return alert("Veuillez entrer une ville !");

  resultat.style .display = 'block';
  resultat.innerHTML = `<p>Chargement en cours...</p>`;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=cba765bb7b83e524c283714e35c3791e&units=metric&lang=fr`)
    .then(res => {
      if (!res.ok) throw new Error("Ville introuvable");
      return res.json();
    })
    .then(data => {
      let iconCode = data.weather[0].icon;
      let iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

      resultat.innerHTML = `
        <div class="city-name">
          <h2>${data.name}, ${data.sys.country} , <br> <span> ${data.weather[0].description}</span></h2>

          <div class="temp">
            <img src="${iconUrl}" alt="${data.weather[0].main}" class="weather-icon">
            <p class ="temp-C">${Math.round(data.main.temp)} °C</p>
            
            </div>
        </div>
        <div class="info">
          <p><strong>Humidité :</strong> ${data.main.humidity}%</p>
          <p><strong>Vent :</strong> ${data.wind.speed} m/s</p>
          <p><strong>Vent :</strong> ${data.main.pressure} m/s</p>

        </div>
      `;
    })
    .catch(err => {
      resultat.innerHTML = `<p style="color:#e74c3c;">Erreur : ${err.message}</p>`;
    });
});

input.addEventListener("keypress", e => e.key === "Enter" && bouton.click());
