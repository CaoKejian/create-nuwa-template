import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import Upload from './component/upload'

const NewDemo: React.FC = () => {
  return <Upload />
}

const root = ReactDOM.createRoot(document.getElementById('app')!)
root.render(<NewDemo />)