// const section = document.querySelector("section");
// const API_KEY = "d5af395b4be1c79f620c2434de653f06";
// const URL = "https://api.themoviedb.org/3";

// const urls = {
//     popular: URL + "/movie/popular?api_key=" + API_KEY + "&language=en-US&page=1",
//     upcoming: URL + "/movie/upcoming?api_key=" + API_KEY + "&language=en-US&page=1",
//     originals: URL + "/discover/tv?api_key=" + API_KEY + "&with_networks=213",
//     trending: URL + "/trending/movie/day?language=en-US&api_key=" + API_KEY,
//     topRated: URL + "/movie/top_rated?language=en-US&page=1&api_key=" + API_KEY,
//     actionMovies: URL + "/discover/movie?language=en-US&sort_by=popularity.desc&with_genres=28&api_key=" + API_KEY,
//     comedyMovies: URL + "/discover/movie?api_key=" + API_KEY + "&with_genres=35",
//     horrorMovies: URL + "/discover/movie?api_key=" + API_KEY + "&with_genres=27",
//     romanticMovies: URL + "/discover/movie?api_key=" + API_KEY + "&with_genres=10749",
//     documentaries: URL + "/discover/movie?api_key=" + API_KEY + "&with_genres=99"
// };

// loadMovie=[];

// function setRandomBanner(movies) {
//     const banner = document.getElementById("banner");

//     if (!movies || movies.length === 0) return;

//     const randomMovie = movies[Math.floor(Math.random() * movies.length)];

//     banner.style.backgroundImage = "url(https://image.tmdb.org/t/p/original"+randomMovie.backdrop_path;

//     const mid=document.createElement("div");
//     mid.classList.add("mid")
//     const title=document.createElement("h1");
//     const overview=document.createElement("p");

    
//     overview.textContent=randomMovie.overview;
//     title.textContent=randomMovie.title ;
//     mid.append(title,overview)

//     console.log(title);
//     banner.append (mid) ;
// }

// async function fetchAllCategories() {
//     try {
//         const responses = await Promise.all(Object.values(urls).map(url => fetch(url)));
//         const data = await Promise.all(responses.map(res => res.json()));

//         const categories = Object.keys(urls);

//         categories.forEach((category, index) => {
//             console.log(category);
            
//             const results = data[index].results;
//             console.log(results);
            
//             if (category === "popular") {
//                 setRandomBanner(results);
//             }
//             showData(results, category);
//         });

//     } catch (error) {
//         console.error("Error fetching movie categories:", error);
//     }
// }

// function showData(movies, category) {
//     const heading = document.createElement("h1");
//     heading.textContent = category.toUpperCase();
//     section.appendChild(heading);

//     const container = document.createElement("div");
//     container.classList.add("category");

//     movies.forEach((movie) => {
//         const parent = document.createElement("div");
//         parent.classList.add("movies");

//         const anchor = document.createElement("a");
//         anchor.href = "single.html?id=" + (movie.id || "");

//         const img = document.createElement("img");
//         img.src = "https://image.tmdb.org/t/p/w500" + movie.poster_path;

//         const title = document.createElement("h2");
//         title.textContent = movie.title;

//         const language = document.createElement("p");
//         language.textContent = "Language: " + movie.original_language;

//         anchor.append(img);
//         parent.append(anchor, title, language);
//         container.append(parent);
//     });

//     section.append(container);
// }



// function handleFilters() {
//   const name = search.value.toLowerCase().trim();

//   section.innerHTML = "";

//   const filtered = loadMovie.filter(function (Movies) {
//     const matchName = name === "" || Movies.title.includes(name);
    

//   if (filtered.length === 0) {
//     section.innerHTML = "<h2>No movie match your search.</h2>";
//   } else {
//     filtered.forEach(fetchAllCategories);
//   }
// })
// }






const section = document.querySelector("section");
const search = document.getElementById("search");

const API_KEY = "d5af395b4be1c79f620c2434de653f06";
const BASE_URL = "https://api.themoviedb.org/3";

const urls = {
    popular: BASE_URL + "/movie/popular?api_key=" + API_KEY + "&language=en-US&page=1",
    upcoming: BASE_URL + "/movie/upcoming?api_key=" + API_KEY + "&language=en-US&page=1",
    originals: BASE_URL + "/discover/tv?api_key=" + API_KEY + "&with_networks=213",
    trending: BASE_URL + "/trending/movie/day?language=en-US&api_key=" + API_KEY,
    topRated: BASE_URL + "/movie/top_rated?language=en-US&page=1&api_key=" + API_KEY,
    actionMovies: BASE_URL + "/discover/movie?language=en-US&sort_by=popularity.desc&with_genres=28&api_key=" + API_KEY,
    comedyMovies: BASE_URL + "/discover/movie?api_key=" + API_KEY + "&with_genres=35",
    horrorMovies: BASE_URL + "/discover/movie?api_key=" + API_KEY + "&with_genres=27",
    romanticMovies: BASE_URL + "/discover/movie?api_key=" + API_KEY + "&with_genres=10749",
    documentaries: BASE_URL + "/discover/movie?api_key=" + API_KEY + "&with_genres=99"
};

let allMovies = [];

function setRandomBanner(movies) {
    const banner = document.getElementById("banner");

    if (!movies || movies.length === 0) return;

    const validMovies = movies.filter(movie => movie.backdrop_path);
    const randomMovie = validMovies[Math.floor(Math.random() * validMovies.length)];

    banner.style.backgroundImage = "url(https://image.tmdb.org/t/p/original" + randomMovie.backdrop_path + ")";
    banner.style.backgroundSize = "cover";
    banner.style.backgroundPosition = "center";
    banner.innerHTML = "";

    const mid = document.createElement("div");
    mid.classList.add("mid");

    const title = document.createElement("h1");
    title.textContent = randomMovie.title || randomMovie.name;

    const overview = document.createElement("p");
    overview.textContent = randomMovie.overview;

    mid.append(title, overview);
    banner.append(mid);
}

async function fetchAllCategories() {
    try {
        const responses = await Promise.all(Object.values(urls).map(url => fetch(url)));
        const data = await Promise.all(responses.map(res => res.json()));

        const categories = Object.keys(urls);

        categories.forEach((category, index) => {
            const results = data[index].results;
            if (!results) return;

            allMovies = allMovies.concat(results);

            if (category === "popular") {
                setRandomBanner(results);
            }
            showData(results, category);
        });

    } catch (error) {
        console.error("Error fetching movie categories:", error);
    }
}

function showData(movies, category = "") {
    if (!movies || movies.length === 0) return;

    if (category) {
        const heading = document.createElement("h1");
        heading.textContent = category.toUpperCase();
        section.appendChild(heading);
    }

    const container = document.createElement("div");
    container.classList.add("category");

    movies.forEach((movie) => {
        if (!movie.poster_path) return;

        const parent = document.createElement("div");
        parent.classList.add("movies");

        const anchor = document.createElement("a");
        anchor.href = "single.html?id=" + movie.id;

        const img = document.createElement("img");
        img.src = "https://image.tmdb.org/t/p/w500" + movie.poster_path;

        const title = document.createElement("h2");
        title.textContent = movie.title;

        const language = document.createElement("p");
        language.textContent = "Language: " + movie.original_language;

        anchor.append(img);
        parent.append(anchor, title, language);
        container.append(parent);
    });

    section.append(container);
}

function handleFilters() {
  const searchTerm = search.value.toLowerCase().trim();

  // If search is empty, reload homepage
  if (searchTerm === "") {
    section.innerHTML = "";
    allMovies = []; // Clear previous data
    fetchAllCategories(); // Reload everything
    return;
  }

  const filtered = allMovies.filter(movie => {
    const title = movie.title?.toLowerCase() || "";
    return title.includes(searchTerm);
  });

  section.innerHTML = "";

  if (filtered.length === 0) {
    section.innerHTML = "<h2>No movies match your search.</h2>";
  } else {
    showData(filtered);
  }
}


search.addEventListener("input", handleFilters);

fetchAllCategories();
