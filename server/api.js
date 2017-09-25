'use strict'
const api = require('express').Router()
const db = require('../db')
const Student = require('../db/models').Student
const Campus = require('../db/models').Campus


// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
	// I know this because we automatically send index.html for all requests that don't make sense in our backend.
	// Ideally you would have something to handle this, so if you have time try that out!
api.get('/hello', (req, res) => res.send({hello: 'world'}))
api.get('/campuses', (req, res) => {
	Campus.findAll({
		order: ['id'],
		include: [Student]
	})
	.then( campuses => {
		res.send(campuses)
	})
})

api.post('/campuses', (req, res) => {
	Campus.create(req.body)
	.then( campus => {
		res.send(campus)
	})
})


api.delete('/campus/:id', (req, res, next) => {
	const id = Number(req.params.id)
	Campus.destroy({ where: { id } })
	.then(() => res.status(204).end())
	.catch(next);
})

api.get('/students', (req, res) => {
	Student.findAll({
		order: ['id'],
		include: [Campus]
	})
	.then( students => {
		res.send(students)
	})
})

api.delete('/student/:id', (req, res, next) => {
	const id = Number(req.params.id)
	Student.destroy({ where: { id } })
	.then(() => res.status(204).end())
	.catch(next);
})

api.put('/student/:studentId', (req, res, next) => {
	const id = Number(req.params.studentId)
	Student.findById(id)
	.then( student => {
		if (req.body.campusId === 0) {
			student.campusId = null
		}
		else {
			student.campusId = req.body.campusId
		}
		student.email = req.body.email
		return student.save()
	})
	.then( updatedStudent => {
		res.send(updatedStudent)
	})
	.catch(() => {
		res.send('wrong')
	})

})

api.post('/student', (req, res, next) => {
	Student.create(req.body)
	.then( student => {
		res.send(student)
	})
	.catch(() => {
		res.send('wrong')
	})
})


module.exports = api
