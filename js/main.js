const socialButtons = document.querySelectorAll('.tcSocialSignIn button');
const signInForm  = document.querySelector('.tcCard form');
const fields = [
  { input: document.getElementById('username'), message: 'Please enter your username.' },
  { input: document.getElementById('password'), message: 'Please enter your password.' }
];

function handleClick(event){
  window.location.href = 'inprogress.html';
}

function showError(input, message) {
  const error = document.getElementById(input.id + '-error');
  error.textContent = message;
  error.hidden = false;
  input.setAttribute('aria-invalid', 'true');
}

function clearError(input) {
  const error = document.getElementById(input.id + '-error');
  error.textContent = '';
  error.hidden = true;
  input.removeAttribute('aria-invalid');
}

socialButtons.forEach((button) => {
  button.addEventListener('click', handleClick );
});


if (signInForm) {
  signInForm.addEventListener('submit', (event) => {
    event.preventDefault();   

    let firstInvalid = null;

    fields.forEach(({ input, message }) => {
      if (input.value.trim() === '') {
        showError(input, message);
        if (!firstInvalid) firstInvalid = input;
      } else {
        clearError(input);
      }
    });

    if (firstInvalid) {
      firstInvalid.focus();   // takes the user (and screen reader) to the first problem
      return;
    }

    handleClick();
  });

  fields.forEach(({ input }) => {
    input.addEventListener('input', () => {
      if (input.value.trim() !== '') clearError(input);
    });
  });
}