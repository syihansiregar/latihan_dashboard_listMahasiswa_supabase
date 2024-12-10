import { Button, Form, Input, Modal } from 'antd'
import React from 'react'


const ModalTambahData = ({cancel, close, open}) => {
  return (
    <div>
        <Modal onCancel={cancel} onClose={close} open={open}>
        <Form 
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
        </Modal>
    </div>
  )
}

export default ModalTambahData