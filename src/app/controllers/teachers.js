const { age, date, grade} = require('../lib/utils')
const Teacher = require("../models/teacher")
const Intl = require("intl")

module.exports = {
  index(req, res) {
    Teacher.all((teachers) => {
      return res.render("teachers/index", {teachers})
    })
  },

  create(req, res) {
    return res.render("teachers/create", {
      options: {
        high_school: "Ensino Médio Completo",
        higher_education: "Ensino Superior Completo",
        master_degree: "Mestrado",
        doctorate_degree: "Doutorado"
      }
    })
  },

  post(req, res) {
    console.log(req.body)

    const keys = Object.keys(req.body) //array com as keys do objeto

    //* Checando se todos os campos estão preenchidos
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Please, fill all the gaps")
      }
    }

    Teacher.create( req.body, (teacher) => {
      return res.redirect(`/teachers/${teacher.id}`)
    })
  },

  edit(req, res) {
    Teacher.find(req.params.id, (teacher) => {
      if(!teacher) return res.send("Teacher was not found!")

      teacher.birth = date(teacher.birth).iso
      

      return res.render("teachers/edit", {teacher})
    })
  },

  show(req, res) {
    Teacher.find(req.params.id, (teacher) => {
      if(!teacher) return res.send("Teacher was not found!")

      teacher.age = age(teacher.birth)
      teacher.services = teacher.services.split(",")
      teacher.created_at = date(teacher.created_at).format

      return res.render("teachers/show", {teacher})
    })
  },

  put(req, res) {
    const keys = Object.keys(req.body) //it will be an array of the keys of the object

    //* Checando se todos os campos estão preenchidos
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Please, fill all the gaps")
      }
    }
    return
  },

  delete(req, res) {
    return
  }
}