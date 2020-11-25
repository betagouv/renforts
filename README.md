# renforts

Mise à disposition d'agents pour venir en renfort d'une administration qui a des besoins accrus en cas de crise. Première utilisation : contact tracing contre le Covid

## Lancer en dev

```
npm run dev
```

## Lancer en prod

```
npm start
```

Ce repo contient tout ce qu'il faut pour tourner sur Scalingo. Il suffit de déployer la branche main sur votre instance Scalingo.

## Tester que le HTML d'un site est valide

```
npm run checkHTML --  <url du site à tester>
```

Si on veut checker pour une PR donnée, utiliser l'url de la review app de la PR (voir les checks dans la PR).

Pour valider le code en local :

```
npm run checkHTMLLocal
```

## Utiliser le linter et formatter dans VSCode

Ce repo contient des fichiers de config pour prettier et eslint.
Dans VSCode, installer les plugins prettier et eslint, et redémarrer VSCode. Il faudra peut etre aussi approuver des popups d'autorisation.
