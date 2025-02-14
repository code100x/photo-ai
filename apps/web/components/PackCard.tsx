import { BACKEND_URL } from "@/app/config";
import { useAuth } from "@clerk/nextjs"
import axios from "axios";
import toast from 'react-hot-toast';

export interface TPack {
    id: string;
    name: string;
    imageUrl1: string;
    imageUrl2: string;
    description: string;
}

export function PackCard(props: TPack & {selectedModelId: string}) {
    const { getToken } = useAuth()

    return <div className="border rounded-xl hover:border-red-300 border-2 p-2 cursor-pointer" onClick={async () => {
        toast("Pack generation started successfully")
        const token = await getToken();
        await axios.post(`${BACKEND_URL}/pack/generate`, {
            packId: props.id,
            modelId: props.selectedModelId
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }}>
        <div className="flex p-4 gap-4">
            <img key={`${props.id}-1`} src={props.imageUrl1} width="50%" className="rounded" alt={`${props.name} - Image 1`} />
            <img key={`${props.id}-2`} src={props.imageUrl2} width="50%" className="rounded" alt={`${props.name} - Image 2`} />
        </div>

        <div className="text-xl font-bold pb-2">
            {props.name}
        </div>

        <div className="text-sm">
            {props.description} 
        </div>
    </div>    
  
}