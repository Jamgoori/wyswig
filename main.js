// document.querySelectorAll('.options button').forEach(item => item.addEventListener('click', ()=>{
//     const command = item.dataset.command;
//     if(command === 'h1' ||command === 'h2' ||command === 'h3' ||command === 'p'){
//         document.execCommand('formatBlock', false, command)
//     }else{
//         document.execCommand(command)
//     }

// }));

const editor = document.querySelector(".editor");

document.querySelectorAll('.options button')
    .forEach(item => item.addEventListener('click', () => {
        const command = item.dataset.command;
        const selectedTxt = window.getSelection();
        //anchorNode : 선택이 시작되는 노드입니다.
        const parentEl = selectedTxt.anchorNode.parentElement;


        // css style로 바꾸는 경우
        if (command.includes('style')) {
            // slice() 메소드는 문자열의 일부를 추출하면서 새로운 문자열을 반환합니다. 6번째 인덱스 이후로 추출합니다.
            parentEl.style.textAlign = command.slice(6);

            // html 요소를 이용해 바꾸는 경우
        } else {
            const createdEl = document.createElement(command);
            // getSelection : 유저가 선택한 텍스트의 범위를 나타내는 selection 객체를 반환합니다.
            // selection.rangeCount : 선택한 범위의 갯수. 이때 선택한 글씨의 갯수가 아닌점에 주의. 보통 사용자는 1개의 범위만 선택할 수 있습니다.

            // h1, h2, h3, p 처럼 스타일을 라인 통으로 바꿔야 할 경우
            if (command === 'h1' || command === 'h2' || command === 'h3' || command === 'p') {
                createdEl.textContent = parentEl.textContent;
                // 특정 부모 노드의 한 자식 노드를  다른 노드로 교체합니다.
                editor.replaceChild(createdEl, parentEl);
                // 스타일을 라인 중의 일부만 바꿔야 할 경우
            } else {
                // getRangeAt() : 현재 선택된 범위를 나태내는 range 객체를 반환합니다.
                // range : node 를 포함한 document 객체의 일부분을 나태내는 객체입니다.
                const selectedTxtRange = selectedTxt.getRangeAt(0);
                // range 객체를 매개변수로 전달된 노드로 이동합니다.
                selectedTxtRange.surroundContents(createdEl);
            }
        }
    })); 