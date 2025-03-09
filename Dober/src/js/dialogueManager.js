import YAML from 'yaml'

// dialogues용 외부 파일
import dialogueSet from '../assets/dialogueSet.yaml?raw'
const dialogue = YAML.parse(dialogueSet)

// AA용 외부 파일
import UmaAA from '../assets/UmaAA.yaml?raw'
const UmaAAParsed = YAML.parse(UmaAA)

// UmaAA의 모든 요소를 순회하며 split
const UmaAASplited = Object.keys(UmaAAParsed).reduce((acc, key) => {
    acc[key] = UmaAAParsed[key].split("\n")
    return acc
}, {})

/**
 * 입력으로 ascii art를 받아 위 아래로 선을 그어주는 함수
 * 
 * @param {Array} text 
 * @returns {Array}
 */
function drawBorder(asciiArt) {
    // asciiArt가 없다면 빈 배열 반환
    if (!asciiArt || asciiArt.length === 0) {
        return ['']
    }
    const border = Array(50).fill('━').join('')
    return [border, ...asciiArt, border]
}

/**
 * 대화를 yaml로 관리하는 함수
 * 
 * @param {Array} textBoxInnerText
 * @param {Function} setTextBoxInnerText
 * @param {String} dialogueKey
 */
async function getDialogueWithKey(textBoxInnerText, setTextBoxInnerText, dialogueKey) {
    
    // dialogueKey가 없다면 settextboxinnerText에 없는 대화라고 출력
    if (!dialogueKey) {
        setTextBoxInnerText([...textBoxInnerText, 'No such dialogue'])
        return
    }

    const dialogueArray = dialogue[dialogueKey].dialogues

    for (const dialogue of dialogueArray) {
        // 먼저 delay
        await new Promise((resolve) => setTimeout(resolve, dialogue.delay || 0))

        // 대화 출력
        textBoxInnerText = [
            ...textBoxInnerText,
            ...drawBorder(UmaAASplited[dialogue.aa_name]), `[${dialogue.name || ''}] ${dialogue.text || ''}`
        ]
        setTextBoxInnerText(textBoxInnerText)
    }
}

export {
    getDialogueWithKey
}