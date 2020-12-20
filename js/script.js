const otherJob = document.getElementById('other-job-role');
const jobTitle = document.getElementById('title');
const form = document.querySelector('#register');
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const activityRegister = document.querySelector('#activities');
const activityHint = document.getElementById('activities-hint');
const activityBox = document.getElementById('activities-box');
const checkboxes = document.querySelectorAll('.activities input');
const paymentSelect = document.getElementById('payment');
const creditCardOption = document.getElementById('credit-card');
const creditCardNumber = document.getElementById('cc-num');
const cvvNumber = document.getElementById('cvv');
const creditCardBox = document.querySelector('.credit-card-box');
const paypalOption = document.getElementById('paypal');
const bitcoinOption = document.getElementById('bitcoin');
let totalCost = document.getElementById('activities-cost');
let total = 0;

// Onload brings elements into focus and selects credit card by default.
window.onload = () => {
    document.getElementById('name').focus();
    paymentSelect[1].selected = true;
    creditCardOption.style.display = 'block';
    paypalOption.style.display = 'none';
    bitcoinOption.style.display = 'none';
}


otherJob.style.display = 'none';
jobTitle.addEventListener('change', () => {
    if (jobTitle.value === 'other') {
        otherJob.style.display = 'block';
        otherJob.focus();
    }
    else {
        otherJob.style.display = 'none';
    }
});

const shirtDesign = () => {
    const design = document.querySelector('#design');
    const color = document.querySelector('#color');
    const choice = document.querySelectorAll('#color option');

    // console.log(design);
    // console.log(color);
    // console.log(choice)

    color.disabled = true;

    design.addEventListener('change', () => {

        color.disabled = false;

        for (let i = 0; i < choice.length; i++){
            const option = choice[i];
            const optionTheme = choice[i].getAttribute('data-theme');
            const design_choice = design.value;

            console.log(optionTheme);

            if (optionTheme === design_choice) {
                console.log(option)
                option.hidden = false;
            } else {
                option.hidden = true;
            }
        }
        
    });
}

// Event listener for checboxes
document.querySelector('.activities').addEventListener('change', e => {
    
    // Store checkebox input that was clicked
    const clicked = e.target;

    if (clicked.checked) {
        total += + clicked.dataset.cost;
    } else if (total > 0) {
        total -= + clicked.dataset.cost;
    }

    totalCost.innerHTML = `Total: $${total}`;

});

// Update payment selection 
const paymentChoice = e => {
    const paymentDiv = e;
    switch (paymentDiv){
        case 'credit-card':
            paypalOption.style.display = 'none';
            bitcoinOption.style.display = 'none';
            creditCardOption.style.display = 'block';
            break;
        case 'paypal':
            paypalOption.style.display = 'block';
            bitcoinOption.style.display = 'none';
            creditCardOption.style.display = 'none';
            break;
        case 'bitcoin':
            paypalOption.style.display = 'none';
            bitcoinOption.style.display = 'block';
            creditCardOption.style.display = 'none';
            break;
    }
}

// Select payment option from user choice
paymentSelect.addEventListener('change', e => {
    paymentChoice(e.target.value);
});

const errors = (elem, bool = true) => {
    if (bool) {
        elem.parentElement.classList.add('not-valid');
        elem.parentElement.classList.remove('valid');
        elem.parentElement.lastElementChild.style.display = 'block';
    } else {
        elem.parentElement.classList.add('valid');
        elem.parentElement.classList.remove('not-valid');
        elem.parentElement.lastElementChild.style.display = 'none';
    }
}

const nameValidator = () => {
    
    // Get the value of the name field
    const nameValue = name.value;

    const nameIsValid = /^[a-zA-z]+ ?[a-zA-z]*? ?[a-zA-z]*?$/.test(nameValue);

    return nameIsValid;
}

const emailValidator = () => {
    const emailValue = email.value;

    let emailIsValid = /^$/;

    if (emailIsValid) {
        email.parentElement.lastElementChild.innerHTML = `Please enter an email address`;
        return false;
    } else {
        email.parentElement.lastElementChild.innerHTML = `Email address must be correctly formatted e.g. jsmith@example.com`;
    }

    emailIsValid = /^(?:[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6})?$/.test(emailValue);

    return emailIsValid;
}

const activityValidator = () => {
    const activityIsValid = total > 0;

    !activityIsValid && console.log('Please select at least one activity');
    
    return activityIsValid;
}

const cardValidator = () => {
    const ccValue = creditCardNumber.value;

    let numberIsValid = /^$/.test(ccValue);

    if (numberIsValid) {
        creditCardNumber.parentElement.lastElementChild.innerHTML = `Please enter a card number`;
        return false;
    } else {
        creditCardNumber.parentElement.lastElementChild.innerHTML = `Please enter a valid credit card number between 13 - 16 digits`;
    }

    numberIsValid = /\D+/.test(ccValue);

    if (numberIsValid) {
        creditCardNumber.parentElement.lastElementChild.innerHTML = `Card number must contain numbers only`;
        return false;
    } else {
        creditCardNumber.parentElement.lastElementChild.innerHTML = `Please enter a valid credit card number between 13 - 16 digits`;
    }

    numberIsValid = /^4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11}$/.test(ccValue);

    return numberIsValid;
}

const cvvValidator = () => {
    const cvvValue = cvvNumber.value;

    let cvvIsValid = /^$/.test(cvvValue);

    if (cvvIsValid) {
        cvvNumber.parentElement.lastElementChild.innerHTML = `Please enter a valid CVV`;
        return false;
    } else {
        cvvNumber.parentElement.lastElementChild.innerHTML = `CVV must be 3 digits`;
    }

    cvvIsValid = /\D+/.test(emailValue);

    if (cvvIsValid) {
        cvvNumber.parentElement.lastElementChild.innerHTML = `CVV can only contain numbers`;
        return false;
    } else {
        cvvNumber.parentElement.lastElementChild.innerHTML = `CVV must be 3 digits`;
    }

     cvvIsValid = /^\d{3}$/.test(cvvValue);

    return cvvIsValid;
}


form.addEventListener('submit', (e) => {

    if (!nameValidator()) {
        e.preventDefault();
        errors(name);
    } else {
        errors(name, false);
    }

    if (!emailValidator()) {
        e.preventDefault();
        errors(email);
    } else {
        errors(email, false);
    }

    if (!activityValidator()) {
        e.preventDefault();
        errors(activityBox);
    } else {
        errors(activityBox, false);
    }

    if (!cardValidator()) {
        e.preventDefault();
        errors(creditCardNumber);
    } else {
        errors(creditCardNumber, false);
    }

    if (!cvvValidator()) {
        e.preventDefault();
        errors(cvvNumber);
    } else {
        errors(cvvNumber, false);
    }

});

// Foreach adding event listeners to checkboxes
checkboxes.forEach(checkbox => {
    // Focus class added to checkbox parent label
    checkbox.addEventListener('focus', e => {
        checkbox.parentElement.classList.add('focus');
    });

    // Focus class removed from parent label on blur event
    checkbox.addEventListener('blur', e => {
        checkbox.parentElement.classList.remove('focus');
    });

    // Listen for checkbox events
    checkbox.addEventListener('change', e => {
        // Prevents user from selecting activities with same date and time
        if (e.target.className !== 'disabled') {
            if (checkbox.checked) {
                checkboxes.forEach(cb => {
                    if (cb.name !== checkbox.name && cb.dataset.dayAndTime === checkbox.dataset
                        .dayAndTime) {
                        cb.parentElement.classList.add('disabled');
                        cb.classList.add('disabled');
                    }
                });
            } else {
                checkboxes.forEach(cb => {
                    if (cb.name !== checkbox.name && cb.dataset.dayAndTime === checkbox.dataset
                        .dayAndTime) {
                        cb.parentElement.classList.remove('disabled');
                        cb.classList.remove('disabled');
                    }
                });
            }
        } else {
            e.target.checked = false;
        }
    });
});

shirtDesign();