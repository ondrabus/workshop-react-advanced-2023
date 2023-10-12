import { useEffect, useState } from "react"
import { FlightModel } from "../models/content-types"
import FlightLine from "./FlightLine"
import { Responses } from "@kontent-ai/delivery-sdk"

const Fetch: React.FC = () => {
    let [flights, setFlights] = useState<FlightModel[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await (await fetch("/api/getFlights")).json() as Responses.IListContentItemsResponse<FlightModel>
            setFlights(data.items)
        }
        fetchData()
            .catch(console.error)
    }, [])

    return <tbody>
        {flights.map(f => <FlightLine flight={f} />)}
    </tbody>
}

export default Fetch