const otherJob = document.getElementById('other-job-role');
const jobTitle = document.getElementById('title');
const form = document.querySelector('#register');
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const activityRegister = document.querySelector('#activities');
const checkboxes = document.querySelectorAll('.activities input');
const paymentSelect = document.getElementById('payment');
const creditCardOption = document.getElementById('credit-card');
const creditCardNumber = document.getElementById('cc-num');
const paypalOption = document.getElementById('paypal');
const bitcoinOption = document.getElementById('bitcoin');
let totalCost = document.getElementById('activities-cost');
let total = 0;

// Onload brings elements into focus and selects credit card by default.
window.onload = () => {
    document.getElementById('name').focus();
    paymentSelect[1].selected = true;
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

    const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);

    return emailIsValid;
}

const activityValidator = () => {
    const activityIsValid = total > 0;
    !activityIsValid && console.log('Please select at least one activity.');
    return activityIsValid;
}

const cardValidator = () => {
    const ccValue = creditCardNumber.value;
    const numberIsValid = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/.test(ccValue);
    return numberIsValid;
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
        errors(activityRegister);
    } else {
        errors(activityRegister, false);
    }

    if (!cardValidator()) {
        e.preventDefault();
        errors(creditCardNumber);
    } else {
        errors(creditCardNumber, false);
    }

});

shirtDesign();