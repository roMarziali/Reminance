const CronJob = require('cron').CronJob;

const backup = require('../models/backup').backup;

new CronJob('0 3 1 * *', backup).start();

