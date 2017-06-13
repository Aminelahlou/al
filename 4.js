const request = require('request')
const cheerio = require('cheerio')
request('https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000018837899&dateTexte=', (error, response, body) => {
	const $ = cheerio.load(body)
	$('#exportRTF').remove()
	const result = $('.data').text().replace(/(\n|\s|\r|\t)(\n|\s|\r|\t)+/g, '\n\n').trim()
	console.log(result)
});