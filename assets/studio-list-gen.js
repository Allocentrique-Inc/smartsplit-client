const fs = require("fs")
const lineReader = require("line-reader")
let studios = []
let ids = 0
lineReader.eachLine("musicbrainz-place.json", (line, last) => {
	ids++
	let place = JSON.parse(line)
	if (!last && place.type !== "Studio") return
	//if (ins.description && !last) return
	let studio = {
		id: ids,
		name: place.name,
		muszId: place.id,
		type: "Studio",
		address: place.address,
	}
	if (place.relations) {
		place.relations.forEach((relation) => {
			switch (relation.type) {
				case "official homepage":
					studio.url = relation.url.resource
					break
			}
		})
	}

	studios.push(studio)
	console.log(`processing studio ${studio.name}`)
	if (last) {
		studios.sort((a, b) => (a.name < b.name ? -1 : 1))
		try {
			fs.writeFileSync(
				"studios-smartsplit.json",
				JSON.stringify(studios, null, 2)
			)
		} catch (err) {
			console.error(err)
		}
		console.log(`processed ${studios.length} studioas`)
		//console.log(JSON.stringify(ins, null, 2))
	}
})
