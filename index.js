const mysql = require ('mysql');
const express = require ('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());


var mysqlConn = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'empleadosDB'
});

mysqlConn.connect((err)=>{
    if (!err)
        console.log('Conexión exitosa a la base de datos');
    else
        console.log('Error de conexión a la base de datos \n Error : ' + JSON.stringify(err, undefined, 2))
});

app.listen(3000,()=>console.log('El servidor de Express ejecutándose en el puerto 3000'));

//llamar a todos los empleados que haya en la base de datos
app.get('/empleados',(req,res)=>{
    mysqlConn.query('SELECT * FROM empleado',(err, rows, fields)=>{
        if (!err)
            //console.log(rows);
            res.send(rows);
        else
            console.log(err);
    })
});

//llamar a un empleado específico a la base de datos

app.get('/empleados/:id',(req,res)=>{
    mysqlConn.query('SELECT * FROM empleado WHERE empleadoId = ?',[req.params.id],(err, rows, fields)=>{
        if (!err)
            //console.log(rows);
            res.send(rows);
        else
            console.log(err);
    })
});