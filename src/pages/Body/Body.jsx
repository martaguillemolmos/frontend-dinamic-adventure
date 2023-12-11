import {Routes, Route, Navigate} from 'react-router-dom'
import { Register } from '../Register/Register'


export const Body = () => {
    return (
        <>
        <Routes>
            <Route path='*' element={<Navigate to='/' />}/>
            <Route path='/register' element={<Register />}/>
            
        </Routes>
        </>
    )
}