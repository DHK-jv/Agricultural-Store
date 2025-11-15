// Form validation rules
const validationRules = {
    required: (value) => {
        return value !== null && value !== undefined && value.toString().trim() !== '';
    },
    
    email: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    },
    
    password: (value) => {
        // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(value);
    },
    
    phone: (value) => {
        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        return phoneRegex.test(value);
    },
    
    minLength: (value, length) => {
        return value.length >= length;
    },
    
    maxLength: (value, length) => {
        return value.length <= length;
    },
    
    numeric: (value) => {
        return !isNaN(value) && !isNaN(parseFloat(value));
    },
    
    match: (value, fieldValue) => {
        return value === fieldValue;
    }
};

// Form validator class
class FormValidator {
    constructor(form) {
        this.form = form;
        this.errors = new Map();
    }

    // Validate a single field
    validateField(field, rules) {
        const value = field.value;
        const errors = [];

        for (const [rule, condition] of Object.entries(rules)) {
            if (rule === 'required' && condition && !validationRules.required(value)) {
                errors.push('This field is required');
            }
            else if (rule === 'email' && condition && !validationRules.email(value)) {
                errors.push('Please enter a valid email address');
            }
            else if (rule === 'password' && condition && !validationRules.password(value)) {
                errors.push('Password must contain at least 8 characters, including uppercase, lowercase, number and special character');
            }
            else if (rule === 'phone' && condition && !validationRules.phone(value)) {
                errors.push('Please enter a valid phone number');
            }
            else if (rule === 'minLength' && !validationRules.minLength(value, condition)) {
                errors.push(`Minimum ${condition} characters required`);
            }
            else if (rule === 'maxLength' && !validationRules.maxLength(value, condition)) {
                errors.push(`Maximum ${condition} characters allowed`);
            }
            else if (rule === 'numeric' && condition && !validationRules.numeric(value)) {
                errors.push('Please enter a valid number');
            }
            else if (rule === 'match') {
                const matchField = this.form.querySelector(`[name="${condition}"]`);
                if (matchField && !validationRules.match(value, matchField.value)) {
                    errors.push(`Must match ${condition}`);
                }
            }
        }

        this.errors.set(field.name, errors);
        return errors.length === 0;
    }

    // Validate entire form
    validateForm(validationConfig) {
        let isValid = true;

        for (const [fieldName, rules] of Object.entries(validationConfig)) {
            const field = this.form.querySelector(`[name="${fieldName}"]`);
            if (field && !this.validateField(field, rules)) {
                isValid = false;
            }
        }

        return isValid;
    }

    // Show validation errors
    showErrors() {
        this.clearErrors();

        this.errors.forEach((errors, fieldName) => {
            if (errors.length > 0) {
                const field = this.form.querySelector(`[name="${fieldName}"]`);
                const errorContainer = document.createElement('div');
                errorContainer.className = 'validation-error';
                errorContainer.innerHTML = errors.join('<br>');
                field.parentNode.insertBefore(errorContainer, field.nextSibling);
                field.classList.add('error');
            }
        });
    }

    // Clear validation errors
    clearErrors() {
        const errorElements = this.form.querySelectorAll('.validation-error');
        errorElements.forEach(element => element.remove());
        
        const errorFields = this.form.querySelectorAll('.error');
        errorFields.forEach(field => field.classList.remove('error'));
    }
}

// Form utilities
const formUtils = {
    // Serialize form data to object
    serialize(form) {
        const formData = new FormData(form);
        const data = {};
        
        for (const [key, value] of formData.entries()) {
            if (data[key]) {
                if (!Array.isArray(data[key])) {
                    data[key] = [data[key]];
                }
                data[key].push(value);
            } else {
                data[key] = value;
            }
        }
        
        return data;
    },

    // Reset form
    reset(form) {
        form.reset();
        const validator = new FormValidator(form);
        validator.clearErrors();
    },

    // Disable/enable form submission
    toggleSubmit(form, disabled = true) {
        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.disabled = disabled;
        }
    }
};

export {
    FormValidator,
    formUtils,
    validationRules
};