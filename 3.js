const request = require('request')
const cheerio = require('cheerio')
const levenstein = require('fast-levenshtein')
const word = 'article'
request('https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000018837899&dateTexte=', (error, response, body) => {
	const $ = cheerio.load(body)
	//method 1
	const method1Timer = new Date()
	const words = $($('body').text().replace().replace(/(\n|\s|\r|\t)(\n|\s|\r|\t)+/g, ' ').trim()).text().trim().split(/\b/)
	const match = words.map(e => {
		let lev = levenstein.get(e.toLowerCase(), word)
		if (lev <= 3) {
			return [e, lev]
		} else {
			return 0
		}
	}).reduce((acc, val) => val?(acc+1):acc, 0)
	const method1TimerEnd = new Date() - method1Timer
	console.log(`La 1ère méthode utilisant la distance de levenstein trouve ${match} match en ${method1TimerEnd} millisecondes`)
	//method 2
	const method2Timer = new Date()
	const match2 = $('body').text().match(/articles?/gi).length
	const method2TimerEnd = new Date() - method2Timer
	console.log(`La 1ère méthode n'utilisant pas la distance de levenstein trouve ${match2} match en ${method2TimerEnd} millisecondes`)
});