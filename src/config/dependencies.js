const useCases = require('../useCases');
const repositories = require('../frameworks/repository/inMemory')
module.exports = {
    useCases,
    ...repositories
}