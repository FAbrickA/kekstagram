const pictureTemplate = document.querySelector('#picture');


export function createPicture(pictureData) {
  const picture = pictureTemplate.content.cloneNode(true);

  const img = picture.querySelector('.picture__img');
  img.setAttribute('src', pictureData.url);
  img.setAttribute('alt', pictureData.description);
  picture.querySelector('.picture__comments').textContent = pictureData.comments;
  picture.querySelector('.picture__likes').textContent = pictureData.likes;

  return picture;
}

export function showPictures(picturesData) {
  const fragment = new DocumentFragment();


  picturesData.forEach((pictureData) => {
    fragment.append(createPicture(pictureData));
  });

  document.querySelector('.pictures').append(fragment);
}
