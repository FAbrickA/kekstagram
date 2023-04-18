const pictureTemplate = document.querySelector('#picture');
const picturesBlock = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');


export function createPicture(pictureData) {
  const picture = pictureTemplate.content.cloneNode(true);

  const img = picture.querySelector('.picture__img');
  img.setAttribute('src', pictureData.url);
  picture.querySelector('.picture__comments').textContent = pictureData.comments;
  picture.querySelector('.picture__likes').textContent = pictureData.likes;
  picture.querySelector('.picture__description').textContent = pictureData.description;

  return picture;
}

export function showPictures(picturesData) {
  const fragment = new DocumentFragment();


  picturesData.forEach((pictureData) => {
    fragment.append(createPicture(pictureData));
  });

  picturesBlock.append(fragment);
}

export function loadPictures(picturesUrl) {
  fetch(picturesUrl)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    showPictures(data);
  })
  .catch(() => {
    alert('Что то пошло не так. Попробуйте позже');
  });
}

function main() {
  picturesBlock.addEventListener('click', (evt) => {

    if (evt.target.matches('.picture__img')) {
      evt.preventDefault();
      const picture = evt.target.parentElement;
      const pictureUrl = picture.querySelector('.picture__img').getAttribute('src');
      const comments = picture.querySelector('.picture__comments').textContent;
      const likes = picture.querySelector('.picture__likes').textContent;
      const description = picture.querySelector('.picture__description').textContent;

      bigPicture.querySelector('.big-picture__img > img').setAttribute('src', pictureUrl);
      bigPicture.querySelector('.social__caption').textContent = description;
      bigPicture.querySelector('.likes-count').textContent = likes;
      bigPicture.querySelector('.comments-count').textContent = comments;

      bigPicture.classList.remove('hidden');
    }
  });

  bigPicture.querySelector('#picture-cancel').addEventListener('click', () => {
    bigPicture.classList.add('hidden');
  })
}

// main();
