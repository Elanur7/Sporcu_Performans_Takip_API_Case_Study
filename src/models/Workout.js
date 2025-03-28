const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const TrainingProgram = require('./TrainingProgram');

const Workout = sequelize.define('Workout', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  program_id: {
    type: DataTypes.INTEGER,
    references: {
      model: TrainingProgram,
      key: 'id',
    },
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  calories_burned: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

Workout.associate = (models) => {
  Workout.belongsTo(models.TrainingProgram, { foreignKey: 'program_id', as: 'trainingProgram' });
};

module.exports = Workout;
