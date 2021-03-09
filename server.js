const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const awsBase = require('./models/users');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');

mongoose.connect('mongodb://localhost:27017/aws', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log("Mongo Connection Open");
    })
    .catch(err =>{
        console.log("Mongo Error");
        console.log(err);
    })

app.engine("ejs", ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use( express.static( "public" ) );


// index page to show all files //
app.get('/', async (req, res)=>{
    const { domain } = req.query;
    if(domain){
        const aws = await awsBase.find({ domain });
        res.render('aws/index', { aws, domain });
        // res.view('viewname', { title: 'AWS Notes', data });
    }else{
        const aws = await awsBase.find({});
        res.render('aws/index', { aws, domain: 'AWS Cloud Cert Practitioner Notes' });
        // res.view('viewname', { title: 'AWS Notes', data });
    }
})

// supposed to be the search function //
// currently setup to mimic the above category search, however we want it to search for anything within the categories 
// app.get('/search', async (req, res)=>{
//     const { results } = req.query;
//     const aws = await awsBase.find({ results });
//     res.render('aws/results', {aws, results});
// })

// New Concept Page //
app.get('/new', (req, res)=>{
    res.render('aws/new');
    // res.view('viewname', { title: 'New Concept', data });
})

// Post Request to Create a concept //
app.post('/', async (req,res)=>{
    const awsNew = new awsBase(req.body);
    await awsNew.save();
    res.redirect(`/${awsNew._id}`);
})

// Edit individual concept page //
app.get('/:id/edit', async (req, res)=>{
    const { id } = req.params;
    const awsOne = await awsBase.findById(id);
    res.render('aws/edit', {awsOne});
    // res.view('viewname', { title: 'Edit Concept', data });
})

// Post request from the edit concept page //
app.put('/:id', async (req, res)=>{
    const { id } = req.params;
    const aws = await awsBase.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
    res.redirect(`/${aws._id}`);
})

// show individual concept page //
app.get('/:id', async (req, res)=>{
    const { id } = req.params;
    const awsOne = await awsBase.findById(id);
    res.render('aws/show', {awsOne});
    // res.view('viewname', { title: 'View Concept', data });
})

app.delete('/:id', async (req, res)=>{
    const { id } = req.params;
    const awsDelete = await awsBase.findByIdAndDelete(id);
    res.redirect('/');
})

app.listen(3000, ()=>{
    console.log("Listening on Port 3000");
})