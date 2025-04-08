import AirQualityService from "../src/components/airQuality/service";
import makeRequest from "../src/utils/makeRequest";
import DB from "../src/db";
import { NearestCityWithLocation } from "../src/interfaces/nearestCity.interface";
import dotenv from "dotenv";
import { literal } from "sequelize";
dotenv.config();
// Mock the external modules
jest.mock("../src/utils/makeRequest");
jest.mock("../src/db");

describe("AirQualityService", () => {
  let airQualityService: AirQualityService;

  beforeEach(() => {
    airQualityService = new AirQualityService();
  });

  describe("nearestCityLocationService", () => {
    it("should return pollution data for nearest city location", async () => {
      const args: NearestCityWithLocation = { lat: 48.8566, lon: 2.3522 }; // Example coordinates for Paris

      // Mock the API response from makeRequest
      (makeRequest as jest.Mock).mockResolvedValueOnce({
        data: {
          current: {
            pollution: { aqius: 42, main: "pm25" },
          },
        },
      });

      const result = await airQualityService.nearestCityLocationService(args);

      // Assertions
      expect(makeRequest).toHaveBeenCalledWith({
        method: "get",
        path: process.env.AIRVISUAL,
        params: { key: process.env.API_KEY, lat: 48.8566, lon: 2.3522 },
      });
      expect(result).toEqual({
        Result: { pollution: { aqius: 42, main: "pm25" } },
      });
    });

    it("should throw error if API request fails", async () => {
      const args: NearestCityWithLocation = { lat: 48.8566, lon: 2.3522 };

      // Mock the API request to throw an error
      (makeRequest as jest.Mock).mockRejectedValueOnce(new Error("API error"));

      // Assertions: we expect an error to be thrown
      await expect(
        airQualityService.nearestCityLocationService(args)
      ).rejects.toThrow("API error");
    });
  });

  describe("parisAirQualityService", () => {
    it("should return the Paris air quality data with max AQI", async () => {
      // Mock DB query responses
      (DB.ParisAirQuality.max as jest.Mock).mockResolvedValueOnce(150); // mock max AQI value
      (DB.ParisAirQuality.findOne as jest.Mock).mockResolvedValueOnce({
        date: "2025-04-08",
        time: "14:30:00",
        aqius: 150,
      });

      const result = await airQualityService.parisAirQualityService();

      // Assertions
      expect(DB.ParisAirQuality.max).toHaveBeenCalledWith("aqius");
      expect(DB.ParisAirQuality.findOne).toHaveBeenCalledWith({
        attributes: [
          [literal('DATE("ts")'), "date"],
          [literal(`TO_CHAR("ts", 'HH24:MI:SS')`), "time"],
        ],
        where: { aqius: 150 },
        order: [["ts", "ASC"]],
        raw: true,
      });
      expect(result).toEqual({
        date: "2025-04-08",
        time: "14:30:00",
        aqius: 150,
      });
    });

    it("should return null if no air quality data found", async () => {
      // Mock DB query to return null
      (DB.ParisAirQuality.max as jest.Mock).mockResolvedValueOnce(150);
      (DB.ParisAirQuality.findOne as jest.Mock).mockResolvedValueOnce(
        "No Data collected for Paris yet"
      );

      const result = await airQualityService.parisAirQualityService();

      expect(result).toEqual( "No Data collected for Paris yet");
    });
  });
});
