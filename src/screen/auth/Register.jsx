import { Button, Form, Input, message } from 'antd'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import supabase from '../../supabase'
import { useForm } from 'antd/es/form/Form'

const Register = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [form] = useForm()
    const navigate = useNavigate()

    async function handleSubmit(value){
        const {email, password, rePassword} = value

        // if(Password !== rePassword) {
        //     return message.error("Password dan rePassword harus sama")
        // }
        setIsLoading(true)
       
        try {
            const {error} = await supabase.auth.signUp({
                email,
                password
            })
    
            if(error) {
               return message.error("Register gagal")
            } else {
                message.success("Register berhasil")
                form.resetFields()
                setIsLoading(false)
                navigate("/")
                return
            }
        } catch (error) {
            console.error(error)
        }
    }


  return (
    <div  className='w-screen h-screen flex flex-col items-center justify-center gap-5 bg-slate-100'>
        
        <Form
        form={form}
        onFinish={handleSubmit}
       layout='vertical'
       className='w-[600px] h-auto px-5 py-5 rounded-md bg-white shadow-lg'>
        <h1 className='text-xl font font-semibold text-blue-500 text-center'>Form Register</h1>
        <Form.Item
        label = "Email"
        name= "email"
        rules={[
            {
                required: true,
                message: "Input email harus diisi"
            }
        ]}>
            <Input placeholder='Masukkan email' className='py-3'/>
        </Form.Item>

        <Form.Item
        label = "Password"
        name= "password"
        rules={[
            {
                required: true,
                message: "Input password harus diisi"
            }
        ]}>
            <Input.Password placeholder='Masukkan password' className='py-3'/>
        </Form.Item>
        <Form.Item
        label = "rePassword"
        name= "rePassword"
        rules={[
            {
                required: true,
                message: "Input rePassword harus diisi"
            }
        ]}>
            <Input.Password placeholder='Masukkan rePassword' className='py-3'/>
        </Form.Item>
        <Button type='primary' htmlType='submit' className='w-full py-5'>Register</Button>
        <p className='text-end'>Sudah punya akun? / <Link to={"/"} className='text-blue-500'>Login</Link> page</p>
       </Form>
    </div>
  )
}

export default Register