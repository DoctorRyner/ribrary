var express = require('express');
var router = express.Router();
const mongodb = require('mongodb')
const mongoose = require('mongoose')
const uuidv1 = require('uuid')

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express API' });
});

router.post('/newUser', function(req, res) {
	console.log('RECEIVED')
	// console.log(req.body)
	let url = 'mongodb://localhost:27017/ribrary'
	mongoose.connect(url, (err, db) => {
		if(err) console.log('Unable to connect to the server', err)
		else {
			console.log('Connection Established')
			let collection = db.collection('users')

			const newUser = {
				id: uuidv1(),
				username: req.body.username,
				password: req.body.password,
				usercode: req.body.usercode,
			}

			collection.insert([newUser], (err, result) => {
				if(err) console.log(err)
				else console.log('added new user')
			})

			db.close()
		}
	})
})

router.get('/users', function(req, res) {
	let url = 'mongodb://localhost:27017/ribrary'
	mongoose.connect(url, (err, db) => {
		if(err) console.log('Unable to connect to the server', err)
		else {
			console.log('Connection Established')
			let collection = db.collection('users')

			collection.find({}).toArray((err, result) => {
				if(err) res.send(err)
				else if(result.length) res.send(result)
				else res.send('No documents found')

				db.close()
			})
		}
	})
	// var MongoClient = mongodb.MongoClient

	// var url = 'mongodb://localhost:27017/sample'
	// MongoClient.connect(url, function(err, db) {
		// if(err) {
		// 	console.log('Unable to connect to the server', err)
		// } else {
		// 	console.log('Connection Established')
		// 	console.log(db.model)
		// 	return 0
		// 	// var collection = db.collection('students')

		// 	collection.find({}).toArray(function(err, result) {
		// 		if(err) {
		// 			res.send(err)
		// 		} else if(result.length) {
		// 			res.send('studentList')
		// 		} else {
		// 			res.send('No documents found')
		// 		}

		// 		db.close()
		// 	})
		// }
	// })
})

module.exports = router;
