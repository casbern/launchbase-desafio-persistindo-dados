const { age, date} = require('../lib/utils')
const Teacher = require("../models/teacher")

module.exports = {
  index(req, res) {

    const {filter} = req.query

    if(filter) {
      Teacher.findBy(filter, function(teachers) {
        return res.render("teachers/index", { teachers, filter })
      })
    } else {
      Teacher.all((teachers) => {
        return res.render("teachers/index", {teachers})
      })
    }
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
      

      return res.render("teachers/edit", {
        teacher,
        options: {
          high_school: "Ensino Médio Completo",
          higher_education: "Ensino Superior Completo",
          master_degree: "Mestrado",
          doctorate_degree: "Doutorado"
        }
      })
    })
  },

  show(req, res) {
    console.log("teachers controller show() was  called")

    Teacher.find(req.params.id, (teacher) => {
      if(!teacher) return res.send("Teacher was not found!")

      if(!(teacher.avatar_url.startsWith('http://') || teacher.avatar_url.startsWith('https://') )) {
        return res.status(404).send("Teacher does not have a correct avatar_url!")
      }

      teacher.age = age(teacher.birth)
      teacher.services = teacher.services.split(",")
      teacher.created_at = date(teacher.created_at).format

     return res.render("teachers/show", {
       teacher, 
      options: {
      high_school: "Ensino Médio Completo",
      higher_education: "Ensino Superior Completo",
      master_degree: "Mestrado",
      doctorate_degree: "Doutorado"
    } })
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
    
    Teacher.update(req.body, () => {
      return res.redirect(`/teachers/${req.body.id}`)
    })
  }, 

  delete(req, res) {
    Teacher.delete(req.body.id, () => {
      return res.redirect(`/teachers`)
    }) 
  }
}