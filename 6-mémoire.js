const express = require('express')
const app = express()
const api4 = require('./4-api.js')

const port = 8081
const hostname = 'localhost'
const defaultLandingPage = 'Veuillez choisir une url valide comme <a href="/getContent/JORFTEXT000018837899&dateTexte="> /getContent/JORFTEXT000018837899&dateTexte=</a>'
let cache = []

app.get('/getContent/:cidText', (req, res) => {
	let data = cidTextExists(req.params.cidText, cache)
	if (data.length) {
		data = data[0].content
		res.send(data)
		console.log('the content of this page was cached in memory')
		console.log('cache')
	} else {
		api4.getContent(req.params.cidText, (content) => {
			cache.push({
				cidText: req.params.cidText,
				content: content
			})
			console.log('the content of this page was not cached in memory')
			res.send(content)
		})
	}
})

app.get('/', (req, res) => {
	res.send(defaultLandingPage)
})

var server = app.listen(port, hostname, function() {
	console.log(`Example app listening at http://${hostname}:${port}`)

})

function cidTextExists(cidText, cidTexts) {
	return cidTexts.filter((e, i, arr) => e.cidText == cidText)
}