import { useQuery } from "@tanstack/react-query"
import { FlightModel } from "../models/content-types"
import FlightLine from "./FlightLine"
import { Responses } from "@kontent-ai/delivery-sdk"

const ReactQuery: React.FC = () => {
    const flightsFetcher = async ():Promise<FlightModel[]> => {
        const data = await (await fetch("/api/getFlightsUnreliable")).json() as Responses.IListContentItemsResponse<FlightModel>
        return data.items
    }

    const { isLoading, isError, isRefetching, data } = useQuery({ queryKey: ["flights"], queryFn: flightsFetcher})

    if (isLoading) return <tbody><tr><td colSpan={5}>Loading data...</td></tr></tbody>
    if (isRefetching) return <tbody><tr><td colSpan={5}>Refetching data...</td></tr></tbody>
    if (isError) return <tbody><tr><td colSpan={5}>Failed to load data.</td></tr></tbody>

    return <tbody>
        {data?.map(f => <FlightLine flight={f} />)}
    </tbody>
}

export default ReactQuery