const commandList = ['clear', 'cd', 'changeServer', 'loadDialogue']

function commandSwitch(command, setTextBoxInnerText, fileHierarchy, path, setPath, currentServer) {
    switch (command[1]) {
        case 'clear':
            clear(setTextBoxInnerText)
            break
        case 'cd':
            cd(fileHierarchy, path, setPath, command[2], currentServer, setTextBoxInnerText)
            break
        default:
            break
    }
}

function clear(setTextBoxInnerText) {
    setTextBoxInnerText([])
}

function cd(fileHierarchy, path, setPath, command, currentServer, setTextBoxInnerText) {
    const isAbsolutePath = command.startsWith(currentServer)
    const newPath = path.split('/')
    const pathList = command.split('/')
    if (command === '..') {
        if (newPath.length > 1) {
            newPath.pop()
            setPath(newPath.join('/')) // 업데이트 시점
        }
    } else if (isAbsolutePath) {
        const value = pathList.reduce((acc, key) => acc?.[key], fileHierarchy);
        if (typeof value === 'object') { 
            setPath(pathList.join('/')) // 업데이트 시점 
        } else {
            setTextBoxInnerText(prev => [...prev, 'No such directory'])
        }
    } else {
        for (let i = 0; i < pathList.length; i++) {
            if (pathList[i] === '..') {
                if (newPath.length > 1) {
                    newPath.pop()
                } else {
                    setTextBoxInnerText(prev => [...prev, 'No such directory'])
                    break
                }
            } else {
                newPath.push(pathList[i])
            }
        }
        const value = newPath.reduce((acc, key) => acc?.[key], fileHierarchy);
        if (typeof value === 'object') { 
            setPath(newPath.join('/')) // 업데이트 시점 
        } else {
            setTextBoxInnerText(prev => [...prev, 'No such directory'])
        }
    }
}

/**
 * 서버를 변경하는 명령어를 입력 받았을 때 실행되는 함수
 * 
 * @param {Function} setCurrentServer 
 * @param {String} serverId
 * @param {Function} setTextBoxInnerText
 */
function changeServer(setCurrentServer, serverId, setTextBoxInnerText) {

    // 만약, serverId가 없다면, 서버를 변경하지 않고 존재하지 않음을 알립니다.
    if (!serverId) {
        setTextBoxInnerText(prev => [...prev, 'No such server'])
        return
    }

    setCurrentServer(serverId)
}

export { 
    commandSwitch, 
    commandList,
    changeServer
}