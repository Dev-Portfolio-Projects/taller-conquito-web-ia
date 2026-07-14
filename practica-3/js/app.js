const API_KEY = "free_user_3GTIhV4OAwFSO4EFjS0ZiNYwu2F";

async function cargarUsuarios() {
  const lista = document.getElementById("listaUsuarios");

  try {
    const response = await fetch("https://reqres.in/api/users?page=1", {
      headers: {
        "x-api-key": API_KEY,
      },
    });

    const data = await response.json();

    lista.innerHTML = "";

    data.data.forEach((usuario) => {
      lista.innerHTML += `
        <div class="usuario-card">
            <div class="usuario-info">
                <h3>
                ${usuario.first_name}
                ${usuario.last_name}
                </h3>

                <p>
                ${usuario.email}
                </p>

                <span>
                ReqRes User
                </span>
            </div>
        </div>
        `;
    });
  } catch (error) {
    lista.innerHTML = `
            <p>Error cargando usuarios</p>
        `;
  }
}

cargarUsuarios();

const ciudades = {
  guayaquil: {
    nombre: "Guayaquil",
    lat: -2.19,
    lon: -79.89,
  },

  quito: {
    nombre: "Quito",
    lat: -0.18,
    lon: -78.46,
  },

  cuenca: {
    nombre: "Cuenca",
    lat: -2.9,
    lon: -79.0,
  },

  loja: {
    nombre: "Loja",
    lat: -3.99,
    lon: -79.2,
  },

  ambato: {
    nombre: "Ambato",
    lat: -1.25,
    lon: -78.62,
  },

  manta: {
    nombre: "Manta",
    lat: -0.95,
    lon: -80.72,
  },
};

async function cargarClima(ciudad) {
  try {
    const lugar = ciudades[ciudad];

    const url = `https://api.open-meteo.com/v1/forecast?
        latitude=${lugar.lat}&longitude=${lugar.lon}
        &current=
        temperature_2m,
        apparent_temperature,
        relative_humidity_2m,
        wind_speed_10m,
        wind_direction_10m,
        surface_pressure,
        precipitation`;

    const response = await fetch(url.replace(/\s+/g, ""));

    const data = await response.json();

    const clima = data.current;

    document.getElementById("cCiudad").textContent = lugar.nombre;

    document.getElementById("cTemperatura").textContent =
      clima.temperature_2m + " °C";

    document.getElementById("cSensacion").textContent =
      clima.apparent_temperature + " °C";

    document.getElementById("cHumedad").textContent =
      clima.relative_humidity_2m + " %";

    document.getElementById("cViento").textContent =
      clima.wind_speed_10m + " km/h";

    document.getElementById("cDireccion").textContent =
      clima.wind_direction_10m + "°";

    document.getElementById("cPresion").textContent =
      clima.surface_pressure + " hPa";

    document.getElementById("cLluvia").textContent =
      clima.precipitation + " mm";
  } catch (error) {
    console.log("Error clima", error);
  }
}

document.querySelectorAll(".city").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".city")
      .forEach((b) => b.classList.remove("active"));

    btn.classList.add("active");

    cargarClima(btn.dataset.city);
  });
});

cargarClima("guayaquil");

async function cargarPokemon() {
  const lista = document.getElementById("listaPokemon");

  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=12");

    const data = await response.json();

    lista.innerHTML = "";

    for (const item of data.results) {
      const detalle = await fetch(item.url);

      const pokemon = await detalle.json();

      const tipos = pokemon.types.map((tipo) => tipo.type.name).join(" / ");

      lista.innerHTML += `
        <div class="pokemon-card">

            <img 
            src="${pokemon.sprites.other["official-artwork"].front_default}"
            alt="${pokemon.name}">

            <h3>
            ${pokemon.name}
            </h3>

            <span class="type">
            ${tipos}
            </span>

            <p>
            ID:
            ${pokemon.id}
            </p>

            <p>
            Altura:
            ${pokemon.height}
            </p>

            <p>
            Peso:
            ${pokemon.weight}
            </p>

        </div>
        `;
    }
  } catch (error) {
    lista.innerHTML = `
        <p>Error cargando Pokémon</p>
        `;
  }
}

cargarPokemon();

document.querySelectorAll(".api").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".api")
      .forEach((item) => item.classList.remove("active"));

    document
      .querySelectorAll(".panel")
      .forEach((panel) => panel.classList.remove("active"));

    btn.classList.add("active");

    document.getElementById(btn.dataset.api).classList.add("active");
  });
});
