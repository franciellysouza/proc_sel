import React, { useState } from 'react'
import Products from './pages/Products'
import Audit from './pages/Audit'

export default function App() {
  const [tab, setTab] = useState('produtos')
  return (
    <div style={{ fontFamily: 'sans-serif', margin: '0 auto' }}>
      <h1>Sistema de Auditoria</h1>
      <nav style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button onClick={() => setTab('produtos')}>Produtos (CRUD)</button>
        <button onClick={() => setTab('auditoria')}>Auditoria</button>
      </nav>
      {tab === 'produtos' ? <Products /> : <Audit />}
    </div>
  )
}
