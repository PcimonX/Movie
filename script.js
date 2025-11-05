const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=2e116847370d5afdb6bf4d4f9451c2a0&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=2e116847370d5afdb6bf4d4f9451c2a0&query=";

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

returnMovies(APILINK)
function returnMovies(url){
  fetch(url).then(res => res.json())
  .then(function(data){
    console.log(data.results);
    
    main.innerHTML = ''; // Clear old content
    
    data.results.forEach(element => {
      
      if (!element.poster_path || !element.title) {
  return;
}
      
      const div_card = document.createElement('div');
      div_card.setAttribute('class', 'card');
      
      const div_row = document.createElement('div');
      div_row.setAttribute('class', 'row');
      
      const div_column = document.createElement('div');
      div_column.setAttribute('class', 'column');
      
      const image = document.createElement('img');
      image.setAttribute('class', 'thumbnail');
      image.setAttribute('id', 'image');
      image.src = IMG_PATH + element.poster_path;
      image.alt = element.title;
      
      const title = document.createElement('h3');
      title.setAttribute('id', 'title');
      title.innerHTML = element.title;
      
      const center = document.createElement('center');
      
      title.innerHTML = `${element.title}`;
      image.src = IMG_PATH + element.poster_path;
      
      center.appendChild(image);
      div_card.appendChild(center);
      div_card.appendChild(title);
      div_column.appendChild(div_card);
      div_row.appendChild(div_column);
     
      main.appendChild(div_row);
      
      div_card.addEventListener('click', () => openModal(element));
    }); 
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  main.innerHTML = '';
  
  const searchItem = search.value;
  
  if (searchItem){
    returnMovies(SEARCHAPI + searchItem);
    search.value = "";
  }
});

// ===== MODAL LOGIC =====
const modal = document.getElementById('movieModal');
const closeModal = document.getElementById('closeModal');
const modalTitle = document.getElementById('modalTitle');
const modalImage = document.getElementById('modalImage');
const modalRating = document.getElementById('modalRating');
const modalOverview = document.getElementById('modalOverview');

// Function to open modal
function openModal(movie) {
  modal.style.display = 'block';
  modalTitle.innerText = movie.title;
  modalImage.src = IMG_PATH + movie.poster_path;
  modalRating.innerText = `⭐ Rating: ${movie.vote_average}`;
  modalOverview.innerText = movie.overview ? movie.overview : "No description available.";
}

// Close modal on click
closeModal.onclick = () => { modal.style.display = 'none'; };
window.onclick = (event) => { if (event.target == modal) modal.style.display = 'none'; };