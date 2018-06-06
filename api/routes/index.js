var express = require('express');
const fileUpload = require('express-fileupload')
var router = express.Router();
const mongodb = require('mongodb')
const mongoose = require('mongoose')
const uuidv1 = require('uuid')

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express API' });
});

router.post('/upload', (req, res) => {
	if(req.files) {
		var file = req.files.filename
		var filename = file.name
		console.log(file)
		file.mv('./public/pdf/' + filename, err => {
			if(err) {
				console.log(err)
				res.send('error occured')
			} else res.send('Done!')
		})
	}
})

router.post('/newUser', function(req, res) {
	console.log('RECEIVED')
	// console.log(req.body)
	let url = 'mongodb://localhost:27017/ribrary'
	mongoose.connect(url, (err, db) => {
		if(err) console.log('Ошибка подключения к базе данных', err)
		else {
			console.log('Подключение установленно')
			let collection = db.collection('users')

			const newUser = {
				id: uuidv1(),
				username: req.body.username,
				password: req.body.password,
				usercode: req.body.usercode,
			}

			collection.insert([newUser], (err, result) => {
				if(err) console.log(err)
				else console.log('Новый пользователь был добавлен')
			})

			db.close()
		}
	})
})

router.get('/users', function(req, res) {
	let url = 'mongodb://localhost:27017/ribrary'
	mongoose.connect(url, (err, db) => {
		if(err) console.log('Ошибка подключения к базе данных', err)
		else {
			console.log('Подключение установлено')
			let collection = db.collection('users')

			collection.find({}).toArray((err, result) => {
				if(err) res.send(err)
				else if(result.length) res.send(result)
				else res.send('Документ с пользователями не был найден')

				db.close()
			})
		}
	})
})

module.exports = router;
