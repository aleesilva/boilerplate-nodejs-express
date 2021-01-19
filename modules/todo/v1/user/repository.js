/**
 *
 * * the repository file is responsible
 * for the application's business rules
 * and data persistence in its database
 */
const rfr = require('rfr')
const actionsPath = './crud/'
const Model = rfr('models/user').model
const extend = require('extend')
const repositoryActions = {}

const crudOperators = ['findById', 'remove', 'checkExists']
const createMethods = (element, index) => {
  repositoryActions[element] = rfr(actionsPath + element)(Model)
}
crudOperators.forEach(createMethods)

const customMethods = {}

extend(repositoryActions, customMethods)

module.exports = repositoryActions
