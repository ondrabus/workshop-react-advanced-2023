import { createDeliveryClient } from '@kontent-ai/delivery-sdk'
import { Handler } from '@netlify/functions'
import { FlightModel } from '../models/content-types'
import { contentTypes } from '../models'

const handler: Handler = async (event, context) => {

    const deliveryClient = createDeliveryClient({
        environmentId: process.env.KONTENT_ENVIRONMENT_ID ?? ''
    })

    const page = Number(event.queryStringParameters?.page ?? 0)
    
    const flights = (await deliveryClient
        .items<FlightModel>()
        .type(contentTypes.flight.codename)
        .limitParameter(3)
        .skipParameter(page*3)
        .includeTotalCountParameter()
        .toPromise()).data

    return {
        statusCode: 200,
        body: JSON.stringify(flights)
    }
}

export { handler }