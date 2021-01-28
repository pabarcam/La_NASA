const { Pool } = require('pg')
const pool = new Pool({ user: 'paulo', host: 'localhost', password: 'password', database: 'nasa', port: 5432 })

const saveUser = async(email, nombre, password) => {
  try{
    const consult = await pool.query(
      `INSERT INTO users (email, nombre, password, auth) VALUES ('${email}', '${nombre}', '${password}', 'false') RETURNING *`)
    return consult.rows
  } catch(e) {
    return e
  }
}

const getUsers = async() => {
  try {
    const consult = await pool.query(`SELECT * FROM users ORDER BY id`)
    return consult.rows
  } catch (e) {
    console.log(e)
  return e
  }
}

module.exports = { saveUser, getUsers }