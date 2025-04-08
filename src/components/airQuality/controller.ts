import { NextFunction, Request, Response } from "express";
import AirQualityService from "./service";
import resHandler from "../../utils/apiResponse";

export default class AirQualityController {
  public airQualityService = new AirQualityService();

  public nearestCityController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.airQualityService.nearestCityLocationService(
        req.query
      );

      resHandler(res, "data are listed successfully.", data);
    } catch (e) {
      next(e);
    }
  };

  public parisAirQualityController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.airQualityService.parisAirQualityService();

      resHandler(res, "The most polluted date and time in paris zone.", data);
    } catch (e) {
      next(e);
    }
  };
}
