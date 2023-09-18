import { DataTypes } from 'sequelize'
import { pg } from '../db/index.js'

const userModel = pg.define('users', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  login: { type: DataTypes.STRING, unique: true, validate: { len: [1, 255] } },
  password: { type: DataTypes.STRING, validate: { len: [1, 255] } }
})

const taskModel = pg.define('tasks', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, validate: { len: [1, 100] } },
  description: { type: DataTypes.TEXT, validate: { len: [1, 200] } },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'started',
    validate: { len: [1, 10] }
  }
})

userModel.hasMany(taskModel)
taskModel.belongsTo(userModel)

export { userModel, taskModel }
