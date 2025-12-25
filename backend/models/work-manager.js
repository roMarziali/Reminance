const fs = require('fs');
const path = require('path');

const WORKS_FILE_PATH = path.join(__dirname, '../data/works.json');

module.exports = class WorkManager {

  static async getWorks() {
    try {
      const data = fs.readFileSync(WORKS_FILE_PATH, 'utf8');
      const json = JSON.parse(data);
      // Générer date de dernière session et trier à partir d'elle.
      return json;
    } catch (err) {
      return [];
    }
  }
};

function getNextIdForElement(parent) {
  //Find the next available id for an element
  let id = parent.length + 1;
  for (const element of parent) {
    if (element.id >= id) {
      id = element.id + 1;
    }
  }
  return id;
}

