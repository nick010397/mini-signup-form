// TODO: 이 곳에 정답 코드를 작성해주세요.
//1. 페이지가 로드 된 시점에 id입력 창에 Focus가 되어 있어야 합니다.
// 대상: ID입력 input
// 시점: 페이지가 로드되었을떄
// 이벤트: Focus()

const $id = document.getElementById('id')
const $idMsg = document.getElementById('id-msg')
window.addEventListener('load', () => $id.focus())

//2. 유효성 검사 로직
//대상: id,비밀번호, 비밀번호 확인 input
//이벤트: (1)input focus out / (2)가입하기 버튼을 눌렀을때
//

const $pw = document.getElementById('pw')
const $pwMsg = document.getElementById('pw-msg')

const $pwCheck = document.getElementById('pw-check')
const $pwCheckMsg = document.getElementById('pw-check-msg')
const $submit = document.getElementById('submit')

//정규식조건주기
const ID_REGEX = new RegExp('^[a-z0-9_-]{5,20}$')
const PW_REGEX = new RegExp('^[a-zA-Z0-9]{8,16}$')

//에러메시지
const ID_ERROR_MSG = {
    required: '필수 정보입니다.',
    invalid: '5~20자. 영문 소문자, 숫자. 특수기호(_),(-)만 사용 가능합니다.',
}
const PW_ERROR_MSG = {
    required: '필수 정보입니다.',
    invalid: '8~16자. 영문 대/소문자, 숫자 사용 가능합니다',
}
const PW_Check_ERROR_MSG = {
    required: '필수 정보입니다.',
    invalid: '비밀번호가 일치하지 않습니다.',
}

//(공통)모든 필드의 값은 빠짐 없이 입력해야 합니다.
//5~20자. 영문 소문자, 숫자. 특수기호(_),(-)만 사용 가능
const checkIdValidation = (value) => {
    let isValidId
    if (value.length === 0) {
        isValidId = 'required'
    } else {
        isValidId = ID_REGEX.test(value) ? true : 'invalid'
    }

    //3.커스텀 에러 메시지
    //(1)비어있을떄 / (2)유효하지 않은 값일떄
    // input 테그에 border-red-600 class 추가 & -msg div에 에러 메시지 추가
    if (isValidId !== true) {
        //isvalidId -> invalid, required
        $id.classList.add('border-red-600')
        $idMsg.innerText = ID_ERROR_MSG[isValidId]
    } else {
        $id.classList.remove('border-red-600')
        $idMsg.innerText = ''
    }
}
// 8~16자. 영문 대/소문자, 숫자 사용 가능
const checkPwValidation = (value) => {
    let isValidPw

    if (value.length === 0) {
        isValidPw = 'required'
    } else {
        isValidPw = PW_REGEX.test(value) ? true : 'invalid'
    }
    if (isValidPw !== true) {
        //isvalidId -> invalid, required
        $pw.classList.add('border-red-600')
        $pwMsg.innerText = PW_ERROR_MSG[isValidPw]
    } else {
        $pw.classList.remove('border-red-600')
        $pwMsg.innerText = ''
    }
}

//비밀번호랑 일치
const checkPwCheckValidation = (value) => {
    let isValidPwCheck

    if (value.length === 0) {
        isValidPwCheck = 'required'
    } else {
        isValidPwCheck = $pw.value === value ? true : 'invalid'
    }
    if (isValidPwCheck !== true) {
        //isvalidId -> invalid, required
        $pwCheckMsg.classList.add('border-red-600')
        $pwCheckMsg.innerText = PW_Check_ERROR_MSG[isValidPwCheck]
    } else {
        $pwCheckMsg.classList.remove('border-red-600')
        $pwCheckMsg.innerText = ''
    }
}

$id.addEventListener('focusout', () => checkIdValidation($id.value))
$pw.addEventListener('focusout', () => checkPwValidation($pw.value))
$pwCheck.addEventListener('focusout', () =>
    checkPwCheckValidation($pwCheck.value)
)
$submit.addEventListener('click', (e) => {
    e.preventDefault()
    checkIdValidation($id.value)
    checkPwValidation($pw.value)
    checkPwCheckValidation($pwCheck.value)
})
