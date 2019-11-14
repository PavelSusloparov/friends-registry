#!/bin/bash -ea

GRAPHQL_URI="${GRAPHQL_PROTOCOL}://${GRAPHQL_HOST}/graphql"

echo "Fetching Schema from ${GRAPHQL_URI}"
npx apollo client:download-schema --endpoint=${GRAPHQL_URI} src/client/generated/graphql/generatedSchema.json
echo "Apollo Codegen generating Typescript types"
npx apollo client:codegen --target=typescript --localSchemaFile=src/client/generated/graphql/generatedSchema.json --includes='./src/**/*.{ts,tsx}' --addTypename --tagName=gql --globalTypesFile=src/client/generated/graphql/graphqlGlobalTypes.ts --outputFlat src/client/generated/graphql/generatedTypes.ts
