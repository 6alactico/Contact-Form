const form = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');
const textInputs = document.querySelectorAll('.text-input');
const radioButtons = form.querySelectorAll('input[type="radio"]');
const checkbox = form.querySelector('input[type="checkbox"]');

function validateInput(input) {
  const error = document.getElementById(input.dataset.errorId);
  const isInvalid = input.value.trim() === "" || input.validity.patternMismatch || input.validity.typeMismatch;
  input.classList.toggle('invalid', isInvalid);
  error.classList.toggle('active', isInvalid);
  return !isInvalid;
}

function validateRadio(radios) {
  const error = document.getElementById(radios[0].dataset.errorId);
  const isSelected = [...radios].some(r => r.checked);
  error.classList.toggle('active', !isSelected);

  radios.forEach(radio => {
    const wrapper = radio.closest('.radio-button');
    if (wrapper) {
        wrapper.classList.toggle('selected', radio.checked);
    }
  });

  return isSelected;
}

function validateCheckbox(checkbox) {
  const error = document.getElementById(checkbox.dataset.errorId);
  const isChecked = checkbox.checked;
  error.classList.toggle('active', !isChecked);
  return isChecked;
}

form.addEventListener ('submit', (e) => {
  e.preventDefault();
  let isValid = true;

  textInputs.forEach(input => { if (!validateInput(input)) isValid = false; });

  if (!validateRadio(radioButtons)) isValid = false;

  if (!validateCheckbox(checkbox)) isValid = false;
  
  if (isValid) {
    successMessage.classList.add('active');
    form.reset();

    radioButtons.forEach(radio => {
        const wrapper = radio.closest('.radio-button');
        if (wrapper) {
            wrapper.classList.remove('selected');
        }
    })
  }
});

textInputs.forEach(input => { input.addEventListener('input', () => validateInput(input)); });

radioButtons.forEach(button => {
  button.addEventListener('change', () => validateRadio(radioButtons));
});

checkbox.addEventListener('change', () => validateCheckbox(checkbox));