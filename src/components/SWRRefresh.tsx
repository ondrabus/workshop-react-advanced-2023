import { FlightModel } from "../models/content-types"
import FlightLine from "./FlightLine"
import { Responses } from "@kontent-ai/delivery-sdk"
import useSWR from "swr"

const SWRRefresh: React.FC = () => {
    const flightsFetcher = async ():Promise<FlightModel[]> => {
        console.log('Fetching data from the remote endpoint.');
        const data = await (await fetch("/api/getFlights")).json() as Responses.IListContentItemsResponse<FlightModel>
        return data.items
    }

    const {data, error, isLoading} = useSWR("flights", flightsFetcher, { refreshInterval: 10000 })

    if (isLoading) return <tbody><tr><td colSpan={5}>Loading data...</td></tr></tbody>
    if (error) return <tbody><tr><td colSpan={5}>Failed to load data.</td></tr></tbody>

    return <tbody>
        {data?.map(f => <FlightLine flight={f} />)}
    </tbody>
}

export default SWRRefresh