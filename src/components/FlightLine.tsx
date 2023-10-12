import { FlightModel } from "../models/content-types";
interface Props {
    flight: FlightModel
}

const FlightLine: React.FC<Props> = ({ flight }) => (
    <tr>
        <td>{flight.system.name}</td>
        <td>{flight.elements.origin.value[0].toUpperCase()}</td>
        <td>{flight.elements.destination.value[0].toUpperCase()}</td>
        <td>{flight.elements.aircraft.value[0].toUpperCase()}</td>
        <td>{flight.elements.departure.value}</td>
    </tr>
)

export default FlightLine