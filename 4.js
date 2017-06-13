const api4=require('./4-api.js')

api4.getContent('JORFTEXT000018837899&dateTexte=', (content) => {
	console.log(content)
})