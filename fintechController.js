const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const fintech = require('./Schemas')
router.use(bodyParser)

router.get('/create/:id',(req,res)=>{
    let userId = req.params.id 
    fintech.find({id:userId},(err,d)=>{
        if(err){
            fintech.create({id:userId,balance:0})
            res.status(200).send(`User created with id ${userId}`)
        } else {
            res.status(500).send({msg:"User already exits",data:d})
        }
    })
})

module.exports = router

