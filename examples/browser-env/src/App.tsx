import './App.css'
import { TraitsParser } from './components/TraitsParser'
import { RenderByTokenKey } from './components/RenderByTokenKey'

function App() {
  return (
    <>
      <h1>Spore DOB/0 Render Demo</h1>
      <h2>
        Text Render <code>prev.type = "text"</code>
      </h2>
      <TraitsParser />

      <h2>Render By Token Key</h2>
      <RenderByTokenKey />
    </>
  )
}

export default App
