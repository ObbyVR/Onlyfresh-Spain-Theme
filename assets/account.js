class TogglePassword extends HTMLElement {
  constructor() {
    super();
    this.input = this.querySelector('input');
    this.eye = this.querySelector('.eye');
    this.eye.addEventListener('click', this.togglePassword.bind(this));
  }

  togglePassword() {
    if (this.input.type == 'password') {
      this.input.type = 'text';
      this.eye.classList.add('active');
    } else {
      this.input.type = 'password';
      this.eye.classList.remove('active');
    }
  }
}

customElements.define('toggle-password', TogglePassword);

class CustomForm extends HTMLElement {
  constructor() {
    super();
    this.form = this.querySelector('form');
    this.buttonSubmit = this.form.querySelector('button[data-name="submit"]')
    this.buttonSubmit && this.buttonSubmit.addEventListener('click', this.onFormSubmit.bind(this));
    this.inputName = this.form.querySelector('input[name="customer[first_name]"]');
    this.inputEmail = this.form.querySelector('input[name="customer[email]"]');
    this.inputPhone = this.form.querySelector('input[name="customer[note][phone]"]');
    this.inputPassword = this.form.querySelector('input[name="customer[password]"]');
    this.inputPasswordConfirm = this.form.querySelector('input[name="customer[password_confirmation]"]');
    this.inputMarketing = this.form.querySelector('input[name="customer[accepts_marketing]"]');


    if(this.inputName) {
      this.inputName.addEventListener('input', this.validateNameOnChange.bind(this, this.inputName));
    }
    if(this.inputEmail) {
      this.inputEmail.addEventListener('input', this.validateEmailOnChange.bind(this, this.inputEmail));
    }
    if(this.inputPhone) {
      this.inputPhone.addEventListener('input', this.validatePhoneNumberOnChange.bind(this, this.inputPhone));
    }
    if(this.inputPassword) {
      this.inputPassword.addEventListener('input', this.validatePasswordOnChange.bind(this, this.inputPassword));
    }
    if(this.inputPasswordConfirm) {
      this.inputPasswordConfirm.addEventListener('input', this.validatePasswordConfirmOnChange.bind(this, this.inputPasswordConfirm));
    }
    if(this.inputMarketing) {
      this.inputMarketing.addEventListener('input', this.validateMarketingOnChange.bind(this, this.inputMarketing));
    }
  }

  onFormSubmit(e) {
    e.preventDefault();
    const formFields = this.querySelectorAll('input, select, textarea');
    let isValid = true;

    formFields.forEach(field => {
      const fieldName = field.dataset.name;
      const fieldValue = field.value.trim();
      switch (fieldName) {
        case 'email':
          const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(fieldValue)) {
            isValid = false;
            field.setAttribute('aria-invalid', true);
          }
          break;
        case 'name':
          const nameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ-' ]+$/;
          if (!nameRegex.test(fieldValue)) {
            isValid = false;
            field.setAttribute('aria-invalid', true);
          }
          break;
        case 'phone':
          const phoneRegex = /^(\+?\d+[\s\-]*)+$/;
          if (!phoneRegex.test(fieldValue)) {
            isValid = false;
            field.setAttribute('aria-invalid', true);
          }
          break;
        case 'marketing':
          if (!field.checked) {
            isValid = false;
            this.querySelector(".marketing-field .form__message").classList.remove('hidden')
          }
          break;
        case 'password':
          if (this.querySelector('input[name="customer[password_confirmation]"]') && this.querySelector('input[name="customer[password]"]').value != this.querySelector('input[name="customer[password_confirmation]"]').value) {
            isValid = false;
            this.querySelector('input[name="customer[password]"]').setAttribute('aria-invalid', true);
            this.querySelector('input[name="customer[password_confirmation]"]').setAttribute('aria-invalid', true);
          }
          break;
      }
    });

    if (isValid) {
      this.form.submit();
    }
  }

  validateEmailOnChange(email) {
    email.removeAttribute('aria-invalid')
    if(this.querySelector('.form-error')) {
      this.querySelector('.form-error').remove();
    }
    if(email.closest('.field') && email.closest('.field').querySelector('form__message')) {
      email.closest('.field').querySelector('form__message').remove();
    }
    const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(email.value)) {
      email.setAttribute('aria-invalid', false);
    } else {

    }
  }

  validateNameOnChange(name) {
    name.removeAttribute('aria-invalid')
    const nameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ-' ]+$/;
    if (nameRegex.test(name.value)) {
      name.setAttribute('aria-invalid', false);
    }
  }

  validatePhoneNumberOnChange(phone) {
    phone.removeAttribute('aria-invalid')
    const phoneRegex = /^(\+?\d+[\s\-]*)+$/;
    if (phoneRegex.test(phone.value)) {
      phone.setAttribute('aria-invalid', false);
    }
  }

  validatePasswordOnChange(password) {
    password.removeAttribute('aria-invalid')
  }

  validatePasswordConfirmOnChange(password) {
    password.removeAttribute('aria-invalid')
    if (this.querySelector('input[name="customer[password]"]').value == password.value) {
      password.setAttribute('aria-invalid', false);
      this.querySelector('input[name="customer[password]"]').setAttribute('aria-invalid', false);
    }
  }

  validateMarketingOnChange(marketing) {
    if (marketing.checked) {
      this.querySelector(".marketing-field .form__message").classList.add('hidden');
    }
  }
}

customElements.define('custom-form', CustomForm);