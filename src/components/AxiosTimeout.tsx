import { useEffect, useState } from "react"
import { FlightModel } from "../models/content-types"
import FlightLine from "./FlightLine"
import { Responses, createDeliveryClient } from "@kontent-ai/delivery-sdk"
import axios from "axios"

const AxiosTimeout: React.FC = () => {
    let [flights, setFlights] = useState<FlightModel[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const data = (await axios.get("/api/getFlightsSlow", { timeout: 2000, timeoutErrorMessage: "Timeout" })).data as Responses.IListContentItemsResponse<FlightModel>
            if (data && data.items){
                setFlights(data.items)
            }
        }
        fetchData()
            .catch(console.error)
    }, [])

    return <tbody>
        {flights.map(f => <FlightLine flight={f} />)}
    </tbody>
}

export default AxiosTimeout

// this is how we can handle the same with Fetch API

// async function fetchWithTimeout(resource, options = {}) {
//     const { timeout = 8000 } = options;
    
//     const controller = new AbortController();
//     const id = setTimeout(() => controller.abort(), timeout);
  
//     const response = await fetch(resource, {
//       ...options,
//       signal: controller.signal  
//     });
//     clearTimeout(id);
  
//     return response;
// }

// code credit: https://dmitripavlutin.com/timeout-fetch-request/