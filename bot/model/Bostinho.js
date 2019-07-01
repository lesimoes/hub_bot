const engine = require('../nlp/n-grams/ngrams');

class Bostinho {
  constructor (database) {
    this.engine = engine;
    this.setDatabse(database);
  }

  getAnswer (text) {
    let result = this.engine(text, this.database);
    if (typeof result === 'string') {
      result = [];
      result.push({ responses: ['Default'] });
    }
    return result[0].responses;
  }

  setDatabse (database) {
    this.database = database;
  }

  getDatabase () {
    return this.database;
  }
}

module.exports = Bostinho;
