'use client'
import React from 'react'

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
  } from "@/components/ui/sheet"
import CreateProductForm, { FormValues } from './create-product-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct } from '@/http/api';
import { useNewPeroduct } from '@/store/product/product-store';



function Productsheet() {
  const {isOpen,onClose} = useNewPeroduct()
  const queryClient = useQueryClient()

  const {mutate,isPending} = useMutation({
    mutationKey:['create-product'],
    mutationFn:(data:FormData)=>createProduct(data),
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:['products']});
      alert("created");
    }
  })



  function onSubmit(values:FormValues){  
    const formData = new FormData();
    formData.append("name",values.name);
    formData.append("description",values.description);
    formData.append("price",String(values.price));
    formData.append("image",(values.image as FileList)[0])
    mutate(formData)
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
  <SheetContent className='bg-white text-black min-w-[20rem] space-y-4' >
    <SheetHeader>
      <SheetTitle>Creatre Product</SheetTitle>
      <SheetDescription>
        Create new Product
      </SheetDescription>
    </SheetHeader>
    <CreateProductForm disabled={isPending} onSubmit={onSubmit} />
  </SheetContent>
</Sheet>

  )
}

export default Productsheet
