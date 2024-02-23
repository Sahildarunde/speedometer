import Sequelize from 'sequelize';

const sequelize = new Sequelize('speedometer', 'root', 'Sahil', {
  host: 'localhost',
  dialect: 'mysql', 
});

export { sequelize };
