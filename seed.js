
const mongoose=require('mongoose');
const Product= require('./model/product');

mongoose.connect('mongodb://127.0.0.1:27017/shopping-app')
.then(()=>{
    console.log("DB Connected");

})
.catch((err)=>{
    console.log(err);
    
})

const products=[
    {
        name:'Iphone 11',
        img:'https://images.unsplash.com/photo-1599202860130-f600f4948364?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SXBob25lfGVufDB8fDB8fHww',
        price:200,
        desc:"The first-generation iPhone was announced by then–Apple CEO Steve Jobs on January 9, 2007. Since then, Apple has annually released new iPhone models."
    },
    {
        name:'Nike Shoes',
        img:'https://images.unsplash.com/photo-1521093470119-a3acdc43374a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmlrZXxlbnwwfHwwfHx8MA%3D%3D',
        price:300,
        desc:"The first-generation iPhone was announced by then–Apple CEO Steve Jobs on January 9, 2007. Since then, Apple has annually released new iPhone models."
    },

    {
        name:'Titan Watch',
        img:'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdhdGNoZXN8ZW58MHx8MHx8fDA%3D',
        price:100,
        desc:"The first-generation iPhone was announced by then–Apple CEO Steve Jobs on January 9, 2007. Since then, Apple has annually released new iPhone models."
    },
    {
        name:'Macbook Air',
        img:'https://images.unsplash.com/photo-1617471346061-5d329ab9c574?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1hY2tib29rfGVufDB8fDB8fHww',
        price:500,
        desc:"The first-generation iPhone was announced by then–Apple CEO Steve Jobs on January 9, 2007. Since then, Apple has annually released new iPhone models." 
    },
    {
        name:'Drones',
        img:'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8RHJvbmVzfGVufDB8fDB8fHww',
        price:400,
        desc:"This is Drone made in 1990.It has  4 wings made of stee.It azmaing to have in the cbox."
    },
    {
        name:"Bicyle",
        img:'https://images.unsplash.com/photo-1643572464934-682ef0697e8c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fEJ5Y2xlfGVufDB8fDB8fHww',
        price:200,
        desc:"Bicycles were introduced in the 19th century in Europe. By the early 21st century there were more than 1 billion bicycles."
    }

];

Product.insertMany(products)
.then(()=>{
    console.log("Product Seeded");
})