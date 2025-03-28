const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const TrainingProgram = require('./TrainingProgram');

const AthleteProgram = sequelize.define('AthleteProgram', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  athlete_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
  },
  program_id: {
    type: DataTypes.INTEGER,
    references: {
      model: TrainingProgram,
      key: 'id',
    },
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'completed'),
    allowNull: false,
  }
},{
  tableName: 'athlete_program',
}
);

AthleteProgram.associate = (models) => {
  AthleteProgram.belongsTo(models.User, { foreignKey: 'athlete_id', as: 'athlete' });
  AthleteProgram.belongsTo(models.TrainingProgram, { foreignKey: 'program_id', as: 'trainingProgram' });
};

module.exports = AthleteProgram;
