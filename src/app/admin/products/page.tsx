'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import DataTable from './DataTable'
import { columns } from './columns'
import { useQuery } from '@tanstack/react-query'
import { getAllProducts } from '@/http/api'
import { Product } from '@/types'
import Productsheet from './Product-sheet'
import { useNewPeroduct } from '@/store/product/product-store'
import { Loader2 } from 'lucide-react'

function page() {
    const {onOepn} = useNewPeroduct()
    const {data:products,isLoading,isError}= useQuery<Product[]>({
        queryKey:['products'],
        queryFn:getAllProducts
    })

    return (
    <>    
        <div className='flex justify-between items-center'>
        <h3 className='text-2xl font-bold tracking-tight'>Products</h3>
        <Button size={"sm"} onClick={onOepn}>Add Product</Button>
        <Productsheet />
        </div>

        {
            isError && <span>
                Something went wrong
            </span>
        }
        {isLoading?<div className='flex items-center justify-center'>
                <Loader2 className='size-10 animate-spin' />
            </div>:
        <DataTable columns={columns} data={products || []} />
        }
    </>
  )
}

export default page
