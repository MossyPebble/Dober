import { useState, useEffect, useRef } from 'react'
import { commandSwitch, commandList } from '../js/CommandActive.js'

function Command({ playMode, setPlayMode, textBoxInnerText, setTextBoxInnerText, currentCommand, setCurrentCommand, currentServer, fileHierarchy }) {
    const [path, setPath] = useState('')
    const [inputInnerText, setInputInnerText] = useState(path + '> ')
    const scrollRef = useRef(null)

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            setTextBoxInnerText((prevText) => [...prevText, inputInnerText])
            if (commandList.includes(inputInnerText.split(' ')[1])) {

                // App.jsx에 있는 state CurrentCommand를 업데이트
                setCurrentCommand(inputInnerText.split(' '))

                // 
                setInputInnerText(path + '> ')
                commandSwitch(inputInnerText.split(' '), setTextBoxInnerText, fileHierarchy, path, setPath, currentServer)
            }
            if (inputInnerText.trim()) {
                setInputInnerText(path + '> ')
            }
        }
    }

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [textBoxInnerText])

    // path가 변경될 때마다 inputInnerText를 업데이트
    useEffect(() => {
        setInputInnerText(path + '> ')
    }, [path])

    // currentServer가 변경될 때마다 path를 업데이트
    useEffect(() => {
        setPath(currentServer)
    }, [currentServer])

    const handleChange = (e) => {
        let value = e.target.value

        if (!value.startsWith(path + '> ')) {
            value = path + '> '
        }
        setInputInnerText(value)
    }

    return (
        <div style={{ position: "relative", height: "98vh", width: "100%", backgroundColor: "#2d2d2d" }}>
            <div style={{ position: "absolute", bottom: "0", width: "100%", display: "flex", flexDirection: "column", height: "100%" }}>
                <div ref={scrollRef} style={{ overflowX: 'hidden', overflowY: 'auto', height: '100%', display: "flex", flexDirection: "column" }}>
                    <div style={{ flexGrow: 1, width: '100%', display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                        {textBoxInnerText.map((text, index) => (
                            <div key={index} style={{ 
                                width: '100%', writingMode: 'horizontal-tb', fontFamily: 'MS PGothic', lineHeight: '1.1',
                                paddingLeft: '10px'
                            }}>{text}</div>
                        ))}
                    </div>
                </div>
                <div>
                    <input 
                        type="text" 
                        value={inputInnerText} 
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        style={{ width: "100%", backgroundColor: "#2d2d2d", color: 'white' }}
                        disabled={playMode == 'dialogue' ? true : false}
                    />
                </div>
            </div>
        </div>
    )
}

export default Command