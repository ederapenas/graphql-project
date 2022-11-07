const Event = require('../../models/event');
const { transformEvent } = require('./merge');
const User = require('../../models/user');

module.exports = {
    events: async () => {
        try{
            const events = await Event.find()
            return events.map(event => {
                return transformEvent(event);
        });
        }catch(err){
            throw err;
        }
    },
    createEvent: async (args, req) => {
        const event = new Event({
            titulo: args.eventInput.titulo,
            descricao: args.eventInput.descricao,
            preco: +args.eventInput.preco,
            data: new Date(args.eventInput.data),
            criador: '636967e7e46b91eb25128594'
        });
        let createdEvent;
        try{
        const result = await event.save();
            createdEvent = transformEvent(result);
            const criador = await User.findById('636967e7e46b91eb25128594');
            if(!criador){
                throw new Error('Usuario não encontrado.');
            }
            criador.createdEvents.push(event);
            await criador.save();
            return createdEvent;
        } catch(err){
            console.log(err);
            throw err;
        }
    }
};