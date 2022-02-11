const express = require('express')
const router = express.Router()

var jsforce = require('jsforce'); //Adding JsForce

var success = {"success" : true};
var not_success = {"success" : false};
var conn = new jsforce.Connection
(
    {
        // you can change loginUrl to connect to sandbox or prerelease env.
        loginUrl : 'https://login.salesforce.com'
    }
);
var username = 'neerajkumar.badam@mtxb2b.com.project';
var password = 'Bneeraj@272ddXwatjwpliW4seQd3g02VC';
conn.login(username, password, function(err, userInfo) 
{
    if (err) 
    {
        return console.error(err); 
    }

// Done
router.put('/saveDriver',async(req,res) => {
    
    const Driver = {
        'Name' : req.body.username,
        'mobile__c' : req.body.phoneNo,
        'email__c' : req.body.emailId
    }
    console.log(Driver)

    conn.sobject('Driver__c').create(Driver, function(err, result) {
    if (err) 
    { 
        conn.sobject('Driver__c')
        .find({ 'email__c' : req.body.emailId })
        .update(Driver, function(error, CurrentResult) {
            if (error)
            {
                console.log(error);
                res.send(not_success);
            }
            res.send({updated:true});
        });
    }
    else 
    {
        if(result.success)
            res.send({saved:true});
        else
            res.send(not_success);
    }
    });
})


// Done
router.put('/addRouteToDriver',async(req,res) => {
    const driver = {
        startPoint__c: req.body.startPoint,
        endPoint__c : req.body.endPoint,
        date__c : req.body.date,
        time__c : `${req.body.time}`,
        seats__c : req.body.seats,
        distance__c	 : req.body.distance,
        vehicleModel__c : req.body.vehicleModel,
        vehicleNumber__c : req.body.vehicleNumber
    }
    
    conn.sobject('Driver__c')
        .find({ 'email__c' : req.body.emailId })
        .update(driver, function(error, result) {
            if (error)
            {
                console.log(error)
                res.send({"Nodriver":true});
            }
            if(result.length == 0)
                res.send({"Nodriver":true})
            else
                res.send(success);
    });
})

// Done
router.get('/getDriverRoutes',async(req,res) =>{
    var records = [];
    conn.query(`Select Id,Name,email__c,date__c,distance__c,remainingSeats__c,startPoint__c,endPoint__c,vehicleModel__c,vehicleNumber__c,time__c from Driver__c where remainingSeats__c > 0`, function(err, result) {
    if (err) 
    { 
        return console.error(err); 
    }
    // console.log(result)
    records = result.records;
    if(records.length > 0)
        res.send(result.records);
    else
        res.send(not_success);
    });
})

// Done
router.get('/getDriverRoutes/:id',async(req,res) =>{
    const place = req.params.id;
    console.log(place)
    var records = [];
    conn.query(`Select Id,Name,email__c,date__c,distance__c,remainingSeats__c,startPoint__c,endPoint__c,vehicleModel__c,vehicleNumber__c,time__c from Driver__c where startPoint__c like '%${place}%' OR endPoint__c like '%${place}%'`, function(err, result) {
    if (err) 
    { 
        return console.error(err); 
    }
    console.log(result)
    records = result.records;
    if(records.length > 0)
        res.send(records);
    else
        res.send(not_success);
    });
})

// Done
router.get('/getDriver',async(req,res) =>{
    var records = [];
    conn.query(`Select Id,Name,mobile__c,email__c from Driver__c`, function(err, result) {
    if (err) 
    { 
        return console.error(err); 
    }
    console.log(result)
    records = result.records;
    if(records.length > 0)
        res.send(records);
    else
        res.send(not_success);
    });
})

// Done
router.delete('/deleteDriver/:id',async(req,res) =>{
    const id = req.params.id;
    console.log(id);
    conn.sobject('Driver__c').destroy(id, function(err, result) {
        if (err) 
        { 
            return console.error(err); 
        }
        console.log(result);
        if(result.success)
            res.send(success);
        else
            res.send(not_success);
        });
})


// Done
router.get('/searchDriver/:id',async(req,res)=>{
    const name = req.params.id;
    console.log(name)
    var records = [];
    conn.query(`Select Id,Name,mobile__c,email__c from Driver__c where name like '%${name}%'`, function(err, result) {
    if (err) 
    { 
        return console.error(err); 
    }
    console.log(result)
    records = result.records;
    if(records.length > 0)
        res.send(records);
    else
        res.send(not_success);
    });
})

// Done
router.delete('/deleteDriverRoutes/:id',async(req,res)=>{
    const id = req.params.id;
    const Driver = {
        startPoint__c: null,
        endPoint__c : null,
        date__c : null,
        time__c : null,
        seats__c : null,
        distance__c	 : null,
        vehicleModel__c : null,
        vehicleNumber__c : null
    }

    conn.sobject('Driver__c')
        .find({"Id":id})
        .update(Driver, function(error, result) {
            if (error)
            {
                console.log(error);                
                res.send(false);
            }
            res.send(true);
        });
})

});

module.exports = router