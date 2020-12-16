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

    console.log(design);
    console.log(color);
    console.log(choice)

    color.disabled = true;

    design.addEventListener('change', (e) => {

        for (let i = 0; i < design.length; i++){
            let option = e.target.value;
            let design_choice = design[i];

            console.log(option);
            console.log(design_choice);

            if (option === design_choice[1]) {
                color.disabled = false;
            }
        }
        
    });
}

shirtDesign();