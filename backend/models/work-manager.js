const fs = require('fs');
const path = require('path');

const WORKS_FILE_PATH = path.join(__dirname, '../data/works.json');

module.exports = class WorkManager {

  static async getWorks() {
    try {
      const data = fs.readFileSync(WORKS_FILE_PATH, 'utf8');
      const works = JSON.parse(data);

      return works.map(work => {
        const moods = [
          ...new Set(
            work.sessions.flatMap(session => session.moods ?? [])
          )
        ];

        const lastSessionDate = work.sessions.reduce((latestDate, session) => {
          if (!latestDate) return session.date;

          return new Date(session.date) > new Date(latestDate)
            ? session.date
            : latestDate;
        }, null);

        return {
          ...work,
          moods,
          lastSessionDate
        };
      });
    } catch (err) {
      return [];
    }
  }
};
