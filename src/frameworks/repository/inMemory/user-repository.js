const {
    inMemory
} = require('../../database/index')
const uuid = require('uuid').v4
module.exports = {
    add: async user => {
        if(!user.id){
            user.id = uuid()
        }
        inMemory.users.push(user);
        return user;
    },
    update: async user => {
        const index = inMemory.users.findIndex(({id}) => id === user.id );
        if(index >= 0){
            inMemory.users[index] = user;
            return inMemory.users[index];
        }
        return null
    },
    delete: async user => {
        const index = inMemory.users.findIndex(({id}) => id === user.id );
        if(index >= 0){
            inMemory.users.splice(index, 1);
            return user;
        }
        return null
    },
    getById: async id => {
        return inMemory.users.find((item) => item.id === id);
    }
}