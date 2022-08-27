const $ = document.querySelector.bind(document)
// Get element from HTML

var hasValue = false

// Handle Validators
function Validator(selector) {
    var _this =  this
    function getParent (element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement
            } 
            element = element.parentElement
        }
    }
    var formRules = {}
    var validatorRules ={
        required: (value) => {
            return value ? undefined : 'vui long nhap truong nay'
        },
         email: (value) => {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value) ? undefined : 'vui long nhap email'
        },
        min: (min) => {
            return function (value) {
                return value.length >= min ? undefined :`mat khau toi thieu co ${min} ki tu`
            }

        }
    }
    // Get form element in DOM
    var formElement = document.querySelector(selector)
    // Handle when has element in DOm
    if (formElement) {
        var inputs = formElement.querySelectorAll('[name][rules]')
        // Get all function rule
        for ( var input of inputs) {
            var rules = input.getAttribute('rules').split('|')
            for (var rule of rules) {
                var ruleInfo
                // get function min
                var isRuleHasValue = rule.includes(':')
                
                // console.log(ruleFunc)
                if (isRuleHasValue) {
                    ruleInfo = rule.split(':')
                    rule = ruleInfo[0]
                }
                var ruleFunc = validatorRules[rule]
                if (isRuleHasValue) {
                    ruleFunc = ruleFunc(ruleInfo[1])
                }
                // Push function into Array of formRules
                if (Array.isArray(formRules[input.name])) {
                    formRules[input.name].push(ruleFunc)
                } else {
                    formRules[input.name] =[ruleFunc]
                }
            }
            input.onblur = handleValidate
            input.oninput = handleClearError
            
            // Handle validate
            function handleValidate (event) {
                var rules = formRules[event.target.name]
                var errorMessage
                for (var rule of rules ) {
                    errorMessage = rule(event.target.value)
                    if (errorMessage) {
                        break;
                    }
                }                      
                //  If has error
                if (errorMessage) {
                    var formGroup = getParent(event.target, '.form-group')
                    if (formGroup) {
                        formGroup.classList.add('invalid')
                        var formMessage = formGroup.querySelector('.form-message')
                        formMessage.innerText = errorMessage
                    }
                }

             return !errorMessage
            }
            function handleClearError (event) {
                var formGroup = getParent(event.target, '.form-group')
                if (formGroup.classList.contains('invalid')) {
                    formGroup.classList.remove('invalid')
                    formGroup.querySelector('.form-message').innerText =''
                }
            }
        }
    }
    // Handle submit event
    
    const confirmBtn = formElement.nextElementSibling.nextElementSibling.querySelector('.btn--primary')
    confirmBtn.onclick = function (event) {
        // event.preventDefault()
        var isValid = true
        var inputs = formElement.querySelectorAll('[name][rules]')
        for ( var input of inputs) {
          if  (!handleValidate({ target: input })) {
            isValid =false;
          }
        }
        // When no error
        if (isValid) {
            hasValue =true
            if (hasValue) {
                if (confirmBtn.innerText === "ĐĂNG KÝ") {
                    modal.style.display = ' none'
                }
                else {
                    login.onclick = () => {
                        loginAccount()
                    }
                }
            }
            if ( typeof _this.onSubmit === 'function') {
                var data
                var enabledInputs = formElement.querySelectorAll('[name]')
                data = Array.from(enabledInputs).reduce( (values, input) => {
                    switch (input.type) {
                        case 'radio':
                            if (input.matches(':checked')) {
                                values[input.name] = formElement.querySelector('input[name="' + input.name + '"]');
                            } else values[input.name] = ''
                            break;
                        case 'checkbox':
                            if (!input.matches(':checked')) return values
                            if (!Array.isArray(values[input.name])) {
                                values[input.name] = []
                            }
                            value[input.name].push(input.value)
                            break
                        case 'file':
                            value[input.name] =input.files
                        default:
                            values[input.name] = input.value
                    }
                    return  values;
                },{})
                _this.onSubmit(data)
            }
             
        }
    }
}

const loginBtn = $('.header__navbar-item-bold-2')
const registerBtn = $('.header__navbar-item-bold-1')
const form_register = $('#form-register')
const form_login = $('#form-login')
const modal = $('.modal')
const changeFormLogin = $('.auth-form__switch-btn-1')
const changeFormRegister = $('.auth-form__switch-btn-2')
const userAccount = $('.header__navbar-user')
const logOutBtn =$('.log-out')
const login = form_login.querySelector('.btn--primary')
const register = form_register.querySelector('.btn--primary')
var userAccounts = [
    {
        id:1,
        email: 'tinh@gmail.com',
        password: '1234'
    }
]


// Handle Login
function handleLogin() {
    loginBtn.onclick = () => {
        loginAndRegister(form_login, form_register)
    }
    changeFormRegister.onclick = () => {
        loginAndRegister(form_register, form_login)
    }

}

// Handle Login Account
function loginAccount() {
    const email = form_login.querySelector('input[name="email"]').value
    const password = form_login.querySelector('input[name="password"]').value
    var hasAccount = userAccounts.some(userAccount =>{
        return email === userAccount.email && password === userAccount.password
    })
    if (hasAccount) {
        modal.style.display = 'none'
        registerBtn.style.display = 'none'
        loginBtn.style.display = 'none'
        userAccount.style.display = 'flex'
    }
}
// handle log out
function logOut() {
    logOutBtn.onclick = function() {
        registerBtn.style.display = 'block'
        loginBtn.style.display = 'block'
        userAccount.style.display = 'none'
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

// Function Handle Login And Register
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
    logOut()

    handleLogin()

    handleRegister()

    Validator('#register-form')

    Validator('#login-form')
   
}
start()



