import { Button, Form, Input, message } from 'antd'
import React from 'react'
import supabase from '../../supabase'

const CreateData = () => {
    const [form] = Form.useForm()

    
    const handleSubmit = async (value) => {
        const {nim, fullname, address, phone} = value
        try {
            const {data, error} = await supabase.from("mahasiswa").insert({nim, fullname, address, phone});
            if (error) {
                console.error(error); // Log the error for better debugging
                message.error("Create Data invalid");
            } else {
                message.success("Create Data sukses");
            }
        } catch (err) {
            console.error("Unexpected error:", err);
            message.error("An unexpected error occurred");
        }
         const {data, error} = await supabase.from("mahasiswa").insert({nim, fullname, address, phone})
        if(error){
            message.error("Create Data invalid")
        } else{
            message.success("Create Data sukses")
            return
        }
    }
  return (
    <div>
        <Form 
        onFinish={handleSubmit}
        layout='vertical'
        className='grid grid-cols-2 p-5 gap-5'
        >
            <Form.Item label="NIM" name={"nim"} rules={[{required : true, message : "Input NIM tidak boleh kosong"}]}>
                <Input placeholder="Masukkan NIM"/>
            </Form.Item>
            <Form.Item label="Nama Lengkap" name={"fullname"} rules={[{required : true, message : "Input Nama Lengkap tidak boleh kosong"}]}>
                <Input placeholder="Masukkan Nama Lengkap"/>
            </Form.Item>
            <Form.Item label="Alamat" name={"address"} rules={[{required : true, message : "Input Alamat tidak boleh kosong"}]}>
                <Input placeholder="Masukkan Alamat"/>
            </Form.Item>
            <Form.Item label="Telepon" name={"phone"} rules={[{required : true, message : "Input Telepon tidak boleh kosong"}]}>
                <Input placeholder="Masukkan Telepon"/>
            </Form.Item>
            <Button htmlType='submit'>Submit</Button>
        </Form>
    </div>
  )
}

export default CreateData