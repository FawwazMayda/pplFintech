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

router.get('/transfer/:senderID/:receiverID/:amount',(req,res)=>{
    let senderID = req.params['senderID']
    let receiverID = req.params['receiverID']
    let amount = parseInt(req.params['amount'])
    fintech.findOne({_id:senderID},(err1,d1)=>{
        if(err1) res.status(500).send("Internal server error")
        if(d1!=null){
            fintech.findOne({_id:receiverID},(err2,d2)=>{
                if(err2) res.status(500).send("Internal server error")
                if(d2!=null){
                    let tempD1 = d1.balance - amount
                    let tempD2 = d2.balance + amount
                    if(tempD1 < 0){
                        res.status(401).send(`Amount of transfer cause SenderID ${senderID} below 0. Rejected`)
                    } else {
                        d1.balance = tempD1
                        d2.balance = tempD2
                        d1.save()
                        d2.save()
                        res.status(200).send(`SenderID ${senderID} send ${amount} to ReceiverID ${receiverID}`)
                    }
                } else {
                    res.status(404).send(`Receiver ID ${receiverID} not found`)
                }
            })
        } else {
            res.status(404).send(`Sender ID ${senderID} not found`)
        }
    })
})

module.exports = router

