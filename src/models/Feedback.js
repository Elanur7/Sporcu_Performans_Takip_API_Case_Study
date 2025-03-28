const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const TrainingProgram = require('./TrainingProgram');

const Feedback = sequelize.define('Feedback', {
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
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  response_message: {  
    type: DataTypes.STRING,
    allowNull: false,  
  },
  response_date: { 
    type: DataTypes.DATE,
    allowNull: false,  
  },
});

Feedback.associate = (models) => {
  Feedback.belongsTo(models.User, { foreignKey: 'athlete_id', as: 'athlete' });
};

module.exports = Feedback;
