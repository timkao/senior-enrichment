'use strict';

// Require all the models
	// Running each model (i.e. table) module (i.e. file) registers each model into our sequelize db so any other part of the application could call db.model('user') OR db.models.user to get access to the `user` model.
	// This works if we all use the same Sequelize instance (instantiated in and exported from `/db/index.js`)
	// This is an acceptable pattern but it does have limitations in that if you change the name of the model you will have to change every time it is required everywhere

// This is also probably a good place for you to set up your associations
const Student = require('./Student')
const Campus = require('./Campus')

Student.belongsTo(Campus)
Campus.hasMany(Student)

const seed = function() {
	Promise.all([
		Student.create({name: 'Tim', email: 'tim.kao@iese.net'}),
		Student.create({name: 'Peggy', email: 'peggy.ho@iese.net'}),
		Student.create({name: 'John', email: 'john.lee@nyc.net'}),
		Student.create({name: 'Piper', email: 'piper.huang@taipei.com'}),
		Student.create({name: 'Elyisa', email: 'elyisa.chang@iphone.com'}),
		Campus.create({name: 'IESE', image: '/iese.jpg'}),
		Campus.create({name: 'Taipei', image: '/taipei.jpg'}),
		Campus.create({name: 'NYC', image: '/nyc.jpg'}),
		Campus.create({name: 'Titan', image: './giant.jpg'})
	])
	.then(([tim, peggy, john, piper, elysia, iese, taipei, nyc, titan]) => {
		return Promise.all([
			tim.setCampus(iese),
			peggy.setCampus(iese),
			john.setCampus(nyc),
			piper.setCampus(taipei),
			elysia.setCampus(titan)
		])
	})
}

module.exports = {
	Student,
	Campus,
	seed
}
