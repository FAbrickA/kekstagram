import { edgeNumber } from './utils.js';

const DEFAULT_SCALE_VALUE = 100;
const DEFAULT_EFFECT = 'none';

const photoUploadForm = document.querySelector('#upload-select-image');

const imagePreview = photoUploadForm.querySelector('.img-upload__preview');

let scaleValue = DEFAULT_SCALE_VALUE;
let currentEffect = DEFAULT_EFFECT;


// handle modal -----
const imageUploadModal = photoUploadForm.querySelector('.img-upload__overlay');
const imageInput = photoUploadForm.querySelector('#upload-file');
const modalCloseButton = photoUploadForm.querySelector('#upload-cancel');

function closeImageUploadModal() {
  imageUploadModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  photoUploadForm.reset();
}

function openImageUploadModal() {
  // openModal
  imageUploadModal.classList.toggle('hidden');
  document.body.classList.toggle('modal-open');

  // on openImageUploadModal
  setNewScale(DEFAULT_SCALE_VALUE);
  setNewEffect(DEFAULT_EFFECT);
}

// show modal (when image uploaded)
imageInput.addEventListener('change', () => {
  openImageUploadModal();
});

// close modal
modalCloseButton.addEventListener('click', () => {
  closeImageUploadModal();
});
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    if (document.body.classList.contains('modal-open')) {
      closeImageUploadModal();
    }
  }
});
// -----

// submit form -----
const submitButton = document.querySelector('#upload-submit');

photoUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  submitButton.setAttribute('disabled', '');
  fetch('https://27.javascript.pages.academy/kekstagram-simple', {
    method: 'POST',
    body: new FormData(photoUploadForm),
  })
    .then((response) => {
      submitButton.removeAttribute('disabled');
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    })
    .then((data) => {
      closeImageUploadModal();
      formUploadSuccess();
      console.log(data);
    })
    .catch((err) => {
      console.error(err);
      formUploadError();
    });

});

const successMessageTemplate = document.querySelector('#success');
const errorMessageTemplate = document.querySelector('#error');

function handleMessageModal(template, className) {
  document.body.append(template.content.cloneNode(true));

  const messageModal = document.querySelector(`.${className}`);
  const submitModalButton = messageModal.querySelector(`.${className}__button`);

  const closeModal = () => {
    messageModal.remove();
    document.removeEventListener('keydown', handleKeyDownEvent)
  }
  const handleKeyDownEvent = (evt) => {
    if (evt.key === 'Escape') {
      closeModal();
    }
  }

  submitModalButton.addEventListener('click', () => {
    closeModal();
  });
  messageModal.addEventListener('click', (evt) => {
    if (evt.target.matches(`.${className}`)) {
      closeModal();
    }
  });
  document.addEventListener('keydown', handleKeyDownEvent);
}

function formUploadSuccess() {
  handleMessageModal(successMessageTemplate, 'success');
}

function formUploadError() {
  handleMessageModal(errorMessageTemplate, 'error');
}
// -----


// change scale -----
const decreaseScaleButton = photoUploadForm.querySelector('.scale__control--smaller');
const increaseScaleButton = photoUploadForm.querySelector('.scale__control--bigger');
const inputScale = photoUploadForm.querySelector('.scale__control--value');
const scaleStep = 25;
const scaleMinValue = 25;
const scaleMaxValue = 100;

function setNewScale(value) {
  scaleValue = edgeNumber(value, scaleMinValue, scaleMaxValue);
  inputScale.value = `${scaleValue}%`;
  imagePreview.style.transform = `scale(${scaleValue}%)`;
}

decreaseScaleButton.addEventListener('click', () => {
  setNewScale(scaleValue - scaleStep);
});
increaseScaleButton.addEventListener('click', () => {
  setNewScale(scaleValue + scaleStep);
});
// -----


// change effect -----
const effectsBlock = photoUploadForm.querySelector('.effects');

function setNewEffect(effectName) {
  const img = imagePreview.querySelector('img');
  img.classList.remove(`effects__preview--${currentEffect}`);
  currentEffect = effectName;
  img.classList.add(`effects__preview--${currentEffect}`);
}

effectsBlock.addEventListener('change', (evt) => {
  if (evt.target.matches('input[name=\'effect\']')) {
    const newEffect = evt.target.value;
    setNewEffect(newEffect);
  }
});
// -----
