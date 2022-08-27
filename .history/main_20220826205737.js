const $ = document.querySelector.bind(document)
// Get element from HTML
const loginBtn = $('.header__navbar-item-bold-2')
const registerBtn = $('.header__navbar-item-bold-1')
const form_register = $('#form-register')
const form_login = $('#form-login')
const modal = $('.modal')
// Handle Login 
function handleLogin() {
    loginBtn.onclick = function () {
        loginAndRegister(form_login, form_register)
    }
}
function handleRegister() {
    registerBtn.onclick = function () {
        modal.style.display = 'flex'
        form_1.style.display = 'block'
        form_2.style.display = 'none'

    }
    form_1.onclick = function (e) {
        e.stopPropagation()
    }
    modal.onclick = function (e) {
        modal.style.display = 'none'
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