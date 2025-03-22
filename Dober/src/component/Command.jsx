import { useState, useEffect, useRef } from 'react'

// JS
import { commandSwitch, commandList } from '../js/CommandActive.js'

// Component
import { CommandRender } from './CommandRender.jsx'

// CSS
import './Command.css'

function Command({ playMode, setPlayMode, textBoxInnerText, setTextBoxInnerText, currentCommand, setCurrentCommand, currentServer, fileHierarchy }) {
    const [path, setPath] = useState('')
    const [inputInnerText, setInputInnerText] = useState(path + '> ')
    const scrollRef = useRef(null)

    // 이전에 입력한 명령어를 저장하고, 화살표로 이동할 수 있도록 하는 기능을 위한 states
    const [previousCommand, setPreviousCommand] = useState([])
    const [previousCommandIndex, setPreviousCommandIndex] = useState(0)

    // color를 변경하기 위한 state
    const [color, setColor] = useState('')

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
                commandSwitch(inputInnerText.split(' '), setTextBoxInnerText, fileHierarchy, path, setPath, currentServer, setColor)
            }
            if (inputInnerText.trim()) {
                setInputInnerText(path + '> ')
            }
        }

        // 위 화살표로 이전 명령어를 불러옴
        if (event.key === "ArrowUp") {
            event.preventDefault()
            if (previousCommandIndex < previousCommand.length) {
                setInputInnerText(previousCommand[previousCommand.length - 1 - previousCommandIndex])
                setPreviousCommandIndex(previousCommandIndex + 1)
            }
        }

        // 아래 화살표로 다음 명령어를 불러옴
        if (event.key === "ArrowDown") {
            event.preventDefault()
            if (previousCommandIndex > 0) {
                setInputInnerText(previousCommand[previousCommand.length - previousCommandIndex])
                setPreviousCommandIndex(previousCommandIndex - 1)
            }
        }

        // tab 키로 command 자동완성
        if (event.key === "Tab") {
            event.preventDefault() // 기본 동작 방지

            // 입력한 명령어에 공백이 포함되어 cd asdf같이 이미 입력된 상태라면 아무것도 하지 않음
            if (inputInnerText.split(' ').length > 2) {
                return
            }
            
            // commandList에서 입력한 명령어와 일치하는 것을 찾음
            const command = inputInnerText.split(' ')[1]
            const matchedCommands = commandList.filter((cmd) => cmd.startsWith(command))

            // 만약 찾은 명령어가 1개 보다 많다면 그 목록을 textBoxInnerText에 추가
            if (matchedCommands.length > 1) {
                const commandListText = matchedCommands.join(', ')
                setTextBoxInnerText((prevText) => [...prevText, `Possible commands: ${commandListText}`])
            } 

            // 만약 찾은 명령어가 1개라면 그 명령어를 inputInnerText에 추가
            else if (matchedCommands.length === 1) {
                const command = matchedCommands[0]
                const newInput = inputInnerText.replace(/(\w+)$/, command)
                setInputInnerText(newInput)
            }
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
                <div
                    ref={scrollRef} 
                    style={{ overflowX: 'hidden', overflowY: 'auto', height: '100%', display: "flex", flexDirection: "column"}}
                >
                    <div 
                        style={{ flexGrow: 1, width: '100%', display: "flex", flexDirection: "column", justifyContent: "flex-end", backgroundColor: color }}
                    >
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