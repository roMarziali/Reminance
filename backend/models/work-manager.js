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

  static async addWork(work) {
    const data = fs.readFileSync(WORKS_FILE_PATH, 'utf8');
    const works = JSON.parse(data);
    const maxId = works.reduce((max, item) => Math.max(max, item.id), 0);
    work.id = maxId + 1;
    work.sessions = [];
    works.push(work);
    fs.writeFileSync(WORKS_FILE_PATH, JSON.stringify(works, null, 2), 'utf-8');
  }

  static async deleteWork(workId) {
    const data = fs.readFileSync(WORKS_FILE_PATH, 'utf8');
    const works = JSON.parse(data);
    const newWorks = works.filter(work => work.id !== Number(workId));
    fs.writeFileSync(WORKS_FILE_PATH, JSON.stringify(newWorks, null, 2), 'utf-8');
  }

  static async editWork(workId, updatedWork) {
    const data = fs.readFileSync(WORKS_FILE_PATH, 'utf8');
    const works = JSON.parse(data);
    const index = works.findIndex(work => work.id === Number(workId));

    if (index === -1) throw new Error(`Aucun work trouvé avec l'id ${workId}`);

    works[index] = {
      ...works[index],
      ...updatedWork,
      id: works[index].id,          // sécurité : on ne touche pas à l'id
      sessions: works[index].sessions // sécurité : on ne touche pas aux sessions
    };

    fs.writeFileSync(WORKS_FILE_PATH, JSON.stringify(works, null, 2), 'utf-8');

    return works[index];
  }

  static async addSession(workId, session) {
    const data = fs.readFileSync(WORKS_FILE_PATH, 'utf8');
    const works = JSON.parse(data);

    const work = works.find(w => w.id === Number(workId));
    if (!work) throw new Error(`Aucun work trouvé avec l'id ${workId}`);

    if (!Array.isArray(work.sessions)) work.sessions = [];

    const maxId = work.sessions.reduce(
      (max, s) => Math.max(max, s.id || 0),
      0
    );

    session.id = maxId + 1;
    work.sessions.push(session);

    fs.writeFileSync(WORKS_FILE_PATH, JSON.stringify(works, null, 2), 'utf-8');
    return session;
  }

  static async editSession(workId, sessionId, updatedSession) {
    const data = fs.readFileSync(WORKS_FILE_PATH, 'utf8');
    const works = JSON.parse(data);

    const work = works.find(w => w.id === Number(workId));
    if (!work) throw new Error(`Aucun work trouvé avec l'id ${workId}`);

    const index = work.sessions.findIndex(s => s.id === Number(sessionId));

    if (index === -1) throw new Error(`Aucune session trouvée avec l'id ${sessionId}`);

    work.sessions[index] = {
      ...work.sessions[index],
      ...updatedSession,
      id: work.sessions[index].id // sécurité : on ne touche pas à l'id
    };

    fs.writeFileSync(WORKS_FILE_PATH, JSON.stringify(works, null, 2), 'utf-8');

    return work.sessions[index];
  }

  static async deleteSession(workId, sessionId) {
    const data = fs.readFileSync(WORKS_FILE_PATH, 'utf8');
    const works = JSON.parse(data);

    const work = works.find(w => w.id === Number(workId));
    if (!work) throw new Error(`Aucun work trouvé avec l'id ${workId}`);

    const initialLength = work.sessions.length;

    work.sessions = work.sessions.filter(s => s.id !== Number(sessionId));

    if (work.sessions.length === initialLength) throw new Error(`Aucune session trouvée avec l'id ${sessionId}`);

    fs.writeFileSync(WORKS_FILE_PATH, JSON.stringify(works, null, 2), 'utf-8');
  }
};
