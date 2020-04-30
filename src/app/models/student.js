const db = require("../../config/db")
const { age, date, grade} = require('../lib/utils')
const Intl = require("intl")

module.exports = {
  all(callback) {
    db.query(`SELECT * FROM students ORDER BY name ASC`, (err, results) => {
      if(err) throw `Database error! ${err}`

      callback(results.rows)
    })
  },

  create(data, callback) {
    const query = `
    INSERT INTO students (
      avatar_url,
      name,
      email,
      birth,
      school_year,
      total_hours,
      created_at
    ) VALUES  ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id
    `
    const values = [
      data.avatar_url,
      data.name,
      data.email,
      date(data.birth).iso,
      data.school_year,
      data.total_hours,
      date(Date.now()).iso,
    ]

    db.query(query, values, (err,results) => {
      if(err) throw `Database error! ${err}`

      callback(results.rows[0])
    })
  },

  find(id, callback) {
    console.log(`ID is: ${id}`)    

    db.query(`SELECT * FROM students WHERE id=$1`, [id], (err, results) => {
      if(err) throw `Database error! ${err}`

      callback(results.rows[0])

    }) 
  },

  update(data, callback) {
    console.log(data)

    const query = `
    UPDATE students SET
      avatar_url=($1),
      name=($2),
      email=($3),
      birth=($4),
      school_year=($5),
      total_hours=($6)
    WHERE id= $7
    `
    const values = [
      data.avatar_url,
      data.name,
      data.email,
      date(data.birth).iso,
      data.school_year,
      data.total_hours,
      data.id
    ]

    db.query(query, values, (err, results) => {
      if(err) throw `Database error! ${err}`

      callback()
    })
  },

  delete(id, callback) {
    db.query(`DELETE FROM students WHERE id = $1`, [id], (err, results) => {
      if(err) throw `Database error! ${err}`

      return callback()
    })
  }
}