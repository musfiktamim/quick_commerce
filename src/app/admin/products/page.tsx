'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import DataTable from './DataTable'
import { columns } from './columns'

function page() {
  return (
    <>    
        <div className='flex justify-between items-center'>
        <h3 className='text-2xl font-bold tracking-tight'>Products</h3>
        <Button size={"sm"}>Add Product</Button>
        </div>
        <DataTable columns={columns} data={[]} />
    </>
  )
}

export default page
