import { Sequelize, DataTypes, Model, Optional } from "sequelize";

export interface IParisAirQualityAttributes {
  id: string;
  ts: string;
  aqius: number;
  mainus: string;
  aqicn: number;
  maincn: string;
}

export type IParisAirQualityInputAttributes = Optional<
  IParisAirQualityAttributes,
  "id"
>;

export interface IParisAirQualityInstance
  extends Model<IParisAirQualityAttributes, IParisAirQualityInputAttributes>,
    IParisAirQualityAttributes {
  createdAt: Date;
  updatedAt: Date;
}

export default function (sequelize: Sequelize) {
  const ParisAirQuality = sequelize.define<IParisAirQualityInstance>(
    // Model Name
    'ParisAirQuality',

    // Attributes
    {
        id: {
            primaryKey: true,
            allowNull: false,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
          },
          ts: { type: DataTypes.DATE, allowNull: false },
          aqius: { type: DataTypes.INTEGER, allowNull: false },
          mainus: { type: DataTypes.STRING, allowNull: false },
          aqicn: { type: DataTypes.INTEGER, allowNull: false },
          maincn: { type: DataTypes.STRING, allowNull: false },
    },

    // Options
    {
      tableName: 'ParisAirQuality',
      timestamps: true,
    },
  );

  return ParisAirQuality;
}
