const createExpoWebpackConfigAsync = require('@expo/webpack-config')

module.exports = async function(env, argv) {
	const config = await createExpoWebpackConfigAsync(env, argv)
	
	if(!config.devServer)
		config.devServer = {}

	config.devServer.disableHostCheck = true

	return config;
}
