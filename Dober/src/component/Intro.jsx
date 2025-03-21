import { useEffect } from 'react'

function Intro({ setCurrentComponent }) {

    /**
     * 화면에 있는 div의 투명도를 천천히 100까지 올렸다가 다시 천천히 0으로 만드는 함수
     * 
     * @param {string} className - 애니메이션을 적용할 div의 클래스 이름
     */
    async function fadeInOut(className) {
        const element = document.querySelector(`.${className}`)
        if (!element) return

        // opacity를 0으로 설정
        element.style.opacity = 0

        // 애니메이션을 적용
        element.style.transition = 'opacity 2s'
        element.style.opacity = 1
        await delay(2000)

        // 다시 opacity를 0으로 설정
        element.style.transition = 'opacity 2s'
        element.style.opacity = 0
        await delay(2000)
    }

    /**
     * 일정 시간 동안 대기하는 함수
     * 
     * @param {number} ms - 대기 시간 (밀리초)
     * @returns {Promise}
     */
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    useEffect(() => {
        async function init() {

            // fadeInOut 함수 호출
            await fadeInOut('intro')

            // intro 안의 h3의 텍스트를 변경
            const introText = document.querySelector('.intro h3')
            if (introText) {
                introText.innerHTML = '클릭하여 시작하세요.'
            }

            // fadeInOut 함수 호출
            await fadeInOut('intro')
        }
        init()
    }, [])

    return (
        <>
            <style>
                {`
                    .intro {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        height: 100vh; /* 화면 전체 높이 */
                        text-align: center;
                        background-color: #2d2d2d; /* 배경색 */
                        color: white; /* 텍스트 색상 */

                        opacity: 0; /* 초기 opacity */
                    }
                `}
            </style>
            <div className="intro" onClick={ () => setCurrentComponent('Editor') }>
                <h3>
                    헤드폰으로 플레이 하는 것을 추천합니다.
                </h3>
            </div>
        </>
    )
}

export default Intro