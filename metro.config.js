const { getDefaultConfig } = require("metro-config");

async function makeConfig()  {
	const {
		resolver: { sourceExts, assetExts }
	} = await getDefaultConfig();
	
	return {
		transformer: {
			getTransformOptions: async function() {
				return {
					transform: {
						experimentalImportSupport: false,
						inlineRequires: false
					}
				}
			},
			babelTransformerPath: require.resolve("react-native-svg-transformer")
		},
		resolver: {
			assetExts: assetExts.filter(ext => ext !== "svg"),
			sourceExts: [...sourceExts, "svg"]
		}
	}
}

module.exports = makeConfig()
