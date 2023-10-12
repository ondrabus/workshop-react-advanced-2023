import { generateModelsAsync, textHelper } from '@kontent-ai/model-generator'
import { rmSync, mkdirSync } from 'fs'

import * as dotenv from 'dotenv'
dotenv.config()

const fixNumberPrefixElementResolver = (elementName: string): string => {
	if (elementName[0] >= '0' && elementName[0] <= '9') {
		return `_${elementName}`
	}
	return elementName
}

const runAsync = async () => {
	rmSync('./src/models', { recursive: true })
	mkdirSync('./src/models')

	// change working directory to models
	process.chdir('./src/models')

	await generateModelsAsync({
		sdkType: 'delivery',
        environmentId: process.env.KONTENT_ENVIRONMENT_ID ?? '',
        apiKey: process.env.KONTENT_API_KEY ?? '',
        addEnvironmentInfo: false,
		addTimestamp: false,
		isEnterpriseSubscription: true,
		elementResolver: (type, elementName) => `${fixNumberPrefixElementResolver(textHelper.toCamelCase(elementName))}`,
		contentTypeFileResolver: type => `${textHelper.toPascalCase(type.codename)}Model`,
		contentTypeResolver: type => `${textHelper.toPascalCase(type.codename)}Model`,
		taxonomyTypeResolver: type => `${textHelper.toPascalCase(type.codename)}`,
	})
}

// Self-invocation async function
;(async () => {
	await runAsync()
})().catch(err => {
	console.error(err)
	throw err
})
