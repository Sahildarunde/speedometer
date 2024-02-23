import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';


const SpeedData = sequelize.define('SpeedData', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  speed: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});


SpeedData.sync().then(() => {
  console.log('SpeedData model synced with database');
}).catch((err) => {
  console.error('Error syncing SpeedData model:', err);
});

export { SpeedData };
