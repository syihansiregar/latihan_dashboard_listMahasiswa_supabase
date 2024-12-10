import { useQuery } from '@tanstack/react-query'
import { Button, Form, message, Select } from 'antd'
import { useForm } from 'antd/es/form/Form'
import TextArea from 'antd/es/input/TextArea'
import React, { useState } from 'react'
import supabase from '../../supabase'

const FormMessage = () => {
    const [selectvalue, setSelectValues] = useState("All")
    const [form] = useForm()

    
  const {data, refetch} = useQuery({
    queryKey : ["all_data"],
    queryFn : async () => {
      const {data, error} = await supabase.from("mahasiswa").select("*").order("id", {ascending : false})

      if(error) {
        return console.error(error)
      } else {
        return data
      }
    }
  })
 
    const optoinsSelect = [
        {
            label : "All", 
            value : "All"
        },
        ...(data ? data.map((val ) => ({
            label : val.fullname,
            value : val.id
        }) ) : [])
    ]

    async function handleSubmitMessage (values) {
        if(selectvalue === "ALL") {
            const messageAll = data.map((prev)=> ({
                user_id : prev.fullname,
                message : values.message
            }))

            const {error} = await supabase.from("messages").insert(messageAll)

            if (error) {
                message.error("pesan tidak terkirim")
            } else {
                message.success("pesan seluruh mahasiswa berhasil dikirim")
            }
        } else {
            const messageSelect = [
                {
                  user_id : selectvalue,
                    message: values.message
                }
            ]
            const {error} = await supabase.from("messages").insert(messageSelect)

            if (error) {
                message.error("pesan tidak terkirim")
            } else {
                message.success("pesan berhasil dikirim")
                refetch()
                form.resetFields()
            }

        }

    }

    



  return (
    <div>
        <div>
            <h1>Message Form</h1>
            <Form onFinish={handleSubmitMessage} form={form}>
                <Form.Item>
                    <Select
                    showSearch
                    options={optoinsSelect}
                    optionFilterProp='label'
                    onChange={(value)=> setSelectValues(value)}
                    value={selectvalue}
                    />
                </Form.Item>
                <Form.Item name='message' rules={[{required : true, message: "pesan tidak boleh kosong"}]}> 
                    <TextArea placeholder='Masukan pesan'/>
                </Form.Item>
                <Button htmlType='submit'>Send</Button>
            </Form>
        </div>
    </div>
  )
}

export default FormMessage