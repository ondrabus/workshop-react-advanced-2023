import { useEffect, useState } from "react"
import { FlightModel } from "../models/content-types"
import FlightLine from "./FlightLine"
import { Responses } from "@kontent-ai/delivery-sdk"
import axios from "axios"
import axiosRetry from "axios-retry"

const AxiosRetry: React.FC = () => {
    let [flights, setFlights] = useState<FlightModel[]>([])

    useEffect(() => {
        const fetchData = async () => {
            
            // add the axios retry call here

            const data = (await axios.get("/api/getFlightsUnreliable")).data as Responses.IListContentItemsResponse<FlightModel>
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

export default AxiosRetry