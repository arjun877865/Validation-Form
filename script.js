const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const address = document.getElementById('address');
const resume = document.getElementById('resume');

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.classList.add('error');
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.classList.remove('error');
  formControl.classList.add('success');
}

// Check email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Please enter a valid email');
  }
}

// Check phone number is valid
function checkPhone(input) {
  const re = /^[0-9]{3}-[0-9]{7}$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Please enter a valid phone number (e.g., 123-4567890)');
    
    
    
  }
}

// Check required fields
function checkRequired(inputArr) {
  let isRequired = false;
  inputArr.forEach(function(input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
      isRequired = true;
    } else {
      showSuccess(input);
    }
  });

  return isRequired;
}

// Check file type and size for resume
function checkResume(input) {
  const allowedExtensions = ['pdf', 'docx'];
  const maxSizeMB = 5; // 5 MB
  const file = input.files[0];
  const fileName = file.name;
  const fileSizeMB = file.size / (1024 * 1024);

  const fileExtension = fileName.split('.').pop().toLowerCase();

  if (!allowedExtensions.includes(fileExtension)) {
    showError(input, 'Only PDF and DOCX files are allowed');
  } else if (fileSizeMB > maxSizeMB) {
    showError(input, 'File size exceeds the limit of 5 MB');
  } else {
    showSuccess(input);
  }
}

// Get fieldname
function getFieldName(input) {
  return input.previousElementSibling.innerText.replace(':', '');
}

// Check form validity
function checkFormValidity() {
  const inputs = [username, email, phone, address, resume];
  let isValid = true;

  inputs.forEach(input => {
    if (input.id === 'email') {
      checkEmail(input);
    } else if (input.id === 'phone') {
      checkPhone(input);
    } else if (input.id === 'resume') {
      checkResume(input);
    } else {
      if (input.value.trim() === '') {
        showError(input, `${getFieldName(input)} is required`);
        isValid = false;
      } else {
        showSuccess(input);
      }
    }
  });

  return isValid;
}

// Enable submit button if form is valid
function enableSubmitButton() {
  const submitButton = document.querySelector('button[type="submit"]');
  const isValid = checkFormValidity();
  submitButton.disabled = !isValid;
}

// Event listeners
form.addEventListener('submit', function(e) {
  e.preventDefault();
  checkFormValidity();
});

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.classList.remove('error');
    formControl.classList.add('success');
    const small = formControl.querySelector('small');
    small.innerText = '';
  }

form.addEventListener('input', enableSubmitButton);
form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (checkFormValidity()) {
      window.location.href = 'welcome.html'; // Redirect to welcome.html if form is valid
    }
  });