node {
	def image

	stage("Mise à jours du dépôt git") {
		checkout scm
	}

	stage("Création de l'image Docker") {
		image = docker.build("smartsplit-client:${env.BUILD_ID}")
	}

	stage("Publication de l'image Docker") {
		docker.withRegistry("https://docker-registry.smartsplit.org", "SmartSplit Docker") {
			image.push("${env.BUILD_ID}")
			image.push("preproduction")
		}
	}

	stage("Déploiement de la nouvelle image") {
		build job: "SmartSplit DEV Déploiement"
	}
}
