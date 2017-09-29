const db = require('../index')
const Sequelize = require('sequelize')
const toon = require('cartoon-avatar')


const Student = db.define('student', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  }
}, {
  getterMethods: {
    avatar() {
      const genderDecider = Math.random()
      return toon.generate_avatar({"gender":  genderDecider < 0.5 ? 'male' : 'female', id: this.id})
    }
  }
})

module.exports = Student
