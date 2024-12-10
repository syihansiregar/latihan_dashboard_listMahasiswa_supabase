import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useSearchParams } from 'react-router-dom'
import supabase from '../../supabase'
import { render } from 'react-dom'
import { Button, message, Table } from 'antd'

const DetailMessages = () => {
    const [query] = useSearchParams()
    const user_id = query.get("id")

    const {data, isError, isLoading, refetch} = useQuery ({
        queryKey : ["data-message", user_id],
        queryFn : async ({queryKey}) => {
            let user = queryKey[1]

            try {
             const {data} = await supabase.from("messages").select("*, mahasiswa(fullname)").eq("user_id", user)
             console.info(data)
             return data
            } catch (error) {
                console.error(error)
            }
        }

    })

    const column = [
        {
            title : "User_id",
            dataIndex : "user_id"
        },
        {
            title : "Nama Mahasiswa",
            dataIndex : ['mahasiswa', "fullname"]
        },
        {
            title : "Message",
            dataIndex : "message"
        },
        {
            title : "Action",
            render : (value, record) => (
                <Button danger type='primary' onClick={()=> handleDelete(record.id)}>Delete</Button>
            )
        },
       
    ]

  

    async function handleDelete(id){
        if(!window.confirm("Apakah Anda yakin ingin menghapus data ini?")) return
      
        const {error} = await supabase.from("messages").delete().eq("id", id)
      
        if(error){
          message.error("Penghapusan data gagal")
        } else {
          message.success("Penghapusan data berhasil")
          refetch()
        }
      }
    



  return (
    <div className='w-full h-full  flex-col flex items-center justify-center'>
        <h1 className='text-xl mb-10 font-bold'>Table Message</h1>
       <div className=' w-[80%] h-auto bg-white shadow-lg rounded-md'> 
        <Table
            columns={column}
            dataSource={data}
            />
       </div>
    </div>
  )
}

export default DetailMessages