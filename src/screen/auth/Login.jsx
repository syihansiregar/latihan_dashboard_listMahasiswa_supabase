import { Button, Form, Input, message } from 'antd'
import { useForm } from 'antd/es/form/Form'
import React from 'react'
import { Link } from 'react-router-dom'
import supabase from '../../supabase'

const Login = () => {
const [form] = useForm()

async function handleSubmit (value){
    const {email, password} = value
    
    try {
        const {error} = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if(error) {
            return message.error("login gagal")
        } else {
            message.success("login berhasil")
            form.resetFields()
        }
    } catch (error) {
        console.error(error)
    }
}

  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center gap-5 bg-slate-100'>
       <Form 
            form={form} 
            onFinish={handleSubmit}
            layout='vertical'
            className='w-[600px] h-auto px-5 py-5 rounded-md bg-white shadow-lg'
        >
        <h1 className='text-center text-xl font-bold mb-5'>Form Login</h1>
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
        <Button type='primary' htmlType='submit' className='w-full py-5'>Submit</Button>
            <p className='text-end'>Belum punya akun? / <Link to={"/register"} className='text-blue-500'>Register</Link> page</p>
       </Form>
    </div>
  )
}

export default Login