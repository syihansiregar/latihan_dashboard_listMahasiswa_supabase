import { Button, message, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import supabase from '../../supabase'
import ModalEdit from '../../components/ModalEdit'
import { useQuery } from '@tanstack/react-query'
import ModalTambahData from '../../components/ModalTambahData'
import { Chance } from 'chance'
import { NavLink } from 'react-router-dom'

const HomeScreen = () => {
  const [openModal, setOpenModal] = useState(false);
  const [dataEdit, setDataEdit] = useState(null);
  const [isSelect, setIsSelect] = useState(null);
  const chance = new Chance()
  async function handleFakeData (val) {
    
    const data = []

    for(let i = 0; i <5; i++) {
     
      let nim = chance.integer({max: 90000, min: 10000})
      let fullname = chance.name()
      let address = chance.address()
      let phone = chance.phone()
     
      data.push({
        nim: nim,
        fullname: fullname,
        address: address,
        phone: phone,
      })
    }
    const {error} = await supabase.from("mahasiswa").insert(data)

    if(error){
      console.error(error)
      return message.error("Fake Data gagal ditambah")
    } else {
      message.success("Fake Data berhasil ditambah")
      refetch()
    }
  }


  const columns = [
    {
      title: "No",
      dataIndex: "id",
    },
    {
      title: "Nama Mahasiswa",
      dataIndex: "fullname",
    },
    {
      title: "Nim",
      dataIndex: "nim",
    },
    {
      title: "Alamat",
      dataIndex: "address",
    },
    {
      title: "Telepon",
      dataIndex: "phone",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return(
          <div className='flex gap-2'>
            <Button onClick={()=> handleOpenModal(record)}>Edit</Button>
            <Button onClick={() => handleDelete(record.id)}>Delete</Button>
            {
              record.messages?.length>0 &&(
                <button>
                  <NavLink to={`/detail?fullname=${record.fullname}&id=${record.id}`}>
                    Messages
                  </NavLink>
                </button>
              )
            }
          </div>
        )
      }
    },
  ]

  const {data, refetch} = useQuery({
    queryKey : ["all_data"],
    queryFn : async () => {
      const {data, error} = await supabase.from("mahasiswa").select('*, messages(*)').order("id", {ascending : false})

      if(error) {
        return console.error(error)
      } else {
        return data
      }
    }
  })

async function handleDelete(id){
  if(!window.confirm("Apakah Anda yakin ingin menghapus data ini?")) return

  const {error} = await supabase.from("mahasiswa").delete().eq("id", id)

  if(error){
    message.error("Penghapusan data gagal")
  } else {
    message.success("Penghapusan data berhasil")
    refetch()
  }
}
function handleOpenModal (val) {
  setDataEdit(val)
  setOpenModal(prev => prev = !prev)
}

function handleCloseModal (){
  setOpenModal(prev => prev = !prev)
  setDataEdit(null)
}

const handleSubmit = async(value) => {
  const {data, error} = await supabase.from("mahasiswa").update(value).eq("id", dataEdit.id)
  if(error){
    return console.error(error)
  } else{
    message.success("Data berhasil diedit")
    refetch()
  }
}

const handleSelect = {
  isSelect,
  onChange : (value) => {
    setIsSelect(value)
    console.info(value)
  }
}

async function handleDeleteSelect () {
  const conf = window.confirm("Apakah Anda yakin ingin menghapus data ini?")
 
  if(!conf) return
  
  if(isSelect.length === data.length) {
    const {error} = await supabase.from("mahasiswa").delete()
    message.success("Semua data berhasil dihapus")
    setIsSelect([])
    refetch()
    if(error) return console.error(error)
  } else {
    const {error} = await supabase.from("mahasiswa").delete().in("id", isSelect)
    message.success("Data berhasil dihapus")
    setIsSelect([])
    refetch()
    if(error) return console.error(error)
  }
}
  return (
    <div>
      <div className='flex items-center my-5'>
        <Button onClick={handleDeleteSelect}>Delete data {isSelect?.length ? isSelect?.length: ''} row</Button>
        <Button onClick={handleFakeData}>Fake Data</Button>
      </div>
      <ModalEdit
       close={handleCloseModal} 
       cancel={handleCloseModal}
       open={openModal}
       initialValues={dataEdit}
       onOk={handleSubmit}/>
       {/* <ModalTambahData
       cancel={handleCloseModal}
       close={handleCloseModal}
       open={openModal}/> */}
      <Table
      rowSelection={handleSelect}
      rowKey={"id"}
      columns={columns}
      dataSource={data}
      />
    </div>
  )
}

export default HomeScreen