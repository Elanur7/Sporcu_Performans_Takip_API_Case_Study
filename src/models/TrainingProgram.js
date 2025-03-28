const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TrainingProgram = sequelize.define('TrainingProgram', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  coach_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', 
      key: 'id',
    },
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
},{
  tableName: 'training_program', 
});

TrainingProgram.associate = (models) => {
  TrainingProgram.belongsTo(models.User, { foreignKey: 'coach_id', as: 'coach' });
  TrainingProgram.hasMany(AthleteProgram, { foreignKey: 'program_id', as: 'athletePrograms' });
  TrainingProgram.hasMany(Workout, { foreignKey: 'program_id' });
};

module.exports = TrainingProgram;
