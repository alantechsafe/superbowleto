const Sequelize = require('sequelize')
const getConfig = require('../config/database')
const rawModels = require('./models')

const config = getConfig()

const defaults = {
  define: {
    underscored: true,
  },
}

const initDatabase = () => {
  const database = new Sequelize(Object.assign(
    {},
    defaults,
    config
  ))

  const createInstance = model => ({
    model,
    instance: model.create(database),
  })

  const associateModels = ({ model, instance }) => {
    if (model.associate) {
      model.associate(instance, database.models)
    }
  }

  Object.values(rawModels)
    .map(createInstance)
    .map(associateModels)

  return database
}

module.exports = initDatabase()
