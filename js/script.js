const otherJob = document.getElementById('other-job-role');
const jobTitle = document.getElementById('title');
const form = document.querySelector('#register');
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const activityRegister = document.querySelector('#activities');
const checkboxes = document.querySelectorAll('.activities input');
let totalCost = document.getElementById('activities-cost');
let total = 0;

window.onload = () => {
    document.getElementById('name').focus();
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

    // Store the data-cost attribute of the input that was clicked
    const clickedCost = clicked.getAttribute('data-cost');

    console.log(clicked);
    console.log(clickedCost);

    if (clicked) {
        total = clicked + clickedCost;
    } else {
        total = clicked - clickedCost;
    }

    totalCost.innerHTML = `Total: $${total}`;

    // for(let i = 0; i < checkboxes.length; i++) {
    //     const checkboxType = checkboxes[i].getAttribute('data-cost');

    //     console.log(checkboxType);

    //     if (clicked) {
    //         total += checkboxType;

    //     } else if (total > 0) {
    //         total -= checkboxType;
    //     }

    //     totalCost.innerHTML = `Total: $${total}`;
    // }

});

const nameValidator = () => {
    
    // Get the value of the name field
    const nameValue = name.value;

    if (nameValue == "" || nameValue == null) {
        document.getElementById('name-id');
    }

    const nameIsValid = /^[a-zA-z]+ ?[a-zA-z]*? ?[a-zA-z]*?$/.test(nameValue);

    console.log(nameValue);

    // Check that the name is valid
    
    return nameIsValid;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    nameValidator();
});

shirtDesign();