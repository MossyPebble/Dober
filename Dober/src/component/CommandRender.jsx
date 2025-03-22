/**
 * input으로 Array를 받아 Command component에 render하는 함수
 * 지원하는 형식은 다음과 같은 3가지이다.
 * 
 * - 문자열
 * 
 * - 객체(key: text, color)
 *  - text: 문자열
 *  - color: 문자열
 * 
 * - 객체로 구성된 객체(key: parts)
 * - parts: Array
 *  - text: 문자열
 *  - color: 문자열
 * 
 * @param {Array} textBoxInnerText - Command component에 render할 Array이자 state
 * @return {JSX.Element} - Command component에 render할 JSX Element
 */
function CommandRender({ textBoxInnerText }) {
    return (
        <>
            {textBoxInnerText.map((item, index) => {

                // 문자열인 경우
                if (typeof item === 'string') {
                    return (
                        <div
                            className='command-text'
                            key={index}
                        >
                            {item}
                        </div>
                    )
                }

                // 객체인 경우
                if (typeof item === 'object' && item !== null) {

                    // 텍스트를 여러 색으로 나누는 경우
                    if (Array.isArray(item.parts)) {
                        return (
                            <div key={index} className="command-text">
                                {item.parts.map((part, partIndex) => (
                                    <span
                                        key={partIndex}
                                        style={{
                                            color: part.color || 'black', // 각 부분의 색상
                                        }}
                                    >
                                        {part.text || ''}
                                    </span>
                                ))}
                            </div>
                        )
                    }

                    // 하나의 객체인 경우
                    return (
                        <div
                            className='command-text'
                            key={index}
                            style={{
                                color: item.color || 'black', // 객체에 색상이 정의된 경우 사용
                            }}
                        >
                            {item.text || 'No text provided'} {/* 객체의 text 속성 사용 */}
                        </div>
                    )
                }

                // 기타 타입인 경우
                return (
                    <div
                        className='command-text'
                        key={index}
                        style={{
                            color: 'red',
                        }}
                    >
                        Unsupported type
                    </div>
                )
            })}
        </>
    )
}

export { CommandRender }