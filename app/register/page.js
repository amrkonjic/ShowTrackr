'use client'

import { useState } from 'react'
import { supabase } from '/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    
    const user = data.user
    
    if (error) setError(error.message)
    else {
    
      if (user) {
        await supabase.from('profiles').update({ username }).eq('id', user.id)
      }

      setMessage('Register success! Check the confirmation email.')
      setTimeout(() => router.push('/verify'), 1000)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl mb-4 font-bold">Registracija</h1>
      <form onSubmit={handleRegister} className="flex flex-col gap-3 w-64">
        <input
          type="text"
          placeholder="Korisničko ime"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border rounded p-2"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Lozinka"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Registriraj se
        </button>
      </form>
      {error && <p className="text-red-600 mt-2">{error}</p>}
      {message && <p className="text-green-600 mt-2">{message}</p>}
    </div>
  )
}
