import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './screen/auth/Login';
import HomeScreen from './screen/home_screen/HomeScreen';
import Register from './screen/auth/Register';
import ListMahasiswa from './sidebar/ListMahasiswa';
import Layout from './screen/Layout';
import CardMahasiswa from './sidebar/CardMahasiswa';
import CreateData from './screen/home_screen/CreateData';
import FormMessage from './screen/Message/FormMessage';
import TabelMessage from './screen/Message/TabelMessage';
import DetailMessages from './screen/Message/DetailMessages';
import supabase from './supabase';

const App = () => {
  //protected Route
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLogin(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLogin(session)
    })

    return () => subscription.unsubscribe()
  }, [])


  if(!isLogin){
    return (
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>
      </Routes>
    )
  }

  return(
    <Routes>
      <Route path='/' element={<Layout/>}>
          <Route index element={<HomeScreen/>}/>
          <Route path='/list' element={<ListMahasiswa/>}/>
          <Route path='/create' element={<CreateData/>}/>
          <Route path='/form' element={<FormMessage/>}/>
          <Route path='/tabelmessage' element={<TabelMessage/>}/>
          <Route path='/detail' element={<DetailMessages/>}/>
      </Route>
    </Routes>
  )
}

export default App