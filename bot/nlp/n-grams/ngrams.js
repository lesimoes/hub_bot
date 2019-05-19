const _filter = 0.5;

const generateGrams = text => text.toLowerCase().match(/[\s\S]{1,3}/g) || [];

const precision = (grams, text) => {
  let cont = 0;
  for (const i in text) {
    for (const x in grams) {
      if (text[i] == grams[x]) { cont++; }
    }
  }
  return cont / text.length;
};

const maxValue = (max, cur) => Math.max(max, cur);

const compareSimilarity = (a, b) => {
  if (a.similarity < b.similarity) return 1;
  if (a.similarity > b.similarity) return -1;
  return 0;
};

const compareGrams = (grams, base) => {
  base.forEach((value) => {
    value.similarity = value.grams
      .map(intent => precision(intent, grams))
      .reduce(maxValue, -Infinity);
  });
  base.sort(compareSimilarity);
};

let execGrams = (text, base) => {
  const grams = generateGrams(text);
  base.forEach((value) => {
    value.grams = [];
    for (const key in value.sentences) {
      value.grams[key] = generateGrams(value.sentences[key]);
    }
  });
  compareGrams(grams, base);
};

const init = (text, base) => {
  const answer = 'DEFAULT';

  execGrams(text, base);
  const response = base.filter((value) => {
    if (value.similarity >= _filter) { return value; }
  });
  if (response.length !== 0) { return response; }
  return answer;
};

module.exports = init;
