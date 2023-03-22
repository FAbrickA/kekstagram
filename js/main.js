import { showPictures } from './showPictures.js';
import { generatePhotoPlaceholders } from './data.js';
import './photoUploadForm.js';

const photoPlaceholders = generatePhotoPlaceholders(25);
showPictures(photoPlaceholders);

