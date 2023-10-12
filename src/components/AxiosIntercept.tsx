import { useEffect, useState } from "react"
import { FlightModel } from "../models/content-types"
import FlightLine from "./FlightLine"
import { Responses, createDeliveryClient } from "@kontent-ai/delivery-sdk"
import axios from "axios"

const AxiosIntercept: React.FC = () => {
    let [flights, setFlights] = useState<FlightModel[]>([])

    useEffect(() => {
        const fetchData = async () => {
            
            axios.interceptors.request.use(config => {
                console.log(`Request was sent via Axios to ${config.url}.`);
                return config;
            }, error => {
                return Promise.reject(error);
            })

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