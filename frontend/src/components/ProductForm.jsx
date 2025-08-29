import React, { useState } from 'react'

export default function ProductForm({ initial, onSubmit, submitLabel='Salvar', onCancel }) {
  const [nome, setNome] = useState(initial.nome || '')
  const [preco, setPreco] = useState(initial.preco || '')

  function handleSubmit(e) {
    e.preventDefault()
    const parsed = parseFloat(preco)
    if (!nome.trim()) return alert('Nome é obrigatório')
    if (Number.isNaN(parsed)) return alert('Preço inválido')

    onSubmit({ nome: nome.trim(), preco: parsed })
    setNome('')
    setPreco('')
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <input placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
      <input placeholder="Preço" value={preco} onChange={e => setPreco(e.target.value)} />
      <button type="submit">{submitLabel}</button>
      {onCancel && <button type="button" onClick={onCancel}>Cancelar</button>}
    </form>
  )
}
