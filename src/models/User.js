const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('coach', 'athlete', 'admin'),
    allowNull: false,
    defaultValue: 'athlete',
  },
});

User.associate = (models) => {
  User.hasMany(models.TrainingProgram, { foreignKey: 'coach_id', as: 'trainingPrograms' });
  User.hasMany(models.Feedback, { foreignKey: 'athlete_id', as: 'athlete' });
};

module.exports = User;
