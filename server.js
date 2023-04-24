const express = require('express')
const app =express()
const ShortUrl = require('./models/shortUrl')
const mongoose = require('mongoose')


mongoose.connect('mongodb+srv://selvamurugaiah100:Mselva95@cluster0.zphx6l8.mongodb.net/url-shortner-task',{
    useNewUrlParser:true,useUnifiedTopology:true   //set up options [this is just allows us to not have to worry about any deprecation warnings ]
})

app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))

app.get('/',async(req,res)=>{
    const shortUrls = await ShortUrl.find()
    res.render('index',{shortUrls:shortUrls})
  
})

app.post('/shortUrls',async (req,res)=>{
    await ShortUrl.create({full:req.body.fullUrl})
    res.redirect('/')
})

app.get('/:shortUrl',async(req,res)=>{
    const shortUrl = await ShortUrl.findOne({short:req.params.shortUrl})
    if(shortUrl== null) return res.sendStatus(404)

    shortUrl.clicks ++
    shortUrl.save()

    res.redirect(shortUrl.full)
})

app.listen(process.env.PORT || 4000);