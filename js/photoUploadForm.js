const photoUploadForm = document.querySelector('#upload-select-image');

const imageUploadModal = photoUploadForm.querySelector('.img-upload__overlay');

const imageInput = photoUploadForm.querySelector('#upload-file');
const modalCloseButton = photoUploadForm.querySelector('#upload-cancel');

function closeImageUploadModal() {
  imageUploadModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  photoUploadForm.reset();
}

// show modal (when image uploaded)
imageInput.addEventListener('change', () => {
  imageUploadModal.classList.toggle('hidden');
  document.body.classList.toggle('modal-open');
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

photoUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  photoUploadForm.submit();
  closeImageUploadModal();
});
