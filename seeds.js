const mongoose = require('mongoose');
const userBase = require('./models/users');

mongoose.connect('mongodb://localhost:27017/forum', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log("Mongo Connection Open");
    })
    .catch(err =>{
        console.log("Mongo Error");
        console.log(err);
    })

// const p = new userBase({
//     name: "Harold",
//     age: 21,
//     isVerified: true,
//     level: 4,
//     bio: "I am in pain",
//     location: "America"
// })
// p.save().then(p =>{
//     console.log(p);
// })
// .catch(e => {
//     console.log(e);
// })

// const userList = [
//     {
//         name: "Mac", 
//         age: 23,
//         isVerified: true,
//         level: 10,
//         bio: "I like to live dangerously",
//         location: "America"
//     },
//     {
//         name: "Bill",
//         age: 69,
//         isVerified: false,
//         level: 1,
//         bio: "I'm just here to make friends",
//         location: "Europe"
//     },
//     {
//         name: "Monica",
//         age: 18,
//         isVerified: true,
//         level: 3,
//         bio: "Hardcore Communist. Views are my own",
//         location: "Africa"
//     },
//     {
//         name: "Jerry",
//         age: 25,
//         isVerified: false,
//         level: 11,
//         bio: "How do you delete system 32",
//         location: "Australia"
//     },
//     {
//         name: "Danny",
//         age: 19,
//         isVerified: true,
//         level: 11,
//         bio: "I love pancakes!",
//         location: "Asia"
//     },
// ]

// userBase.insertMany(userList)
//     .then(res =>{
//         console.log(res)
//     })
//     .catch(e =>{
//         console.log(e)
//     })