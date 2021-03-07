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

app.get('/new', (req, res)=>{
    res.render('aws/new');
    // res.view('viewname', { title: 'New Concept', data });
})

app.post('/', async (req,res)=>{
    const awsNew = new awsBase(req.body);
    await awsNew.save();
    res.redirect(`/${awsNew._id}`);
})

app.get('/:id/edit', async (req, res)=>{
    const { id } = req.params;
    const awsOne = await awsBase.findById(id);
    res.render('aws/edit', {awsOne});
    // res.view('viewname', { title: 'Edit Concept', data });
})

app.put('/:id', async (req, res)=>{
    const { id } = req.params;
    const aws = await awsBase.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
    res.redirect(`/${aws._id}`);
})

app.get('/:id', async (req, res)=>{
    const { id } = req.params;
    const awsOne = await awsBase.findById(id);
    res.render('aws/show', {awsOne});
    // res.view('viewname', { title: 'View Concept', data });
})

app.delete('/:id', async (req, res)=>{
    const { id } = req.params;
    const deleteUser = await awsBase.findByIdAndDelete(id);
    res.redirect('/');
})

app.listen(3000, ()=>{
    console.log("Listening on Port 3000");
})