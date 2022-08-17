const knex = require('../../db/knex');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

const generateAccountNumber = async () => {
    const newAccountNumber = parseInt(Math.random()*10000000000, 10)

    while (true) {
        let accountNumber = await knex.select().from('accounts').where('acctNumber', newAccountNumber).then(a => {return a[0]});
        if (!accountNumber) break
    }
    return newAccountNumber
}

const getUserAccount = async () => {

}

const create = async (req, res) => {
    try {
        const account = await knex.select().from('accounts').where('userId', req.user).then(a => {return a[0]});
        if (account) return res.status(400).json({message: "User already has an account!", status: "error"})

        const newAccount = {
            id: uuidv4(),
            acctNumber: await generateAccountNumber(),
            userId: req.user,
            balance: 0
        }

        await knex('accounts').insert(newAccount)

        return res.status(201).json({message: 'User Account created successfully', status: 'success'})
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error occured in the server', status:'error'});
    }
}

const balance = async (req, res) => {
    try {
        const account = await knex.select().from('accounts').where('userId', req.user).then(a => {return a[0]});
        if (!account) return res.status(400).json({message: "User does not have an account", status: "error"})

        return res.status(200).json({
            data: {
                balance: account.balance / 100  //change balance to naira
            },
            status: 'success'
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error occured in the server', status:'error'});
    }
}

const fund = async (req, res) => {
    try {
        let { amount, pin } = req.body
        
        if (!amount || !pin) return res.status(400).json({message: "Please enter all fields", status: "error"})
        amount = amount * 100  //change amount to kobo

        const account = await knex.select().from('accounts').where('userId', req.user).then(a => {return a[0]});
        if (!account) return res.status(400).json({message: "User does not have an account", status: "error"})
        
        //check transaction pin
        const user = await knex.select().from('users').where('id', req.user).then(u => {return u[0]});
        const match = await bcrypt.compare(pin, user.pinHash)

        if(!match) return res.status(400).json({message: "Invalid Transaction Pin", status: "error"})

        await knex('accounts').where({userId: req.user}).update({balance: account.balance + amount})
        
        return res.status(200).json({message: 'Account funded successfully', data: {amount: amount / 100, balance: (account.balance + amount) / 100}, status: 'success'})
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error occured in the server', status:'error'});
    }
}

const transfer = async (req, res) => {
    try {
        const { recipient, pin } = req.body
        let { amount } = req.body

        if (!amount || !recipient || !pin) return res.status(400).json({message: "Please enter all fields", status: "error"})
        amount = amount * 100  //change amount to kobo

    // check senders account
    const senderAccount = await knex.select().from('accounts').where('userId', req.user).then(a => {return a[0]});
    if (!senderAccount) return res.status(400).json({message: "User does not have an account", status: "error"})  
    
    //check recipient account number
    const recipientAccount = await knex.select().from('accounts').where('acctNumber', recipient).then(a => {return a[0]});
    if (!recipientAccount) return res.status(400).json({message: "Invalid Recipient Account Number", status: "error"})

    //check transaction pin
    const sender = await knex.select().from('users').where('id', req.user).then(u => {return u[0]});
    const match = await bcrypt.compare(pin, sender.pinHash)

    if(!match) return res.status(400).json({message: "Invalid Transaction Pin", status: "error"})

    //check if sender has enough money
    if ( senderAccount.balance < amount ) return res.status(400).json({message: "Insufficient Funds", status: "error"})

    //increase recipient's balance
    await knex('accounts').where({acctNumber: recipient}).update({balance: recipientAccount.balance + amount})

    //decrease sender's balance
    await knex('accounts').where({userId: req.user}).update({balance: senderAccount.balance - amount})

    return res.status(200).json({message: 'Transfer successfully', data: {amount: amount / 100, balance: (senderAccount.balance - amount) / 100}, status: 'success'})

    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error occured in the server', status:'error'});
    }
}

const withdraw = async (req, res) => {
    try {
        let { amount, pin } = req.body
        
        if (!amount || !pin) return res.status(400).json({message: "Please enter all fields", status: "error"})
        amount = amount * 100  //change amount to kobo

        const account = await knex.select().from('accounts').where('userId', req.user).then(a => {return a[0]});
        if (!account) return res.status(400).json({message: "User does not have an account", status: "error"})
        
        //check transaction pin
        const user = await knex.select().from('users').where('id', req.user).then(u => {return u[0]});
        const match = await bcrypt.compare(pin, user.pinHash)

        if(!match) return res.status(400).json({message: "Invalid Transaction Pin", status: "error"})

        //check if sender has enough money
        if ( account.balance < amount ) return res.status(400).json({message: "Insufficient Funds", status: "error"})

        await knex('accounts').where({userId: req.user}).update({balance: account.balance - amount})
        
        return res.status(200).json({message: 'Withdrawal successfully', data: {amount: amount / 100, balance: (account.balance - amount) / 100}, status: 'success'})
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error occured in the server', status:'error'});
    }   
}

module.exports = {
  create,
  balance,
  fund,
  transfer,
  withdraw,
  generateAccountNumber
}