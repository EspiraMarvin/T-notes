import React from 'react'
import { Link } from 'react-router-dom'

export default function Welcome() {
    const date = new Date()
    const today = new Intl.DateTimeFormat('en-us', { dateStyle: 'full', timeStyle: 'long' }).format(date)

  return (
    <section className="welcome">

        <p>{today}</p>

        <h1>Welcome!</h1>

        <p><Link to="/dash/notes">View techNotes</Link></p>

        <p><Link to="/dash/users">View User Settings</Link></p>

    </section>
  )
}
