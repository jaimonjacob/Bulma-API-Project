const artContainer = document.querySelector('.cardsContainer');
const buttonRefreshData = document.querySelector(`.refreshButton`);

const url =
  'https://openaccess-api.clevelandart.org/api/artworks?opened_after=2021&limit=50&has_image=1';
const params = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
};

async function getData() {
  const response = await fetch(url, params);
  const jsonData = await response.json();

  jsonData.data.forEach(function (entry) {
    const artTitle = entry.title;
    const artDescription = entry.wall_description.slice(0, 100) + `...`;
    const artImageUrl = entry.images.web.url;
    const artUrl = entry.url;
    const html = `<div class="column is-one-quarter">
          <a href=${artUrl} title=${artTitle} target="_blank">
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img src=${artImageUrl}
                 alt="Placeholder image">
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                
                <div class="media-content">
                  <p class="title is-4">${artTitle}</p>
                </div>
              </div>

              <div class="content">
                ${artDescription}
              </div>
            </div>
          </div>
          </a>
        </div>`;
    artContainer.insertAdjacentHTML('afterbegin', html);
  });
}

buttonRefreshData.addEventListener('click', getData);