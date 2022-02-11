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
router.get('/getRoutes/:id',async(req,res) =>{
    const place = req.params.id;
    var records = [];
    console.log("Enter "+place)
    conn.query(`Select mobile__c,Id,Name,email__c,date__c,distance__c,remainingSeats__c,startPoint__c,endPoint__c,vehicleModel__c,vehicleNumber__c,time__c from Driver__c where (startPoint__c like '%${place}%' OR endPoint__c like '%${place}%') AND remainingSeats__c > 0`, function(err, result) {
    if (err) 
    { 
        return console.error(err); 
    }
    
    records = result.records;
    console.log(records)
    if(records.length > 0)
        res.send(result.records);
    else
        res.send(not_success);
    });
})


// Done
router.post('/login',async(req,res) =>{

    conn.query(`Select email__c,password__c from User__c where email__c = '${req.body.emailId}' AND password__c = '${req.body.password}'`, function(err, result) {
    if (err) 
    { 
        return console.error(err); 
    }
    records = result.records;
    console.log(records)
    if(records.length == 1)
        res.send(success);
    else
        res.send(not_success);
    });
})

// Done
router.get('/getDriverRoutes',async(req,res) =>{
    var records = [];
    conn.query(`Select Id,Name,mobile__c,date__c,distance__c,remainingSeats__c,startPoint__c,endPoint__c,vehicleModel__c,vehicleNumber__c from Driver__c where remainingSeats__c > 0`, function(err, result) {
    if (err) 
    { 
        return console.error(err); 
    }
    
    records = result.records;
    if(records.length > 0)
        res.send(result.records);
    else
        res.send(not_success);
    });
})


// Done
router.post('/signup',async(req,res) => {
    const User__c = {
        'Name' : req.body.username__c,
        'password__c' : req.body.password__c,
        'mobile__c' : req.body.mobile__c,
        'email__c' : req.body.email__c,
        'address__c' : req.body.address__c
    }

    conn.sobject('User__c').create(User__c, function(err, result) {
    if (err) 
    { 
        return res.send("Email already registered"); 
    }
    if(result.success)
        res.send(success);
    else
        res.send(not_success);
    });
})

// Should Do
router.put('/editUser/:id',async(req,res) =>{
    const email = req.params.id;
    const User__c = {
        'Name' : req.body.username,
        'password__c' : req.body.password,
        'mobile__c' : req.body.mobile,
        'address__c' : req.body.address
    }
    conn.sobject('User__c')
    .find({ 'email__c' : email })
    .update(User__c, function(err, rets) {
      if (err) 
        return res.send(not_success); 
      res.send(success);
    });
})

// Done
router.post('/saveBooking',async(req,res) => {
    const email = req.body.id;
    const Driver__c	= req.body.driver.Id;
    console.log(req.body)
    conn.query(`Select Id from User__c where email__c LIKE '%${email}%'`, function(err, result) {
        records = result.records[0];
        const User__c = records.Id;
        const Booking__c = {
            Driver__c : Driver__c,
            User__c : User__c,
        }
        console.log(Booking__c);
        conn.sobject('Booking__c').create(Booking__c, function(err, result) {
            if (err) 
            { 
                return res.send(not_success); 
            }
            res.send(success)
        });
    });
    
})

// Not Done
router.delete('/cancelBooking/:id',async(req,res) => {
    const email = req.params.id;
    var id;
    conn.query(`Select Id from Booking__c where useremail__c LIKE '%${email}%'`, function(err, result) {
        console.log("Entering")
        if (err) 
        { 
            console.log(err);
            return res.send(false); 
        }
        if(result.records.length == 0){
            res.send(false)
        }
        else
        {
            const id = result.records[0].Id;
            conn.sobject('Booking__c').destroy(id, function(error, currentResult) {
                if (error) 
                { 
                    return res.send(false); 
                }
                console.log(result);
                if(currentResult.success)
                    res.send(true);
                else
                    res.send(false);
                });
            }
    });
    
})

// Done
router.delete('/:id',async(req,res) =>{
//  Not Applicable
})

})
module.exports = router