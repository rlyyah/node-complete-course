const express = require("express");
const hbs = require('hbs');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

// some random variables
var view = 0;

hbs.registerPartials(__dirname +'/views/partials')
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

/*app.use((req, res, next)=>{
   res.render('maintanace.hbs', {
       message : 'Sorry, we are currently down to fix some server issues!'
   }); 
});*/

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
});


app.get('/', (req, res)=>{
    view++;
    res.render('index.hbs', {
        title: 'This is my brand new webpage!',
        description: 'I like potatoes very much :3',
        views: view
    });
});

app.get('/bad', (req,res)=>{
    view++;
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
app.get('/about', (req, res) => {
    view++;
    res.render('about.hbs',{
        title: 'Hello Im Motasz and I enjoy web developing!',
        description: 'Want to know moar? Find me somewhere!',
        views: view
    })
})

app.get('/projects', (req, res)=>{
    view++;
    res.render('projects.hbs',{
        title: 'somewhere in the futere there will be some projects here!',
        description: 'by now, u need to enjoy whats here',
        views: view
    });
})

app.listen(port, process.env.IP, () =>{
    console.log(`Server has started on port ${port}`);
} )