import { useState, useEffect } from 'react'
import YAML from 'yaml'

// Component
import Explorer from './Explorer'
import Command from './Command'

// JS
import { getDialogueWithKey } from '../js/dialogueManager'
import { changeServer } from '../js/CommandActive'

// YAML 파일
import fileHierarchyYAML from '../assets/fileHierarchy.yaml?raw'
import fileContentYAML from '../assets/fileContent.yaml?raw'

function Editor() {
    const [currentServer, setCurrentServer] = useState('server1')
    const [currentFileContent, setCurrentFileContent] = useState('')
    const [currentCommand, setCurrentCommand] = useState([])

    // mode는 dialogue, play
    const [playMode, setPlayMode] = useState('play')

    // command 관리, 이 state에는 오직 배열만이 들어가야 합니다.
    const [textBoxInnerText, setTextBoxInnerText] = useState([])

    // 파일 구조와 파일 내용을 담는 state, 변경되지 않기 때문에 set 함수를 사용하지 않습니다.
    const [fileHierarchy, ] = useState(YAML.parse(fileHierarchyYAML))
    const [fileContent, ] = useState(YAML.parse(fileContentYAML))

    // Command.jsx 외부에서 관리되는 명령어들 (주로 테스트 관련)
    useEffect(() => {
        if (currentCommand[1] === 'changeServer') {
            changeServer(setCurrentServer, currentCommand[2] || null, setTextBoxInnerText)
        }

        if (currentCommand[1] === 'loadDialogue') {
            const dialog = async () => {
                setPlayMode('dialogue')
                await getDialogueWithKey(textBoxInnerText, setTextBoxInnerText, currentCommand[2] || null)
                setPlayMode('play')
            }
            dialog()
        }
    }, [currentCommand])

    // currentFileContent가 변경될 때 command에 추가, 즉 파일을 클릭했을 때
    useEffect(() => {
        setTextBoxInnerText((prevText) => [...prevText, currentFileContent])
    }, [currentFileContent])

    return (
        <>
            <div className='Container'>
                <div style={ { width: '25%' } }>
                    <Explorer 
                        currentServer={currentServer} 
                        setCurrentFileContent={setCurrentFileContent}
                        fileHierarchy={fileHierarchy}
                        fileContent={fileContent}
                    />
                </div>    
                <div style={ { width: '75%' } }>
                    <Command 
                        playMode={playMode}
                        setPlayMode={setPlayMode}
                        textBoxInnerText={textBoxInnerText}
                        setTextBoxInnerText={setTextBoxInnerText}
                        currentCommand={currentCommand}
                        setCurrentCommand={setCurrentCommand}
                        currentServer={currentServer}
                        fileHierarchy={fileHierarchy}
                    />
                </div>   
            </div>
        </>
    )
}

export default Editor