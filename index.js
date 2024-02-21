const express = require ('express');
const server = express();
const mongoose = require('mongoose');
const cors = require('cors') //npm i cors

const {createProduct } = require('./controller/product');
const productsRouter = require('./routes/Products')
const categoriesRouter = require('./routes/Categories')
const brandsRouter = require('./routes/Brands')
const usersRouter = require('./routes/Users')
const authRouter = require('./routes/Auth')
const cartRouter = require('./routes/Cart');
const orderRouter = require('./routes/Order');


//middlewared 
server.use(cors({
    exposedHeaders:['X-Total-Count']
}))
server.use(express.json()) //to parse json type body
server.use('/products',productsRouter.router)
server.use('/categories',categoriesRouter.router)
server.use('/brands',brandsRouter.router)
server.use('/user',usersRouter.router)
server.use('/auth',authRouter.router)
server.use('/cart',cartRouter.router)
server.use('/cart',orderRouter.router)

main().catch(err=> console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/mern_ecomm');
    console.log('db connected')
}

server.get('/',(req, res)=>{
   res.json({status:'success'})
})

server.post('/products',createProduct); //post is used to create
    
server.listen(8080, ()=>{
    console.log('server started at port 8080')
})