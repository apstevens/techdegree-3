const otherJob = document.getElementById('other-job-role');
const shirtColors = document.querySelector('.shirt-colors');
const jobTitle = document.getElementById('title');
const form = document.querySelector('#register');
const nameInput = document.getElementById('name');
const email = document.querySelector('#email');
const colorSelect = document.getElementById('color');
const activityRegister = document.querySelector('#activities');
const activityHint = document.getElementById('activities-hint');
const activityBox = document.getElementById('activities-box');
const checkboxes = document.querySelectorAll('.activities input');
const paymentSelect = document.getElementById('payment');
const creditCardOption = document.getElementById('credit-card');
const creditCardNumber = document.getElementById('cc-num');
const cvvNumber = document.getElementById('cvv');
const zipInput = document.getElementById('zip');
const zipBox = document.getElementById('zip-box');
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
    const choice = document.querySelectorAll('#color option');

    shirtColors.style.display = 'none';

    design.addEventListener('change', () => {

        for (let i = 0; i < choice.length; i++){
            const option = choice[i];
            const optionTheme = choice[i].getAttribute('data-theme');
            const design_choice = design.value;

            if (optionTheme === design_choice) {
                console.log(option)
                shirtColors.style.display = 'block';
                option.hidden = false;
            } else {
                option.hidden = true;
            }
        }

        colorSelect[0].style.display = 'block';
        colorSelect[0].selected = true;
        
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

    console.log(totalCost);

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
                        cb.disabled = true;
                    }
                });
            } else {
                checkboxes.forEach(cb => {
                    if (cb.name !== checkbox.name && cb.dataset.dayAndTime === checkbox.dataset
                        .dayAndTime) {
                        cb.parentElement.classList.remove('disabled');
                        cb.classList.remove('disabled');
                        cb.disabled = false;
                    }
                });
            }
        } else {
            e.target.checked = false;
        }
    });
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

const nameValidator = () => {

    const nameValue = nameInput.value;
    
    let nameIsValid = /^$/.test(nameValue);

    console.log(nameIsValid);

    if (nameIsValid) {
        nameInput.parentElement.lastElementChild.innerHTML = `Name cannot be blank`;
        return false;
    } else {
        nameInput.parentElement.lastElementChild.innerHTML = `Name cannot contain numbers`;
    }

    nameIsValid = /^[a-zA-z]+ ?[a-zA-z]*? ?[a-zA-z]*?$/.test(nameValue);

    return nameIsValid;
}

const emailValidator = () => {
    const emailValue = email.value;

    let emailIsValid = /^$/.test(emailValue);

    console.log(emailIsValid);

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

    activityBox.parentElement.lastElementChild.innerHTML = `Please select at least one activity`;
    
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

const zipValidator = () => {
    const zipValue = zipInput.value;

    let zipIsValid = /^$/.test(zipValue);

    if ( zipIsValid ) {
        zipInput.parentElement.lastElementChild.innerHTML = `Zip Code cannot be blank`;
        return false;
    } else {
        zipInput.parentElement.lastElementChild.innerHTML = 'Zip Code should contain 5 digits';
    }

    zipIsValid = /\D+/.test(zipValue);

    if ( zipIsValid ) {
        zipInput.parentElement.lastElementChild.innerHTML = `Zip Code must contain numbers only`;
        return false;
    } else {
        zipInput.parentElement.lastElementChild.innerHTML = 'Zip Code should contain 5 digits';
    }

    zipIsValid = /^\d{5}$/.test(zipValue);

    return zipIsValid;
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

    cvvIsValid = /\D+/.test(cvvValue);

    if (cvvIsValid) {
        cvvNumber.parentElement.lastElementChild.innerHTML = `CVV can only contain numbers`;
        return false;
    } else {
        cvvNumber.parentElement.lastElementChild.innerHTML = `CVV must be 3 digits`;
    }

    cvvIsValid = /^\d{3}$/.test(cvvValue);

    return cvvIsValid;
}

const errors = ( elem, bool = true ) => {

    if ( bool ) {
        elem.parentElement.classList.add('not-valid');
        elem.parentElement.classList.remove('valid');
        elem.parentElement.lastElementChild.style.display = 'block';
    } else {
        elem.parentElement.classList.add('valid');
        elem.parentElement.classList.remove('not-valid');
        elem.parentElement.lastElementChild.style.display = 'none';
    }
}

form.addEventListener('submit', (e) => {

    if (!nameValidator()) {
        e.preventDefault();
        errors(nameInput, true);
    } else {
        errors(nameInput, false);
    }

    if (!emailValidator()) {
        e.preventDefault();
        errors(email, true);
    } else {
        errors(email, false);
    }

    if (!activityValidator()) {
        e.preventDefault();
        errors(activityBox, true);
    } else {
        errors(activityBox, false);
    }

    if (!cardValidator()) {
        e.preventDefault();
        errors(creditCardNumber, true);
    } else {
        errors(creditCardNumber, false);
    }

    if (!zipValidator()) {
        e.preventDefault();
        errors(zipInput, true);
    } else {
        errors(zipInput, false);
    }

    if (!cvvValidator()) {
        e.preventDefault();
        errors(cvvNumber, true);
    } else {
        errors(cvvNumber, false);
    }

});

nameInput.addEventListener('keyup', e => {
   
    if (!nameValidator() && e.target === nameInput) {
        errors(nameInput, true);
    } else if ( e.target === nameInput) {
        errors(nameInput, false);
    }
});

email.addEventListener( 'keyup', e => {
    
    if (!emailValidator() && e.target === email) {
        errors(email, true);
    } else if (e.target === email) {
        errors(email, false);
    }
});

activityBox.addEventListener( 'change', e => {
    
    if ( activityValidator() ) {
        errors( activityBox, true );
    } else {
        errors( activityBox, false );
    }
});

creditCardNumber.addEventListener( 'keyup', e => {
    if (!cardValidator() && e.target === creditCardNumber) {
        errors(creditCardNumber, true);
    } else if (e.target === creditCardNumber) {
        errors(creditCardNumber, false);
    }
});

zipInput.addEventListener('keyup', e => {
    if (!zipValidator() && e.target === zipInput) {
        errors(zipInput, true);
    } else if (e.target === zipInput) {
        errors(zipInput, false);
    }
});

cvvNumber.addEventListener('keyup', e => {
    if (!cvvValidator() && e.target === cvvNumber) {
        errors(cvvNumber, true);
    } else if (e.target === cvvNumber) {
        errors(cvvNumber, false);
    }
});

shirtDesign();