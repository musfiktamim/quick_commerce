'use client'
import React from 'react'

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
  } from "@/components/ui/sheet"
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createWarehouse } from '@/http/api';
import { useToast } from '@/hooks/use-toast';
import CreateWarehouseForm, { FormValues } from './create-warehouse-form'
import { useNewWarehouse } from '@/store/warehouse/warehouse-store';



function WarehouseSeet() {
  const {toast} = useToast()
  const {isOpen,onClose} = useNewWarehouse()
  const queryClient = useQueryClient()

  const {mutate,isPending} = useMutation({
    mutationKey:['create-warehouse'],
    mutationFn:(data:FormData)=>createWarehouse(data),
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:['warehouses']});
      toast({
        title:"warehouse created"
      })
      onClose()
    }
  })



  function onSubmit(values){
    mutate(values)
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
  <SheetContent className='bg-white text-black min-w-[20rem] space-y-4' >
    <SheetHeader>
      <SheetTitle>Creatre Product</SheetTitle>
      <SheetDescription>
        Create new Warehouse
      </SheetDescription>
    </SheetHeader>
    <CreateWarehouseForm disabled={isPending} onSubmit={onSubmit} />
  </SheetContent>
</Sheet>

  )
}

export default WarehouseSeet
