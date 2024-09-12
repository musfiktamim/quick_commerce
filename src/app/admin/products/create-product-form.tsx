import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'
import {zodResolver} from "@hookform/resolvers/zod"
import { productSchema } from '@/lib/validators/productSchema'
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

export type FormValues = z.infer<typeof productSchema>

function CreateProductForm({onSubmit}:{onSubmit:(formvalus:FormValues)=>void}) {
  const form = useForm<z.infer<typeof productSchema>>({
    resolver:zodResolver(productSchema),
    defaultValues:{
        name:"",
        description:"",
        price:0,
    }
  })

  const fileRef = form.register("image")


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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                    <Textarea placeholder="e.g Description" {...field}> 

                    </Textarea>
                  {/* <TextArea placeholder="e.g Description" {...field} /> */}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input type='file' placeholder="e.g 10" {...fileRef} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type='number' placeholder="e.g 10" {...field} onChange={(e)=>{
                    const value = parseFloat(e.target.value)
                    field.onChange(value)
                  }} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <Button type="submit" className='w-full'>Create</Button>
        </form>
      </Form>
  )
}

export default CreateProductForm
