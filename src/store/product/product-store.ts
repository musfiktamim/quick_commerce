import {create} from "zustand"

type NewProductState = {
    isOpen:boolean;
    onOepn:()=>void;
    onClose:()=>void
}

export const useNewPeroduct = create<NewProductState>((set)=>{
    return{
        isOpen:false,
        onOepn:()=>set({isOpen:true}),
        onClose:()=>set({isOpen:false})
    }
})