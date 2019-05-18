const engine = require('../nlp/n-grams/ngrams');

class Bostinho {
  constructor (database) {
    this.engine = engine;
    this.setDatabse(database);
  }

  getAnswer (text) {
    const result = this.engine(text, this.database);
    return JSON.stringify(result[0].responses);
  }

  setDatabse (database) {
    this.database = database;
  }

  getDatabase () {
    return this.database;
  }
}

module.exports = Bostinho;
