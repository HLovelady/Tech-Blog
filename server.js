const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars')


const app = express();
const PORT = process.env.PORT || 3000;

// THIS IS EXPRESS MIDDLEWARE (express config)
const hbs = exphbs.create();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')))
// this parses the incoming 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// TEST ROUTES
app.get('/', (req, res) => {
    console.log("hit landing Route")
    res.render('homepage');
})


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
})