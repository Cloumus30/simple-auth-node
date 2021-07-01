const express = require('express');
const app = express();

const {User} = require('./models/index');

app.set('views','views');
app.set('view engine','ejs');

app.use(express.static('public'));
app.use(express.urlencoded());
app.use(express.json());

app.get('/',async (req,res)=>{
    const user = await User.findAll();
    res.json(user)
})

app.get('/login', (req,res)=>{
    res.render('login');
});
app.post('/login',(req,res)=>{
    const request = req.body;
    res.json(request);
})

app.get('/register',(req,res)=>{
    res.render('register');
})
app.post('/register',async (req,res)=>{
    const request = req.body;
    try{
        await User.create({
            name:request.name,
            email:request.email,
            password:request.password,
        })
        res.send('berhasil input')
    }catch(err){
        console.log(err);
        res.json(err);
    }
    // res.json(request);
})


app.listen(3000,()=>{
    console.log('Konek ke Localhost:3000');
})