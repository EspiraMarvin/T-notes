import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

export default function Welcome() {
  const { username, isAdmin, isManager } = useAuth()

    const date = new Date()
    const today = new Intl.DateTimeFormat('en-us', { dateStyle: 'full', timeStyle: 'long' }).format(date)

  return (
    <section className="welcome">

        <p>{today}</p>

        <h1>Welcome { username } </h1>

        <p><Link to="/dash/notes">View techNotes</Link></p>

        <p><Link to="/dash/notes/new">Add New techNotes</Link></p>

        {
          (isManager || isAdmin) &&
          <p><Link to="/dash/users">View User Settings</Link></p>
        }

        {
          (isManager || isAdmin) &&
          <p><Link to="/dash/users/new">Add New User</Link></p>
        }


    </section>
  )
}
