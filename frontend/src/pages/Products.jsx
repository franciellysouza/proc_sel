import React, { useEffect, useState } from 'react'
import { apiGet, apiJson } from '../api'
import ProductForm from '../components/ProductForm'

export default function Products() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)

  async function load() {
    setLoading(true)
    try {
      const data = await apiGet('/products')
      setItems(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  async function onCreate(values) {
    await apiJson('/products', 'POST', values)
    await load()
  }

  async function onUpdate(values) {
    await apiJson(`/products/${editing.id}`, 'PUT', values)
    setEditing(null)
    await load()
  }

  async function onDelete(id) {
    if (!confirm('Deletar produto?')) return
    await apiJson(`/products/${id}`, 'DELETE')
    await load()
  }

  return (
    <div>
      <h2>Produtos</h2>
      <ProductForm
        key={editing ? 'edit' : 'create'}
        initial={editing || { nome: '', preco: '' }}
        onSubmit={editing ? onUpdate : onCreate}
        submitLabel={editing ? 'Salvar' : 'Adicionar'}
        onCancel={editing ? () => setEditing(null) : undefined}
      />

      {loading ? <p>Carregando...</p> : (
        <table border="1" cellPadding="8" style={{ marginTop: 16, width: '100%' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Preço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {items.map(it => (
              <tr key={it.id}>
                <td>{it.id}</td>
                <td>{it.nome}</td>
                <td>{Number(it.preco).toFixed(2)}</td>
                <td>
                  <button onClick={() => setEditing(it)}>Editar</button>{' '}
                  <button onClick={() => onDelete(it.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
