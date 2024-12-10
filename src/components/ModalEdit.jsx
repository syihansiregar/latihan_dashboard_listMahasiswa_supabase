import { Button, Form, Input, Modal } from 'antd'
import React, { useEffect } from 'react'

const ModalEdit = ({initialValues, close, open, onOk}) => {
    const [form] = Form.useForm()
    useEffect(() => {
        form.setFieldsValue(initialValues || {})
    }, [initialValues, form])

    async function handleSubmit() {
        const value = await form.validateFields()
        onOk(value)
    }
  return (
    <Modal onCancel={close} open={open} footer={null} onOk={handleSubmit}>
        <Form 
        onFinish={handleSubmit}
        form={form}
        initialValues={initialValues}
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
            <Button onClick={handleSubmit} htmlType='submit'>Submit</Button>
        </Form>
    </Modal>
  )
}

export default ModalEdit