import { Routes, Route } from 'react-router-dom'
import { TelaInicial } from './pages/TelaInicial'
import { TelaDetalhes } from './pages/TelaDetalhes'

function App() {
  return (
    <Routes>
      <Route path="/" element={<TelaInicial />} />
      <Route path="/pokemon/:name" element={<TelaDetalhes />} />
    </Routes>
  )
}

export default App
