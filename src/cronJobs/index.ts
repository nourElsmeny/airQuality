import * as cron from 'node-cron';
import CronService from './cronService';

const cronService = new CronService();
// second - minute - hour - day of month - month - day of week

cron.schedule('*/1 * * * *', () => {
    cronService.airQualityForParis();
});
