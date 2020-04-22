const { age, date, grade} = require('./src/lib/utils')
const Intl = require("intl")

module.exports = {
  index(req, res) {
    return res.render("students/index")
  },

  create(req, res) {
    return res.render("students/create")
  },

  post(req, res) {
    const keys = Object.keys(req.body) //it will be an array of the keys of the object

    //* Checando se todos os campos estão preenchidos
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Please, fill all the gaps")
      }
    }

    const query = `
    INSERT INTO teachers (
      avatar_url,
      name,
      birth_date,
      education_level,
      class_type,
      subjects_taught,
      created_at
    ) VALUES  ($1, $2, $3, $4, $5, $6)
    RETURNING id
    `
    const values = [
      req.body.avatar_url,
      req.body.name,
      req.body.birth_date,
      req.body.education_level,
      req.body.class_type,
      req.body.subjects_taught,
    ]


  },

  edit(req, res) {
    return
  },

  show(req, res) {
    return
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