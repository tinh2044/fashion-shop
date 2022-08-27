const $ = document.querySelector.bind(document)
// Get element from HTML
const loginBtn = $('.header__navbar-item-bold-2')
const registerBtn = $('.header__navbar-item-bold-1')
const form_register = $('#form-register')
const form_login = $('#form-login')
const modal = $('.modal')
const changeFormLogin = $('.auth-form__switch-btn-1')
const changeFormRegister = $('.auth-form__switch-btn-2')
// Handle Login 
function handleLogin() {
    loginBtn.onclick = () => {
        loginAndRegister(form_login, form_register)
    }
    changeFormRegister.onclick = () => {
        loginAndRegister(form_register, form_login)
    }
    const login = form_login.querySelector('.btn--primary')
    console.log(login)
    login.onclick = () => {

    }

}

// Handle Register
function handleRegister() {
    registerBtn.onclick = () => {
        loginAndRegister(form_register, form_login)
    }
    changeFormLogin.onclick = () => {
        loginAndRegister(form_login, form_register)
    }
}
function loginAndRegister(form_1,form_2) {
    modal.style.display = 'flex'
    form_1.style.display = 'block'
    form_2.style.display = 'none'
    form_1.onclick = function (e) {
        e.stopPropagation()
    }
    modal.onclick = function (e) {
        modal.style.display = 'none'
    }
}













function start () {
    handleLogin()
    handleRegister()
}
start()