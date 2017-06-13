const express = require('express')
const app = express()
const api4 = require('./4-api.js')

const port = 8081
const hostname = 'localhost'
const defaultLandingPage = 'Veuillez choisir une url valide comme <a href="/getContent/JORFTEXT000018837899&dateTexte="> /getContent/JORFTEXT000018837899&dateTexte=</a>'

app.get('/getContent/:cidTexte', (req, res) => {
	api4.getContent(req.params.cidTexte, (cidtexte) => {
		res.send(cidtexte)
	})
})

app.get('/', (req, res) => {
	res.send(defaultLandingPage)
})

var server = app.listen(port, hostname, function() {
	console.log(`Example app listening at http://${hostname}:${port}`)

})