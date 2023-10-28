const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(bodyparser.json());


//Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'user_web',
    port: 3306
});


//Check Database Connection
db.connect(err=>{
    if(err){console.log(err, 'db err');}
    console.log('Database connected...');
});



//Get all data
app.get('/user',(req, res)=>{
    let qr = `select * from user`;
    db.query(qr, (err, result)=>{
        if(err){
            console.log(err, 'errs');
        }

        if(result.length>0){
            res.send({
                message: 'all user data',
                data: result
            });
        }
    });
});

//Get single data
app.get('/user/:id', (req, res)=>{
    let gID = req.params.id;
    let qr = `select * from user where id = ${gID}`;
    db.query(qr, (err, result)=>{
        if(err){console.log(err);}

        if(result.length>0){
            res.send({
                message: 'Single user data',
                data: result
            });
        }
        else {
            res.send({
                message: 'data not found'
            });
        }
    })
});


//Create data
app.post('/user', (req, res)=>{
    console.log(req.body, 'createdata');

    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let eMail = req.body.email;
    let pswrd = req.body.password;

    let qr = `insert into user(firstname, lastname, email, password) values ('${firstname}', '${lastname}', '${eMail}', '${pswrd}')`;

    db.query(qr, (err, result)=>{
        if(err){console.log(err);}

        console.log(result, 'result');
        res.send({
            message: 'data inserted',
        });
    })
});


//Update single data
app.put('/user/:id', (req, res)=>{
    let qID = req.params.id;

    console.log(req.body, 'update data');
    
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let eMail = req.body.email;
    let pswrd = req.body.password;

    let qr = `update user set firstname = '${firstname}', lastname= '${lastname}', email = '${eMail}', password = '${pswrd}' where id=${qID}`;

    db.query(qr, (err, result)=>{
        if(err){console.log(err);}
        res.send({
            message: 'data updated',
        });
    })

});



//Delete single data
app.delete('/user/:id', (req, res)=>{
    let qID = req.params.id;
    let qr = `delete from user where id = ${qID}`;
    db.query(qr, (err, result)=>{
        if(err){console.log(err);}

        res.send({
            message: 'data deleted'
        });
    })
});


app.listen(3000,()=>{
    console.log('Server running..');
});