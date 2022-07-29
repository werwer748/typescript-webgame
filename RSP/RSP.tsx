import * as React from 'react';
import { useState, useRef, useEffect } from 'react';

const rspCoords = {
    바위: '0',
    가위: '-142px',
    보: '-284px',
} as const;

const scores = {
    가위: 1,
    바위: 0,
    보: -1,
} as const; //? readonly 붙으면서 값이 고정된다.

/*?
typeof가 붙으면 readOnly 되면서
지정한 변수 객체가 타입으로 생성 됨
keyof typeof가 붙으면 지정한 변수의 키값들이 타입으로 생성 됨
거기서 typeof ''[keyof typeof ''] 하면 내부 값들이 타입으로 생성 됨
쓰는 이유: 타입이 바뀔경우 타입으로 선언한 값들을 일일히 바꾸는 작업을 방지하기 위해서
*/
type ImgCoords = typeof rspCoords[keyof typeof rspCoords]; 
// type ImgCoords = '0' | '-142px' | '-284px';

const computerChoice = (imgCoords: ImgCoords) => {
    return (Object.keys(rspCoords) as ['바위', '가위', '보']).find((k) => { // 오브젝트 키는 리턴값이 스트링이기 때문에 강제 형 변환을 해준다. 타입은 정확할수록 좋기 때문에
        return rspCoords[k] === imgCoords;
    })!;
}

const RSP = () => {
    const [result, setResult] = useState('');
    const [imgCoord, setImgCoord] = useState<ImgCoords>(rspCoords.바위);
    const [score, setScore] = useState(0);
    const interval = useRef<number>();

    useEffect(() => {
        console.log('다시 실행?');
        interval.current = window.setInterval(changeHand, 100); // 브라우저에서 실행한다는 확신을 준다.
        return () => {
            console.log('종료');
            clearInterval(interval.current);
        }
    }, [imgCoord]);

    const changeHand = () => {
        if (imgCoord === rspCoords.바위) {
            setImgCoord(rspCoords.가위);
        } else if (imgCoord === rspCoords.가위) {
            setImgCoord(rspCoords.보);
        } else if (imgCoord === rspCoords.보) {
            setImgCoord(rspCoords.바위);
        }
    };

    const onClickBtn = (choice: keyof typeof rspCoords) => () => { //고차함수 함수에 인자넘겨줄경우 사용 그전까진 onClic={() => function('인자')}로 썻었음
        clearInterval(interval.current);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if (diff === 0) {
            setResult('비겼습니다!');
        } else if ([-1, 2].includes(diff)) {
            setResult('이겼습니다!');
            setScore((prevScore) => prevScore + 1);
        } else {
            setResult('졌습니다!');
            setScore((prevScore) => prevScore - 1);
        }
        setTimeout(() => {
            interval.current = window.setInterval(changeHand, 100);
        }, 1000);
    }

    return (
        <>
            <div id='computer' style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}} />
            <div>
                <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
                <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
                <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
            </div>
            <div>{result}</div>
            <div>현재 {score}점</div>
        </>
    );
};

export default RSP;