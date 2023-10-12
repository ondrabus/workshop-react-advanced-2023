import { mutate } from "swr"

const SWRMutate: React.FC = () => 
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-7 mb-4" onClick={() => mutate("flights")}>Revalidate</button>

export default SWRMutate