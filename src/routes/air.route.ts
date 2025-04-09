import { Router } from "express";
import AirQualityController from "../components/airQuality/controller";
import { Routes } from "../interfaces/routes.interface";
import validate from "../middlewares/validate.middleware";
import schema from "../validations/airQuality.schema";

export default class AirQualityRoute implements Routes {
  public path = "/";
  public router = Router();
  public airQualityController = new AirQualityController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @swagger
     * /nearest-city:
     *   get:
     *     summary: Get the pollution data by latitude and longitude
     *     parameters:
     *       - in: query
     *         name: lat
     *         schema:
     *           type: number
     *         required: true
     *         description: The latitude for country you need to get the pollution data
     *       - in: query
     *         name: lon
     *         schema:
     *           type: number
     *         required: true
     *         description: The longitude for country you need to get the pollution data
     *     responses:
     *       200:
     *         description: API to get “air quality “ for the given zone
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/NearestCity'
     *             example:
     *              statusCode: 200
     *              message: "data are listed successfully."
     *              data:
     *                 Result:
     *                    pollution:
     *                        ts: "2025-04-08T15:00:00.000Z"
     *                        aqius: 47
     *                        mainus: "p2"
     *                        aqicn: 28
     *                        maincn: "o3"
     *              timestamp: "2025-4-8 7:29:37"
     *       403:
     *         description: API to get “air quality “ for the given zone
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/NearestCity'
     *             example:
     *              statusCode: 403
     *              message: "⚠️ Service Error - api.airvisual.com: Forbidden"
     *              timestamp: "2025-4-8 7:29:37"
     *
     */
    this.router.get(
      `${this.path}nearest-city`,
      validate(schema.nearestCity, "query"),
      this.airQualityController.nearestCityController
    );

    /**
     * @swagger
     * /paris-most-polluted:
     *   get:
     *     summary: get datetime( date and time ) where the paris zone is the most polluted
     *     responses:
     *       200:
     *         description: get datetime( date and time ) where the paris zone is the most polluted
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ParisMostPolluted'
     *             example:
     *                statusCode: 200
     *                message: "The most polluted date and time in paris zone."
     *                data:
     *                   date: "2025-04-08"
     *                   time: "12:00:00"
     *                timestamp: "2025-4-8 7:29:37"
     *       400:
     *         description: get datetime( date and time ) where the paris zone is the most polluted
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ParisMostPolluted'
     *             example:
     *                statusCode: 400
     *                message: "No Data collected for Paris yet"
     *                timestamp: "2025-4-8 7:29:37"
     */
    this.router.get(
      `${this.path}paris-most-polluted`,
      validate(schema["paris-air-quality"], "query"),
      this.airQualityController.parisAirQualityController
    );
  }
}
