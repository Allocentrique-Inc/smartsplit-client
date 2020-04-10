const createExpoWebpackConfigAsync = require("@expo/webpack-config")

module.exports = async function (env, argv) {
	const config = await createExpoWebpackConfigAsync(env, argv)

	if (!config.devServer) config.devServer = {}

	config.devServer.disableHostCheck = true

	// SVG transform fix
	for (let rule of config.module.rules) {
		if (!rule.oneOf) continue

		for (let one of rule.oneOf) {
			if (!one.test || !one.test.test("/test/test.svg")) continue

			rule.oneOf.unshift({
				test: /\.svg$/,
				exclude: /node_modules/,
				use: [{ loader: "@svgr/webpack" }],
			})

			break
		}
	}

	return config
}
