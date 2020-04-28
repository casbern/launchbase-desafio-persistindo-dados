const db = require("../../config/db")
const { age, date, grade} = require('../lib/utils')
const Intl = require("intl")

module.exports = {
  all(callback) {
    db.query(`SELECT * FROM teachers`, (err, results) => {
      if(err) throw res.send `Database error! ${err}`

      callback(results.rows)
    })
  },

  create(data, callback) {
    const query = `
    INSERT INTO teachers (
      avatar_url,
      name,
      birth,
      scholarity,
      class_type,
      services,
      created_at
    ) VALUES  ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id
    `
    const values = [
      data.avatar_url,
      data.name,
      date(data.birth).iso,
      data.scholarity,
      data.class_type,
      data.services,
      date(Date.now()).iso,
    ]

    db.query(query, values, (err,results) => {
      if(err) throw `Database error! ${err}`

      callback(results.rows[0])
    })
  },

  find(id, callback) {
    console.log(`ID is: ${id}`)    

    db.query(`SELECT * FROM teachers WHERE id=$1`, [id], (err, results) => {
      if(err) throw `Database error! ${err}`

      callback(results.rows[0])

    }) 
  },

  update(data, callback) {
    const query = `
    UPDATE teachers SET
    avatar_url=($1),
    name=($2),
    birth=($3),
    scholarity=($4),
    class_type=($5),
    services=($6),
    `
  }
}