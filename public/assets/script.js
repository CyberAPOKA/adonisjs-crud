window.addEventListener('load', function() {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const submit = document.getElementById('submit');
    const formContainer = document.getElementById('form-container');

    function updateButtonVisibility() {
        if (email.value && password.value) {
            submit.classList.remove('hidden');
            submit.classList.add('flex');
            formContainer.classList.remove('rounded-2xl');
            formContainer.classList.add('rounded-l-2xl');
        } else {
            submit.classList.remove('flex');
            submit.classList.add('hidden');
            formContainer.classList.remove('rounded-l-2xl');
            formContainer.classList.add('rounded-2xl');
        }
    }

    updateButtonVisibility();

    email.addEventListener('input', updateButtonVisibility);
    password.addEventListener('input', updateButtonVisibility);
});