import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { FlightModel } from "../models/content-types"
import FlightLine from "./FlightLine"
import { Responses } from "@kontent-ai/delivery-sdk"
import React from "react"

const ReactQueryPagination: React.FC = () => {
    const flightsFetcher = async (page: number = 0) => {
        const data = await (await fetch("/api/getFlightsPaged?page=" + page)).json() as Responses.IListContentItemsResponse<FlightModel>
        return {
            data: data.items,
            totalCount: data.pagination.totalCount ?? 0
        }
    }

    const [page, setPage] = React.useState(0)

    const { isLoading, isError, isRefetching, data, isPreviousData } = useQuery({
        queryKey: ["flights", page],
        queryFn: () => flightsFetcher(page)
    })

    if (isLoading) return <tbody><tr><td colSpan={5}>Loading data...</td></tr></tbody>
    if (isRefetching) return <tbody><tr><td colSpan={5}>Refetching data...</td></tr></tbody>
    if (isError) return <tbody><tr><td colSpan={5}>Failed to load data.</td></tr></tbody>

    return <tbody>
        {data?.data?.map(f => <FlightLine flight={f} />)}
        <tr>
            <td colSpan={5}>
                Current page: {page+1}
            </td>
        </tr>
        <tr>
            <td colSpan={5}>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
                    onClick={() => setPage(page-1)}
                    disabled={page === 0}>Previous page</button>
                <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-7 mb-2"
                    onClick={() => setPage(page+1)}
                    disabled={isPreviousData || data.totalCount <= (page+1)*3}>Next page</button>    
            </td>
        </tr>
    </tbody>
}

export default ReactQueryPagination