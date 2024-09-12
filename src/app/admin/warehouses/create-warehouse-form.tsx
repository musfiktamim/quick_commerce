import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'
import {zodResolver} from "@hookform/resolvers/zod"
import { z } from 'zod'


import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea'
import { Loader2 } from 'lucide-react'
import { warehousesSchema } from '@/lib/validators/warehousesSchema'

export type FormValues = z.infer<typeof warehousesSchema>

function CreateWarehouseForm({onSubmit,disabled}:{onSubmit:(formvalus:FormValues)=>void,disabled:boolean}) {
  const form = useForm<z.infer<typeof warehousesSchema>>({
    resolver:zodResolver(warehousesSchema),
    defaultValues:{
        name:"",
        pincode:""
    }
  })



  function handleSubmit(values: FormValues){
    onSubmit(values)
  }

    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g Chocobar" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


        <FormField
            control={form.control}
            name="pincode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pincode</FormLabel>
                <FormControl>
                  <Input placeholder="e.g 10" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <Button disabled={disabled} type="submit" className='w-full'>
            {disabled? <Loader2 className='size-4 animate-spin' />:'Create'}
          </Button>
        </form>
      </Form>
  )
}

export default CreateWarehouseForm
