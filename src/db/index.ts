// src/db/index.ts
import  Sequelize  from 'sequelize';
import config from '../config';
import path from 'path';

import ParisAirQualityModel from '../models/ParisAirQuality';

const {
  db: { host, port, user, password, database },
} = config;

 const sequelize = new Sequelize.Sequelize(database,user, password, {
  dialect: 'postgres',
  host,
  port,
  // logging: console.log, // Set false to disable logging
  logging: false, // Set false to disable logging
});

const ParisAirQuality = ParisAirQualityModel(sequelize);


const DB = {
  ParisAirQuality,

  sequelize, // connection instance (RAW queries)
  Sequelize, // library
};
export default DB;