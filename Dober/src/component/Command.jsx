import { useState, useEffect, useRef } from 'react'

// JS
import { commandSwitch, commandList } from '../js/CommandActive.js'

// Component
import { CommandRender } from './CommandRender.jsx'

// CSS
import './Command.css'

// input의 기본 동작 방지를 위한 이벤트 리스너
document.getElementsByTagName('input')[0].addEventListener('keydown', (e) => {

    // 위아래 화살표 키를 눌렀을 때, 기본 동작을 방지합니다.
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault() // 위아래 화살표 기본동작 방지
    }
})

function Command({ playMode, setPlayMode, textBoxInnerText, setTextBoxInnerText, currentCommand, setCurrentCommand, currentServer, fileHierarchy }) {
    const [path, setPath] = useState('')
    const [inputInnerText, setInputInnerText] = useState(path + '> ')
    const scrollRef = useRef(null)

    // 이전에 입력한 명령어를 저장하고, 화살표로 이동할 수 있도록 하는 기능을 위한 states
    const [previousCommand, setPreviousCommand] = useState([])
    const [previousCommandIndex, setPreviousCommandIndex] = useState(0)

    // input의 이벤트 핸들러
    const inputHandleKeyDown = (event) => {

        // Enter 키를 눌렀을 때
        if (event.key === "Enter") {

            // 이전 명령어가 빈 문자열이 아니라면 저장
            if (inputInnerText.trim()) {
                setPreviousCommand((prev) => [...prev, inputInnerText])
            }

            setTextBoxInnerText((prevText) => [...prevText, inputInnerText])
            if (commandList.includes(inputInnerText.split(' ')[1])) {

                // App.jsx에 있는 state CurrentCommand를 업데이트
                setCurrentCommand(inputInnerText.split(' '))
                setInputInnerText(path + '> ')
                commandSwitch(inputInnerText.split(' '), setTextBoxInnerText, fileHierarchy, path, setPath, currentServer)
            }
            if (inputInnerText.trim()) {
                setInputInnerText(path + '> ')
            }
        }

        // 위 화살표로 이전 명령어를 불러옴
        if (event.key === "ArrowUp") {
            if (previousCommandIndex < previousCommand.length) {
                setInputInnerText(previousCommand[previousCommand.length - 1 - previousCommandIndex])
                setPreviousCommandIndex(previousCommandIndex + 1)
            }

            console.log(previousCommand, previousCommandIndex)
        }

        // 아래 화살표로 다음 명령어를 불러옴
        if (event.key === "ArrowDown") {
            if (previousCommandIndex > 0) {
                setInputInnerText(previousCommand[previousCommand.length - previousCommandIndex])
                setPreviousCommandIndex(previousCommandIndex - 1)
            }

            console.log(previousCommand, previousCommandIndex)
        }
    }

    // 테스트 코드
    useEffect(() => {
        setTextBoxInnerText([
            "Hello, world!",
            {
                parts: [
                    { text: "Red ", color: "red" },
                    { text: "Green ", color: "green" },
                    { text: "Blue", color: "blue" },
                ],
            },
            {
                text: "This is a single-color text",
                color: "purple",
            },
        ])
    }, [])

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
                        {CommandRender({ textBoxInnerText })}
                    </div>
                </div>
                <div>
                    <input 
                        type="text" 
                        value={inputInnerText} 
                        onChange={handleChange}
                        onKeyDown={inputHandleKeyDown}
                        style={{ width: "100%", backgroundColor: "#2d2d2d", color: 'white' }}
                        disabled={playMode == 'dialogue' ? true : false}
                    />
                </div>
            </div>
        </div>
    )
}

export default Command