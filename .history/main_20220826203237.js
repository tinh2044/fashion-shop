const $ = document.querySelector.bind(document)
// Handle Login 
function handleLogin() {
    const loginBtn = $('.header__navbar-item-bold-2')
    const form_1 = $('#form-register')
    const form_2 = $('#form-login')
    const modal = $('.modal')
    loginBtn.onclick = function () {
        modal.style.display = 'flex'
    }
}













function start () {
    handleLogin()
}
start()