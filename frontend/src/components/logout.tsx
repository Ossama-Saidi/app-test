"use client"
import { redirect } from 'next/navigation'
import { removeAuthToken } from '@/utils/authUtils';
export default function Logout(){
    return (
        <button onClick={()=>{
            removeAuthToken();
            redirect('/login');
            }}>Sign Out
        </button>
    )
}