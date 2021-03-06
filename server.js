const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

// enable partial, reusable views
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

// app.use - how we register middleware
app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;

	console.log(log);
	fs.appendFile('server.log', log + '\n', err => {
		if (err) {
			console.log('Unable to append to server.log');
		}
	})
	next();
})

// maintenance page - without next nothing else is rendered!
// app.use((req, res, next) => {
// 	res.render('maintenance.hbs')
// })

// helpers - functions to call
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
})

// 1) arg. /-route of the app
// 2) arg. function to call
app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMsg: 'Hello, this is my first hbs'
	})
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page'
	});
});

app.get('/projects', (req, res) => {
	res.render('projects.hbs', {
		pageTitle: 'My projects',
		welcomeMsg: 'Project portfolio'
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Unable to handle request'
	});
});

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});
