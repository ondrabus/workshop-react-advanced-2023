import { useEffect, useState } from "react"
import { FlightModel } from "../models/content-types"
import FlightLine from "./FlightLine"
import { Responses, createDeliveryClient } from "@kontent-ai/delivery-sdk"
import axios from "axios"

const AxiosIntercept: React.FC = () => {
    let [flights, setFlights] = useState<FlightModel[]>([])

    useEffect(() => {
        const fetchData = async () => {
            
            // add the interceptor call here

            const data = (await axios.get("/api/getFlights")).data as Responses.IListContentItemsResponse<FlightModel>
            setFlights(data.items)
        }
        fetchData()
            .catch(console.error)
    }, [])

    return <tbody>
        {flights.map(f => <FlightLine flight={f} />)}
    </tbody>
}

export default AxiosIntercept