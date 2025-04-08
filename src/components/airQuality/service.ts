// import DB from '../../databases';
import makeRequest from "../../utils/makeRequest";
import { NearestCityWithLocation } from "../../interfaces/nearestCity.interface";
import config from "../../config";
import DB from "../../db";
import { IParisAirQualityAttributes } from "../../models/ParisAirQuality";
import { literal } from "sequelize";
import { APIError } from "../../common/apiError";
import { badRequest } from "../../common/apiError";

export default class AirQualityService {
  async nearestCityLocationService(args: NearestCityWithLocation) {
    const { lat, lon } = args;
    const { apiKey: key, airVisual } = config;
    const data = await makeRequest({
      method: "get",
      path: airVisual,
      params: { key, lat, lon },
    });

    const {
      data: {
        current: { pollution },
      },
    } = data;

    return { Result: { pollution } };
  }

  async parisAirQualityService() {
    const maxValue: number = await DB.ParisAirQuality.max("aqius");
    const result: IParisAirQualityAttributes | null =
      await DB.ParisAirQuality.findOne({
        attributes: [
          [literal('DATE("ts")'), "date"],
          [literal(`TO_CHAR("ts", 'HH24:MI:SS')`), "time"],
        ],
        where: { aqius: maxValue },
        order: [["ts", "ASC"]],
        raw: true,
      });

      if(result)
        throw badRequest("No Data collected for Paris yet");

    return result;
  }
}
