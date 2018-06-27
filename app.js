const express = require("express");
const hbs = require('hbs');
const fs = require('fs');
const app = express();

// some random variables
var view = 0;

app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/public'));

app.use((req, res, next)=>{
    var date = new Date().toString();
    var log = `${date}: ${req.method} ${req.url}`;
    
    fs.appendFile('server.log', log + '\n', (e) => {
        if(e){
            console.log('unable to save log');
        }
    })
    next();
});

app.use((req, res, next)=>{
   res.render('maintanace.hbs', {
       message : 'Sorry, we are currently down to fix some server issues!'
   }); 
});


app.get('/', (req, res)=>{
    view++;
    res.render('index.hbs', {
        title: 'This is my brand new webpage!',
        desc: 'I like potatoes very much :3',
        views: view
    });
});

app.get('/bad', (req,res)=>{
   res.send({
       errorMsg: 'Unable to connect to the server',
       status: '404',
       collection: [
           'Weird Dog',
           'Slumpy Cat',
           'Homecomming Owl',
           ],
        areYouGlad: true
   }) 
});

app.listen(process.env.PORT, process.env.IP, () =>{
    console.log('server has started!');
} )