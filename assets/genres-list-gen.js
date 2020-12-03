const fs = require("fs")
const lineReader = require("line-reader")
let genres = []
let ids = 0
lineReader.eachLine("genres.txt", (line, last) => {
	ids++

	//if (ins.description && !last) return
	let genre = {
		id: ids,
		name: line.trim(),
	}

	genres.push(genre)
	if (last) {
		genres.sort((a, b) => (a.name < b.name ? -1 : 1))
		try {
			fs.writeFileSync(
				"genres-smartsplit.json",
				JSON.stringify(genres, null, 2)
			)
		} catch (err) {
			console.error(err)
		}
		console.log(`processed ${genres.length} genres`)
		//console.log(JSON.stringify(ins, null, 2))
	}
})
