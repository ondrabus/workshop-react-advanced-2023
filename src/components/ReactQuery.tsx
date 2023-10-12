import { useQuery } from "@tanstack/react-query"
import { FlightModel } from "../models/content-types"
import FlightLine from "./FlightLine"
import { Responses } from "@kontent-ai/delivery-sdk"

const ReactQuery: React.FC = () => {
    const flightsFetcher = async ():Promise<FlightModel[]> => {
        const data = await (await fetch("/api/getFlightsUnreliable")).json() as Responses.IListContentItemsResponse<FlightModel>
        return data.items
    }

    // add the React Query code here

    return <tbody>
        {data?.map(f => <FlightLine flight={f} />)}
    </tbody>
}

export default ReactQuery