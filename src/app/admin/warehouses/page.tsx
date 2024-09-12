'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import DataTable from './DataTable'
import { columns } from './columns'
import { useQuery } from '@tanstack/react-query'
import { getAllWarehouses } from '@/http/api'
import {  Warehouse } from '@/types'
import WarehouseSeet from './Warehouse-sheet'
import { Loader2 } from 'lucide-react'
import { useNewWarehouse } from '@/store/warehouse/warehouse-store'

function page() {
    const {onOepn} = useNewWarehouse()
    const {data:warehouses,isLoading,isError}= useQuery<Warehouse[]>({
        queryKey:['warehouses'],
        queryFn:getAllWarehouses
    })

    return (
    <>    
        <div className='flex justify-between items-center'>
        <h3 className='text-2xl font-bold tracking-tight'>Products</h3>
        <Button size={"sm"} onClick={onOepn}>Add Warehouse</Button>
        <WarehouseSeet />
        </div>

        {
            isError && <span>
                Something went wrong
            </span>
        }
        {isLoading?<div className='flex items-center justify-center'>
                <Loader2 className='size-10 animate-spin' />
            </div>:
        <DataTable columns={columns} data={warehouses|| []} />
        }
    </>
  )
}

export default page
