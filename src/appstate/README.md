# Gestionnaire d'état de Smartsplit "App State"

Le fondement principal du gestionnaire d'état est que tous les objets ne doivent être obtenu _que_ par le store lui-même. Cela permet aux classes observables de faire l'entretien nécessaire pour garder trace de tous les objets créés.

Par exemple: les utilisateurs. Pour créer un utilisateur, il faut passer par `store.users.create()`, qui va retourner un objet `User`. Celui-là est lié au `UserList` depuis lequel `create()` a été créé, ce qui fait que lorsque l'utilisateur sera enregistré, il sera automatiquement ajouté à `store.users`. Le résultat est que l'état du système est toujours consistante.

# Utilisation dans React

Pour accéder au state dans React, il faut utiliser l'un des hooks dans le fichier `./react.js`.

## useStore()

Retourne le store appartenant au context React actuel. Retourne le `store`.

## useStorePath(...path)

Retourne une branche du store, en surveillant chaque objet dans le chemin pour les changements de sorte à toujours avoir un objet à jours.

Par exemple:

```js
const userData = useStorePath("auth", "user", "data")
```

Ici, `userData` sera mis à jours à chaque fois que l'utilisateur authentifié (le `user` dans `auth`) et à chaque fois que le `data` dans le `user` change, capturant ainsi tous les changements possibles.

Si la valeur retournée est inchangée, alors le hook ne cause pas un rafraichissement.

## useSubpath(root, ...path)

Fonctionne comme `useStorePath`, sauf que l'on passe un autre observable comme premier argument. Peut être utile par exemple pour faire:

```js
const auth = useStorePath("auth")
const user = useSubpath(auth, "user", "data")
```

Le comportement sera ainsi le même qu'avec `useStorePath("auth", "user", "data")`, sauf que l'on peut surveiller un objet que l'on surveille déjà au lieu de toujours passer par le chemin absolu.
