function getRandomInt(from, to) {
  // Random Int in range [from, to)
  if (to < from) {
    [from, to] = [to, from];
  }
  return Math.floor(from + Math.random() * (to - from));
}

function isLengthCorrect(string, maxLength) {
  return string.length <= maxLength;
}

function edgeNumber(number, minValue, maxValue) {
  if (maxValue < minValue) {
    [minValue, maxValue] = [maxValue, minValue];
  }
  return Math.min(Math.max(number, minValue), maxValue)
}

export {
  getRandomInt,
  isLengthCorrect,
  edgeNumber,
};

