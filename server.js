const express = require('express')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const hBars = require('express-handlebars')
const jwt = require('jsonwebtoken')
const { saveUser, getUsers } = require('./DB/consults')


const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const secretKey = 'passsword'

app.listen(3000, _ => console.log('Server running at: http://localhost:3000'))



app.use("/css", express.static(__dirname +
  "/node_modules/bootstrap/dist/css"));
app.use('/jquery', express.static(__dirname +
  '/node_modules/jquery/dist'))
app.use('/axios', express.static(__dirname +
  '/node_modules/axios/dist'))

app.use( fileUpload({
  limits: { fileSize: 5000000 },
  abortOnLimit: true,
  responseOnLimit: "El peso del archivo que intentas subir supera el limite permitido",
  })
)


app.set('view engine', 'handlebars')
app.engine('handlebars', hBars({
  layoutsDir: __dirname + '/views',
  partialsDir: __dirname + '/views/partials'
}))
app.get('/', (req, res) => {
  res.render('Menu', { layout: 'Menu', urlHome: req.route.path })
})
app.get('/login', (req, res) => {
  res.render('Menu', { layout: 'Menu', urlLogin: req.route.path})
})
app.get('/admin', (req, res) => {
  res.render('Menu', { layout: 'Menu', urlAdmin: req.route.path })
})
app.get('/admin', (req, res) => {
  res.render('Admin', { layout: 'Admin'})
})

//consultas
app.post("/user", async(req,res) => {
  const { email, nombre, password } = req.body
  const response = await saveUser(email, nombre, password)

  res.send(response)
})

app.get('/users', async(req, res) => {
  const response = await getUsers()
  res.send(response)
})

app.get('/login', async(req, res) => {
  const { email, password } = req.query
  const users = await getUsers()
  const user = users.find((u) => u.email == email && u.password == password)
  if (user.password == password && user.auth == true) {
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 120,
        data: user,
      },
      secretKey
    )
    res.send(token)
  } else {
    res.send('usuario o contraseña incorrecta')
  }
})
app.get("/evidencias/:email", async function(req,res){
  const { email } = req.params
  const users = await getusers()
  const user = users.find((u) => u.email == email);
  if(user){
    seccion = usuario.nombre
    url = usuario.email
    res.render("Menu", {
      layout: "Menu",
      nombre: seccion,
      urlevidencias: req.route.path
    })
  }
})