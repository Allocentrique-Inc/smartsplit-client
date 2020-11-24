const fs = require("fs")
const lineReader = require("line-reader")
let instruments = []
lineReader.eachLine("instruments-musz.json", (line, last) => {
	let ins = JSON.parse(line)
	//if (ins.description && !last) return
	let instrument = {
		name: ins.name,
		muszId: ins.id,
		description: ins.description,
		type: ins.type,
	}
	if (ins.relations) {
		ins.relations.forEach((relation) => {
			switch (relation.type) {
				case "wikidata":
					instrument.wikidata = relation.url
					break
			}
		})
	}
	let lang = { en: instrument.name }
	if (ins.aliases) {
		ins.aliases.forEach((alias) => {
			if (alias.locale) lang[alias.locale] = alias.name
		})
	}
	instrument.lang = lang
	instruments.push(instrument)
	if (last) {
		instruments.sort((a, b) => (a.name < b.name ? -1 : 1))
		try {
			fs.writeFileSync(
				"instruments-smartsplit.json",
				JSON.stringify(instruments, null, 2)
			)
		} catch (err) {
			console.error(err)
		}
		console.log(`processed ${instruments.length} instruments`)
		//console.log(JSON.stringify(ins, null, 2))
	}
})
