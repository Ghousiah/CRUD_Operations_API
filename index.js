var express=require('express');
var bodyParser=require('body-parser');
var selectController=require('./controllers/selectController');
var insertController=require('./controllers/insertController');
var updateController=require('./controllers/updateController');
var deleteController=require('./controllers/deleteController');

var app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.post('/api/insert',insertController.insert);
app.post('/api/select',selectController.select);
app.post('/api/update',updateController.update);
app.post('/api/delete',deleteController.del);

app.listen(8012);