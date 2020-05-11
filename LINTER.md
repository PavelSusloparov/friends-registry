# Eslint

Project uses 'Eslint' as a linter.
'Eslint' is using 'Esprima' as a parser for server component and 'babel-eslint' as a parser for client component.
'Prettier' is a linter plugin.

To run the linter against `client` component
```bash
cd client
npx eslint .
```

To auto-fix linter errors against `client` component
```bash
cd client
npx eslint --fix .
```

To run the linter against `server` component
```bash
cd server
npx eslint .
```

To auto-fix linter errors against `server` component
```bash
cd server
npx eslint --fix .
```
