const express = require('express')
const mongoose = require('mongoose')

const cors = require('cors')


const app = express()
//middleWare
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(express.static("uploads"));


//Backend Connection
mongoose.connect('mongodb+srv://Sunil_Raj:sunildon@cluster0.15fc0.mongodb.net/VUE-PROJECT?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useFindAndModify:false,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>console.log('Connected')).catch(err=>console.log(err))



//Routes:
app.use("",require('./routes/routes'))




// For Production:
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(__dirname + '/dist/'));
    app.get("*",(req,res)=>{
        res.sendFile(__dirname+'/dist/index.html')
    })
}


//Start Port
app.listen(3000,()=>{
    console.log('Server Started')
})