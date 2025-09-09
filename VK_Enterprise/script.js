const steps = document.querySelectorAll('.form-step');
const progressSteps = document.querySelectorAll('.progress-step');
let currStep = 0;

const application = {
  fullName: "",
  dob: "",
  gender: "",
  email: "",
  phone: "",
  address: "",
  education: "",
  experience: "",
  skills: ""
};

// Key fields in each step (in order)
const stepFields = [
  ['fullName', 'dob', 'gender'],
  ['email', 'phone', 'address'],
  ['education', 'experience', 'skills']
];

document.querySelectorAll('.next-btn').forEach(btn => btn.addEventListener('click', nextStep));
document.querySelectorAll('.back-btn').forEach(btn => btn.addEventListener('click', prevStep));

// Ensures up-to-date preview every time Review step is entered
function nextStep(e) {
  if (!validateCurrentStep()) return;
  if (currStep < steps.length - 1) currStep++;
  updateForm();
  if (currStep === 3) showReview();
}
function prevStep(e) {
  if (currStep > 0) currStep--;
  updateForm();
}
function updateForm() {
  steps.forEach((step, idx) => step.classList.toggle('active', idx === currStep));
  progressSteps.forEach((el, idx) => el.classList.toggle('active', idx === currStep));
}
function validateCurrentStep() {
  const current = steps[currStep];
  let valid = true;
  const groups = current.querySelectorAll('.input-group');
  groups.forEach(group => {
    const input = group.querySelector('input, select, textarea');
    if (input && input.required) {
      let msg = "";
      if (!input.value.trim()) msg = "This field is required.";
      else if (input.type === "email" && !/^\S+@\S+\.\S+$/.test(input.value))
        msg = "Enter a valid email.";
      else if (input.type === "tel" && !/^\d{10}$/.test(input.value.replace(/\D/g, "")))
        msg = "Enter 10 digit number.";
      group.querySelector(".error-message").textContent = msg;
      if (msg) valid = false;
      else group.querySelector(".error-message").textContent = "";
      application[input.name] = input.value.trim();
    }
  });
  return valid;
}
function showReview() {
  // Always pull *current* values from the inputs (not the last-saved in 'application' object only)
  // Then render them beautifully
  let html = '';
  html += `<div><strong>Full Name:</strong> ${getInputValue('fullName')}</div>`;
  html += `<div><strong>Date of Birth:</strong> ${getInputValue('dob')}</div>`;
  html += `<div><strong>Gender:</strong> ${getInputValue('gender')}</div>`;
  html += `<div><strong>Email:</strong> ${getInputValue('email')}</div>`;
  html += `<div><strong>Phone:</strong> ${getInputValue('phone')}</div>`;
  html += `<div><strong>Address:</strong> ${getInputValue('address')}</div>`;
  html += `<div><strong>Highest Education:</strong> ${getInputValue('education')}</div>`;
  html += `<div><strong>Experience:</strong> ${getInputValue('experience')} years</div>`;
  html += `<div><strong>Key Skills:</strong> ${getInputValue('skills')}</div>`;
  document.querySelector('.review-details').innerHTML = html;
}

function getInputValue(field) {
  const el = document.querySelector(`[name="${field}"]`);
  return el ? el.value.trim() : '';
}

document.getElementById('applicationForm').addEventListener('submit', e => {
  e.preventDefault();
  // No additional action needed. Confirmation is shown.
});
