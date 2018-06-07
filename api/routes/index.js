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
		var file = req.files.book
		var filename = req.body.bookName
		file.mv('./public/books/' + filename, err => {
			if(err) {
				console.log(err)
				res.send('error occured')
			} else {
				const url = 'mongodb://localhost:27017/ribrary'
				const bookname = req.body.bookName
				const category = 'Тестовая категория'

				mongoose.connect(url, (err, db) => {
					if(err) console.log('Ошибка подключения к базе данных', err)
					else {
						console.log('Подключение установленно')
						let collection = db.collection('books')

						const newUser = {
							id: uuidv1(),
							bookname,
							category
						}

						collection.insert([newUser], (err, result) => {
							if(err) console.log(err)
							else console.log('Новый книга была добавлен')
						})

						db.close()
					}
				})
				res.send('Done!')
			}
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

router.get('/getBooks', function(req, res) {
	const url = 'mongodb://localhost:27017/ribrary'
	mongoose.connect(url, (err, db) => {
		if(err) console.log('Ошибка подключения к базе данных', err)
		else {
			console.log('Подключение установлено')
			let collection = db.collection('books')

			collection.find({}).toArray((err, result) => {
				if(err) res.send(err)
				else if(result.length) res.send(result)
				else res.send('Документ с книгами не был найден')

				db.close()
			})
		}
	})
})

router.get('/users', function(req, res) {
	const url = 'mongodb://localhost:27017/ribrary'
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
