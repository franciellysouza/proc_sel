import React, { useEffect, useState } from 'react'
import { apiGet } from '../api'

export default function Audit() {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)

  async function load() {
    setLoading(true)
    try {
      const data = await apiGet('/audit-logs')
      setLogs(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const formatDate = (ts) => {
    if (!ts) return ''
    const date = new Date(ts)
    return date.toLocaleString('pt-BR', { hour12: false })
  }

  const thStyle = { border: '1px solid #ccc', padding: '8px', textAlign: 'left', whiteSpace: 'nowrap' }
  const tdStyle = { border: '1px solid #ccc', padding: '4px', verticalAlign: 'top' }

  return (
    <div style={{ overflowX: 'auto' }}>
      <h2>Auditoria</h2>
      {loading ? <p>Carregando...</p> : (
        <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 1400 }}>
          <thead>
            <tr>
              <th style={{ ...thStyle, width: 50 }}>ID</th>
              <th style={{ ...thStyle, width: 80 }}>Ação</th>
              <th style={{ ...thStyle, width: 100 }}>Tabela</th>
              <th style={{ ...thStyle, width: 80 }}>Registro</th>
              <th style={{ ...thStyle, width: 80 }}>Método</th>
              <th style={{ ...thStyle, width: 60 }}>Status</th>
              <th style={{ ...thStyle, width: 250 }}>Old</th>
              <th style={{ ...thStyle, width: 250 }}>New</th>
              <th style={{ ...thStyle, width: 300 }}>Response</th>
              <th style={{ ...thStyle, width: 160 }}>Quando</th>
              <th style={{ ...thStyle, width: 120 }}>User</th>
              <th style={{ ...thStyle, width: 150 }}>Rota</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(l => (
              <tr key={l.id}>
                <td style={tdStyle}>{l.id}</td>
                <td style={tdStyle}>{l.action}</td>
                <td style={tdStyle}>{l.table_name}</td>
                <td style={tdStyle}>{l.record_id ?? ''}</td>
                <td style={tdStyle}>{l.http_method}</td>
                <td style={tdStyle}>{l.status_code}</td>
                <td style={tdStyle}>
                  <div style={{ maxHeight: 120, overflow: 'auto', whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                    {JSON.stringify(l.old_data, null, 2)}
                  </div>
                </td>
                <td style={tdStyle}>
                  <div style={{ maxHeight: 120, overflow: 'auto', whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                    {JSON.stringify(l.new_data, null, 2)}
                  </div>
                </td>
                <td style={tdStyle}>
                  <div style={{ maxHeight: 120, overflow: 'auto', whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                    {JSON.stringify(l.response, null, 2)}
                  </div>
                </td>
                <td style={tdStyle}>{formatDate(l.timestamp)}</td>
                <td style={tdStyle}>{l.username || ''}</td>
                <td style={tdStyle}>{l.route || ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
