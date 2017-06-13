const request = require('request')
const cheerio = require('cheerio')
request('https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000018837899&dateTexte=', (error, response, body) => {
	const $ = cheerio.load(body)
	const result = $('h2').map((i, e) => $(e).text().match(/Ecole nationale de la magistrature/g).length).toArray().reduce((a, b) => a + b)
	console.log(result)
});