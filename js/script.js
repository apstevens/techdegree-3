const otherJob = document.getElementById('other-job-role');
const jobTitle = document.getElementById('title');

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
            const option = choice[i].getAttribute('data-theme');
            const design_choice = design.value;

            console.log(option);
            // console.log(design_choice);

            if (option === design_choice) {
                option.selected = true;
            }
        }
        
    });
}

shirtDesign();