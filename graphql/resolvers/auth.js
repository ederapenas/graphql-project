const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');

module.exports = {
    createUser: async args => {
        try{
            const existingUser = await User.findOne({email: args.userInput.email});
                if(existingUser){
                    throw new Error('Esse usuario já existe.');
                }
                const hashedSenha = await bcrypt.hash(args.userInput.senha, 12);

                const user = new User({
                    email: args.userInput.email,
                    senha: hashedSenha
                });

                const result = await user.save();

                return{...result._doc, senha: null, _id: result.id};
        } catch(err){
            throw err;
        }
    },
    login: async ({email, senha}) => {
        const user = await User.findOne({email: email});
        if(!user){
            throw new Error('Usuario não existe.');
        }
        const isEqual = await bcrypt.compare(senha, user.senha);
        if(!isEqual){
            throw new Error('Senha incorreta.');
        }
        const token = await jwt.sign({userId: user.id, email: user.email}, 'keysecreta', {expiresIn: '1h'});
        return {userId: user.id, token: token, tokenExpiration: 1};
    }

};