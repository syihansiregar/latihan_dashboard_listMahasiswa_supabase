import { useQuery } from '@tanstack/react-query'
import { Button, message, Table } from 'antd'
import React from 'react'
import supabase from '../../supabase'

const TabelMessage = () => {
    const {data : dataMessage, isLoading, refetch} = useQuery({
        queryKey : ["message"],
        queryFn : async () => {
            const  {data} = await supabase.from("messages").select("*")
                console.info(data)
                return data
        }
    })

const column = [
    {
        title : "ID",
        dataIndex : 'id'
    },
    {
        title : "Message",
        dataIndex : "message"
    },
    {
        title : "Action",
        render : (record)=>(
            <Button type='primary' danger onClick={() => handleDelete(record.id)}>Delete</Button>
        )
            
        
    }
]
async function handleDelete (val){
    const conf = window.confirm("yakin ingin hapus pesan ini?")
    if (!conf) return

    const {error} = await supabase.from("messages").delete().eq("id", [val])
        if(error) {
         message.error("data tidak berhasil dihapus")
        } else {
         message.success("data berhasil dihapus")
         refetch()
        }
  
}

    if(isLoading){
        return (
            <div className='w-screen h-screen flex justify-center items-center'>
                <h1>Loading...</h1>
            </div>
        )
    }
    
  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
        <h1 className='text-xl mb-10'>Table Message</h1>
    <div className='w-[1000px] h-[470px] p-3 shadow-[0_0_15px_rgba(0,0,0,0.2)]'>
        <Table
        columns={column}
        className='custom-table'
        dataSource={dataMessage || []}
        pagination={{pageSize : 5}}
        />
    </div>
    </div>
  )
}

export default TabelMessage