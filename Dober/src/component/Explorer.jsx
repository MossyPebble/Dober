import { useState, useEffect } from 'react'
import YAML from 'yaml'

// CSS
import './Explorer.css'

function Explorer({ 
    currentServer,
    setCurrentFileContent,
    fileHierarchy,
    fileContent
}) {

    // testcode
    // useEffect(() => {
    //     console.log(currentServer)
    //     console.log(fileContent)
    //     console.log(fileHierarchy[currentServer])
    // }, [currentServer])

    /**
     * 재귀적으로 파일 구조를 렌더링합니다.
     * 
     * @param {Object} hierarchy 
     * @returns 
     */
    function renderFileHierarchy(hierarchy) {
        return Object.keys(hierarchy).map((key, index) => {
            if (typeof hierarchy[key] === 'object') {
                return (
                    <details key={index}>
                        <summary>{key}</summary>
                        {renderFileHierarchy(hierarchy[key])}
                    </details>
                )
            } else {
                return (
                    <li key={index} onClick={() => setCurrentFileContent(fileContent[hierarchy[key]] ? fileContent[hierarchy[key]] : '시발 파일 내용이 없다!!!')}>{key}</li>
                )
            }
        })
    }

    return (
        <>
            <div className='ExplorerContainer'>
                <div>
                    <h3>Current Server: {currentServer}</h3>
                </div>
                <div>
                    <ul className='Explorer'>
                        {renderFileHierarchy(fileHierarchy[currentServer])}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Explorer