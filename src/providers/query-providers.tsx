"use client"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
let browserQueryclient:QueryClient | undefined = undefined
function makeQueryClient(){
    return new QueryClient()
}

function getQueryClient(){
    if(typeof window === 'undefined'){
        return makeQueryClient()
    }else{
        if(!browserQueryclient){
            browserQueryclient = makeQueryClient()
        }

        return browserQueryclient
    }
}

const queryClient = getQueryClient()

export function Queryproviders({children}:{children:React.ReactNode}) {
    return<QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
}