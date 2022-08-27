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
    formElement.onsubmit = function (event) {
        event.preventDefault()
        var isValid = true
        var inputs = formElement.querySelectorAll('[name][rules]')
        for ( var input of inputs) {
          if  (!handleValidate({ target: input })) {
            isValid =false;
          }
        }
        // When no error
        if (isValid) {
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