const $ = document.querySelector.bind(document)
// Get element from HTML
const loginBtn = $('.header__navbar-item-bold-2')
const form_1 = $('#form-register')
const form_2 = $('#form-login')
const modal = $('.modal')
// Handle Login 
function handleLogin() {
    loginBtn.onclick = function () {
        modal.style.display = 'flex'
        form_2.style.display = 'block'
        form_1.style.display = 'none'

    }
}













function start () {
    handleLogin()
}
start()