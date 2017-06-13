const request = require('request')
const cheerio = require('cheerio')
module.exports.getContent = function(cidTexte, callback) {
	request(`https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=${cidTexte}`, (error, response, body) => {
		const $ = cheerio.load(body)
		$('#exportRTF').remove()
		const result = $('.data').text().replace(/(\n|\s|\r|\t)(\n|\s|\r|\t)+/g, '\n\n').trim()
		callback(result)
	})
}