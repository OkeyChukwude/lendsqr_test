const jwt = require('jsonwebtoken');
const config = require('../../config');
const bcrypt = require('bcryptjs');
const knex = require('../../db/knex');
const { v4: uuidv4 } = require('uuid');

const { ACCESS_TOKEN_SECRET } = config;

const register = async (req, res) => {
    try {
        const { firstname, lastname, email, phone, password, pin } = req.body;

        if (!firstname || !lastname || !email || !password || !pin) return res.status(400).json({ message: "Please enter all fields", status: "error" });
    
        const user = await knex.select().from('users').where('email', email).then(u => {return u[0]});
        if (user) return res.status(400).json({message: "User email already registered!", status: "error"});

        const newUser = {
            firstname,
            lastname,
            email,
        }
        newUser.id = await uuidv4()
        if (phone) newUser.phone = phone

        const salt = await bcrypt.genSalt(10); 
        newUser.passwordHash = await bcrypt.hash(password, salt)
        newUser.pinHash = await bcrypt.hash(pin, salt)

        await knex('users').insert(newUser)

        return res.status(201).json({message: 'User registerd successfully', status: 'success'})


    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error occured in the server', status:'error'});
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) return res.status(400).json({ message: "Please enter all fields", status: "error" });

        const user = await knex.select().from('users').where('email', email).then(u => {return u[0]})
        
        if (!user) return res.status(400).json({message: "Email not found", status: "error"})

        const match = await bcrypt.compare(password, user.passwordHash)

        if(!match) return res.status(400).json({message: "Invalid Credentials", status: "error"})
        
        const token = jwt.sign(
            {
                id: user.id
            },
            ACCESS_TOKEN_SECRET,
            { 
                expiresIn: '2d'
            },
        )

        if (!token) throw new Error('Error signing access token')

        return res
                .status(200)
                .json({
                    data: {
                        id: user.id,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        phone: user.phone ? user.phone : "",
                        email: user.email,
                    },
                    token,
                    status: "success"
                })

    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error occured in the server', status:'error'});
    }
}

module.exports = {
  register,
  login
}