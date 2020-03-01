OpenApi synchronisation (openapi-ts-sync)
=======================
UNDER DEVELOPMENT
# Description
This script will fetch a remote `openapi.json`
and creates the schemas and a services
to have a nice typescript support for schema properties
and available remote endpoints.

## Table Of Contents
 - [Description](#description)
 - [Intent](#intent)
 - [Installation](#installation)
 - [Command](#command)
    - [Run with npm](#run-with-npm)
    - [Options](#options)

# Installation
```
$ npm install openapi-typescript-sync --save-dev
```

# Todo
- [ ] write tests
- [ ] add header parameters as header parameters, now the authorization
      must be placed as a parameter, which does nothing and as AxiosRequestOptions.

# Command
```
$ npm run bin/openapi-typescript-sync --schema-dir={{ schema-dir }} --route-dir={{ route-dir }}
```
## Run with npm
Add the script to your package.json file:
```json
{
  ...
  "scripts": {
     ...,
     "api-sync": "npm run bin/openapi-typescript-sync --config=./openapi-ts-sync.json",
     ...,
  },
  ...
}
```
## Config
TODO: Document
## Generators
TODO: Document

### Custom Generator
A custom generator is simple a class implementing the interface `GeneratorInterface`.  
```typescript
import {GeneratorInterface} from './GeneratorInterface';

export class CustomGenerator implements GeneratorInterface{

	public generate(): Promise<void>{
	    return new Promise<void>((resolve, reject) => {
	    	// code to generate something
        });
    }
}
```
