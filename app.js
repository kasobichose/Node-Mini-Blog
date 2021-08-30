const express=require('express');
const morgan=require('morgan');
const mongoose=require('mongoose');
const blogRoutes=require('./routes/blogRoutes');


//app
const app=express();

//connect to db
const dbURI='mongodb+srv://<db_username>:<db_password>@nodetuts.6v0vt.mongodb.net/<db_name>?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser:true, useUnifiedTopology:true})
.then((result)=> app.listen(3000))
.catch((err)=> console.log(err));

//register view engine
app.set('view engine','ejs');


//middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));

//mongoosedb and mongoose sandbox routes
app.get('/add-blog',(req,res) =>{
    const blog = new Blog({
        title:'my new blog 2',
        snippet:'about my new blog',
        body: 'more about my new blog'
    });

    blog.save()
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        console.log(err);
    })
});

app.get('/all-blogs',(req,res)=>{
    Blog.find()
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        console.log(err);
    });
});

app.get('/single-blog',(req,res)=>{
    Blog.findById('60ed245b38ec1128a838e23e')
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        console.log(err);
    });
});

app.get('/',(req,res)=>{
    res.redirect('/blogs');
});

app.get('/about',(req,res)=>{
    res.render('about', {title:'About'});
});

//blogRoutes
app.use('/blogs',blogRoutes);

//404
app.use((req,res)=>{
    res.status(404).render('404', {title:'404'});
});
