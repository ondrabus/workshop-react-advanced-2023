import { createDeliveryClient } from '@kontent-ai/delivery-sdk'
import { Handler } from '@netlify/functions'
import { FlightModel } from '../models/content-types'
import { contentTypes } from '../models'

const handler: Handler = async (event, context) => {

    if (Math.random() > 0.2){
        return {
            statusCode: 500,
        }
    }

    const deliveryClient = createDeliveryClient({
        environmentId: process.env.KONTENT_ENVIRONMENT_ID ?? ''
    })
    const flights = (await deliveryClient
        .items<FlightModel>()
        .type(contentTypes.flight.codename)
        .limitParameter(3)
        .toPromise()).data

    return {
        statusCode: 200,
        body: JSON.stringify(flights),
        headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, OPTION",
      },
    }
}

export { handler }
