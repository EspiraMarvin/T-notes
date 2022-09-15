import { store } from '../../rtk/store'
import { notesApiSlice } from '../notes/notesApiSlice'
import { usersApiSlice } from '../users/usersApiSlice'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'


export default function Prefetch() {
    useEffect(() => {
        store.dispatch(notesApiSlice.util.prefetch('getNotes', 'notesList', { force: true }))
        store.dispatch(notesApiSlice.util.prefetch('getUsers', 'usersList', { force: true }))
    }, [])

    return <Outlet />
}
