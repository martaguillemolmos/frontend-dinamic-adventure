import {Routes, Route} from 'react-router-dom'
import { Home } from '../Home/Home'
import { Register } from '../Register/Register'
import { Contact } from '../Contact/Contact'
import { Login } from '../Login/Login'
import { Profile } from '../Profile/Profile'
import { Aquatic_Activity } from '../Aquatic Activity/Aquatic Activity'
import { Land_Activity } from '../Land Activity/Land Activity'


export const Body = () => {
    return (
        <>
        <Routes>
        <Route path='/' element={<Home />}/> 
        <Route path='/contacto' element={<Contact />}/> 
        <Route path='/registro' element={<Register />}/> 
        <Route path='/login' element={<Login />}/> 
        <Route path='/perfil' element={<Profile />}/>
        <Route path='/actividad-acuatica' element={<Aquatic_Activity />}/> 
        <Route path='/actividad-terrestre' element={<Land_Activity />}/> 
 
        </Routes>
        </>
    )
}