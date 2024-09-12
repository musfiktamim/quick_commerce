import {create} from "zustand"

type NewWarehouseState = {
    isOpen:boolean;
    onOepn:()=>void;
    onClose:()=>void
}

export const useNewWarehouse = create<NewWarehouseState>((set)=>{
    return{
        isOpen:false,
        onOepn:()=>set({isOpen:true}),
        onClose:()=>set({isOpen:false})
    }
})