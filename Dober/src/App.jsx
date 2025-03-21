import { useState } from 'react'

// Component
import Editor from './component/Editor'
import Intro from './component/Intro'

// CSS
import './App.css'

function App() {

    // return할 component를 정하는 state
    const [currentComponent, setCurrentComponent] = useState('Intro')

    /**
     * 현재 화면에 보여줄 component를 결정하는 함수
     * 
     * @returns {JSX.Element}
     */
    function renderComponent() {
        switch (currentComponent) {
            case 'Intro':
                return <Intro setCurrentComponent={setCurrentComponent} />
            case 'Editor':
                return <Editor />
            default:
                return <Editor />
        }
    }

    return (
        <div className='App'>
            {renderComponent()}
        </div>
    )
}

export default App