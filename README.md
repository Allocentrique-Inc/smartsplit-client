# SmartSplit MVP

## Lancer le projet

Pour lancer le projet, il suffit d'installer les dépendances et d'exécuter le script de démarrage avec [yarn](https://yarnpkg.com/)

```sh
# Installation des dépendances
~$ yarn install

# Copie de la configuration par défaut
~$ cp config.default.js config.js

# Démarrage du serveur de développement (natif et web)
~$ yarn start --web

# (ou pour le web seulement)
~$ yarn start --web-only

# (ou pour le natif seulement)
~$ yarn start
```

## Fusionner les branches

```
# git fetch
# git merge origin/rewrite-expo
```

## Style de code

En ce moment, le style de code à suivre n'est pas très défini. En général, la règle est simple: on veut que ça soit facile à lire, facile à comprendre, et facile à maintenir.

- Tabs pour indentation, espaces pour alignment. De cette façon, on peut ajuster la taille de l'indentation au besoin.
- Pas de `;` - ils sont optionnels en JavaScript et réduit la charge visuelle du code
  - Dans les cas ou une ligne commence avec `[` ou `(`, il faut commencer la ligne avec `;`. C'est la seule exception ou les `;` sont ambigus.
- Essayer de définir du plus générique au plus spécifique. Par exemple, la page, le header, le contenu, le footer, puis enfin les fonctions utilitaires.
- Considérer wrap à la colonne 80, éviter de dépasser 120 le plus possible.

## Organisation des fichiers

- `/`: Contiens les fichiers de premier niveau. Fichiers de configurations divers, point d'entrée principal. En général, éviter de mettre les choses ici lorsque possible.
  - `/assets`: les resources externes au code source. En ce moment, splash screen, polices.
  - `/src`: tout ce qui est code source dans le monde React/Native/JavaScript
  - `App.js`: point d'entrée système de l'application. Charger les trucs essentiels de base et lancer l'application dans `/src/index.js`.

### Organisation des composantes et fichiers source

Les fichiers sont généralement organisés des plus génériques/souvent utilisés près de la racine, au plus spécifique/spécialisé en profondeur des dossiers.

Par exemple: `text.js` et `layout.js` sont des composantes si fondamentales qu'il est très rare qu'on ne veuille pas les utiliser. Ils sont donc directement dans `/src`.

Pareillement, un sélecteur d'ayant droit est spécifique à un système en particulier dans SmartSplit. Il est donc dans `/src/smartsplit/rightholders/select`.

Les choses reliées entre-elles sont généralement groupées dans le même dossier. Par exemple, une icone SVG très spécifique à une section du site fait plus de sens à côté du fichier qui l'utiliser que de faire l'allé retour vers la racine puis un dossier spécifique dans les assets.

Actuellement, ça ressemble donc à ça:

- `/forms`: toutes les composantes qui ont rapport avec des entrées utilisateur: champs texte, mot de passe, select, dropdown, cases à cocher, etc.
- `/layout`: tout ce qui est layout de page majeur
  - `dashboard.js`: le layout d'une page style "dashboard". Fournis le menu à gauche/en bas et la barre de profil.
  - ... futurs layout dans les autres flots, par exemple navbar avec progression dans "Documente ton Oeuvre"
- `/pages`: Le point d'entrée de toutes les pages. Généralement une relation 1:1 avec les routes.
  - `/dashboard`: Les pages du tableau de board (attention: pas les pages qui utilisent le layout dashboard)
  - `/tests`: Pages utilisées pour tester les composantes. Showcase d'un groupe de composantes, comme tous les champ formulaires.
- `/smartsplit`: toutes les sous-composantes qui sont spécifiques aux fonctionnalités et systèmes de SmartSplit: artistes, média, ayant droits, oeuvres.
  - `/artist`
  - `/media`
  - `/rightholders`
  - `/user`
  - `/works`
- `/styles`: feuilles de style globales (TODO: considéréer intégrer à layout/forms/widgets?)
- `/svg`: Collection d'icones SVG génériques/communes
- `/widgets`: Boutons, barre d'onglets, dropdowns, modales, barres de progression et autres éléments d'interface de base.
- `/layout.js`: Les composantes de layout, pour organiser les composantes avec les dimensions et espacements de la charte de design
- `/text.js`: Affichage du texte avec les styles globaux pour l'application
- `/portals.js`: Téléporter des éléments React, pour faire des overlay.
- `/theme.js`: Toutes les valeurs et constantes du thème global: Couleurs, Métriques, Polices, Espacements.
- `/index.js`: Point d'entrée dans le monde applicatif de SmartSplit.

## Système de layout

Afin de bien respecter la charte du design sur [ZeroHeight](http://design.smartsplit.org/) et [Figma](https://www.figma.com/file/bNFAb0kdHfrqFGVpcuH2X78E/Smartsplit), un système de layout a été fait de sorte à ce que tout s'aligne automagiquement exactement aux spécifications, facilement.

### Layer

À la base de toutes les autres composantes de layout, un `<Layer>` est simplement une `<View>` qui accepte les divers raccourcis de formattage de SmartSplit:

| Prop      | Type      | Description                                                                                                                                                                                                                                         |
| --------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `margin`  | string    | Nom de type de marge à avoir. Par exemple, `group` pour avoir une marge représentant un groupe de composantes.                                                                                                                                      |
| `padding` | string    | Nom de type de padding à avoir. Par exemple, `group`.                                                                                                                                                                                               |
| `of`      | string    | Nom du type d'espacement désiré entre les composantes. Par exemple, `<Row of="components">` pour obtenir une ligne de composantes avec espacement de 8px entre chaque. Sématiquement: le type/grade de composante qui sera utilisée dans le layout. |
| `layer`   | string    | Le nom de la couche d'interface à utiliser. Par défaut, aucune. Permets par exemple d'utiliser le style `"underground"` ou `"overground"` tel que défini dans le document de design.                                                                |
| `flex`    | integer   | Poid de la vue dans son parent. Raccourcis pour `style={{flex: N}}`                                                                                                                                                                                 |
| `spacer`  | Component | Composante React à utiliser pour les espaceurs entre les composantes. Par défaut, une vue vide. Peut être utilisé pour espacer avec des lignes ou autres composantes.                                                                               |
| ...props  | ...       | Le reste des props sont passées à `<View>` directement.                                                                                                                                                                                             |

### Spacer

Un espaceur qui ne prend qu'une propriété, `of`, correspondant à la taille d'espacement (vertical et horizontal) désirée. Principalement utilisé par `Layer` pour espacer les composantes.

### Hairline

Une ligne fine, utilisée comme espaceur dans une colonne pour créer l'espacement visuel dans une liste.

### Flex

Un alias pour `<Layer flex={1}>`. Principalement utilisé comme espaceur dynamique entre d'autres composantes. Par exemple:

```jsx
// Crée un layout de style [<                >]
<Row of="component">
	<ArrowLeft />
	<Flex />
	<ArrowRight />
</Row>
```

### Column, Row

Représente une colonne et une ligne de composantes, respectivement. Permet d'exprimer un layout facilement sur les deux axes avec tout espacement pris en charge intuitivement. Par exemple:

```jsx
{
	/* Définis une section contenant deux groupes de composantes (visuellement espacées) */
}
;<Column of="group">
	{/* Définis un groupe vertical de composantes, content d'autres composantes */}
	<Column of="component">
		{/* Une ligne de deux champs côte à côte */}
		<Row of="component">
			<TextField label="Prénom" />
			<TextField label="Nom" />
		</Row>
		<TextField label="Courriel" />

		{/* L'espacement entre Prénom et Courriel sera la même qu'entre Prénom et Nom */}
	</Column>

	{/* Un autre groupe de composantes */}
	<Column of="component">{/* ... */}</Column>
</Column>
```

### Section, Group

Composantes purement sématiques ayant des valeurs sensées par défaut pour `margin`, `padding`, `of` et `layer` dans le contexte.

Par exemple, `<Section>` est l'équivalent de `<Column of="group" margin="section">`.
