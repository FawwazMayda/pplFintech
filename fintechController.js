const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const fintech = require('./Schemas')
router.use(bodyParser.json())

router.get('/create/:id',(req,res)=>{
    let userId = req.params.id 
    fintech.find({_id:userId},(err,d)=>{
        if(err) res.status(500).send("Internal server error")
        if(d.length==0){
            fintech.create({_id:userId,balance:0})
            res.status(200).send(`User created with id ${userId}`)
        } else {
            res.status(500).send({msg:"User already exits",data:d})
        }
    })
})

router.get('/topup/:id/:amount',(req,res)=>{
    let userId = req.params['id']
    let amount = parseInt(req.params['amount'])
    fintech.findOne({_id:userId},(err,d)=>{
        if(err) res.status(500).send("Internal Server error")
        d.balance = d.balance + amount
        d.save()
        res.status(200).send(`User id ${userId} added ${amount}`)
    })
})

module.exports = router

