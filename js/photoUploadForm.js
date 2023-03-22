const photoUploadForm = document.querySelector('#upload-select-image');

const imageUploadModal = photoUploadForm.querySelector('.img-upload__overlay');

const imageInput = photoUploadForm.querySelector('#upload-file');
const modalCloseButton = photoUploadForm.querySelector('#upload-cancel');


imageInput.addEventListener('change', function(evt) {
  imageUploadModal.classList.toggle('hidden');
});

modalCloseButton.addEventListener('click', closeImageUploadModal);
// imageUploadModal.addEventListener()

// function clearInput(input) {
//   try {
//     input.value = null;
//   } catch(ex) {
//     console.log('Old browser detected!');
//     input.parentNode.replaceChild(input.cloneNode(true), input);
//   }

// }

function closeImageUploadModal() {
  imageUploadModal.classList.add('hidden');
  photoUploadForm.reset();
}
