import { getRandomInt } from './utils.js';

function generatePhotoPlaceholders(number) {
  if (number < 0) {
    throw RangeError('Number must be zero or positive');
  }

  const result = Array(number);
  for (let i = 0; i < number; ++i) {
    result[i] = {
      id: i + 1,
      url: `photos/${i + 1}.jpg`,
      description: `Photo description ${i + 1}`,
      likes: getRandomInt(15, 201),
      comments: getRandomInt(0, 201),
    };
  }

  return result;
}

export { generatePhotoPlaceholders };
