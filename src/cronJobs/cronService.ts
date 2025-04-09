import AirQualityService from "../components/airQuality/service";
import DB from "../db";
import { PollutionCron } from "../interfaces/nearestCity.interface";
const airQualityService = new AirQualityService();
import redisCache from "../common/redis.cache";
export default class CronService {
  async airQualityForParis() {
    try {
      const rediKey = "paris";
      const foundOnRedis = await redisCache.getToRedis(rediKey);

      if (!foundOnRedis) {
        const location = { lat: 48.856613, lon: 2.352222 };

        const {
          Result: { pollution },
        }: PollutionCron = await airQualityService.nearestCityLocationService(
          location
        );
        await DB.ParisAirQuality.create({
          ...pollution,
        });

        await redisCache.setToRedis(rediKey, pollution);
      }
    } catch (error) {
      console.log(`CronJob Error: ${error}`);
    }
  }
}
