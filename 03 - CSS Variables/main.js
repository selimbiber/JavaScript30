const INPUTS = document.querySelectorAll('input');

function handleUpdate () {
    const SUFFIX = this.dataset.sizing || '';
    document.documentElement.style.setProperty(`--${this.name}`, this.value + SUFFIX);
}

INPUTS.forEach(input => input.addEventListener('change', handleUpdate));
INPUTS.forEach(input => input.addEventListener('mousemove', handleUpdate));