document.addEventListener('DOMContentLoaded', function () {
    const usernameInput = document.getElementById('reg-username');
    const passwordInput = document.getElementById('reg-password');
    const confirmInput = document.getElementById('reg-confirm');
    const registerBtn = document.getElementById('register-btn');
    const usernameMsg = document.getElementById('username-msg');
    const passwordMsg = document.getElementById('password-msg');
    const confirmMsg = document.getElementById('confirm-msg');
    const passwordStrength = document.getElementById('password-strength');
    const toast = document.getElementById('toast');

    // Show/hide password
    document.getElementById('togglePassword').onclick = function () {
        passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    };
    document.getElementById('toggleConfirm').onclick = function () {
        confirmInput.type = confirmInput.type === 'password' ? 'text' : 'password';
    };

    // Username validation
    function validateUsername() {
        const val = usernameInput.value.trim();
        if (!val) {
            usernameMsg.textContent = 'Tên đăng nhập không được để trống.';
            usernameMsg.className = 'input-message';
            return false;
        }
        if (!/^[A-Za-z0-9._]{3,30}$/.test(val)) {
            usernameMsg.textContent = 'Tên đăng nhập không hợp lệ — chỉ dùng chữ, số, dấu chấm, gạch dưới (3–30 ký tự).';
            usernameMsg.className = 'input-message';
            return false;
        }
        // Giả lập kiểm tra tồn tại (AJAX)
        usernameMsg.textContent = 'Đang kiểm tra...';
        usernameMsg.className = 'input-message';
        // Thay bằng AJAX thực tế nếu có server
        return new Promise(resolve => {
            setTimeout(() => {
                // Ví dụ: username "admin" đã tồn tại
                if (val.toLowerCase() === 'admin') {
                    usernameMsg.textContent = 'Tên đăng nhập đã tồn tại. Vui lòng chọn tên khác.';
                    usernameMsg.className = 'input-message';
                    resolve(false);
                } else {
                    usernameMsg.textContent = 'Tên đăng nhập hợp lệ.';
                    usernameMsg.className = 'input-message valid';
                    resolve(true);
                }
            }, 500);
        });
    }

    // Password validation
    function validatePassword() {
        const val = passwordInput.value;
        if (val.length < 8) {
            passwordMsg.textContent = 'Mật khẩu quá ngắn — tối thiểu 8 ký tự.';
            passwordMsg.className = 'input-message';
            showStrength(0);
            return false;
        }
        if (!/(?=.*[a-z])/.test(val) ||
            !/(?=.*[A-Z])/.test(val) ||
            !/(?=.*\d)/.test(val) ||
            !/(?=.*[^A-Za-z0-9])/.test(val)) {
            passwordMsg.textContent = 'Mật khẩu phải gồm chữ hoa, chữ thường, số, ký tự đặc biệt.';
            passwordMsg.className = 'input-message';
            showStrength(1);
            return false;
        }
        passwordMsg.textContent = 'Mật khẩu hợp lệ.';
        passwordMsg.className = 'input-message valid';
        showStrength(2);
        return true;
    }

    // Password strength bar
    function showStrength(level) {
        passwordStrength.innerHTML = '';
        let width = ['20%', '60%', '100%'][level] || '0%';
        let color = ['#e53935', '#fbc02d', '#388e3c'][level] || '#eee';
        let bar = document.createElement('div');
        bar.className = 'password-strength-bar';
        bar.style.width = width;
        bar.style.background = color;
        passwordStrength.appendChild(bar);
    }

    // Confirm password validation
    function validateConfirm() {
        if (confirmInput.value !== passwordInput.value) {
            confirmMsg.textContent = 'Xác nhận mật khẩu không khớp.';
            confirmMsg.className = 'input-message';
            return false;
        }
        confirmMsg.textContent = 'Xác nhận mật khẩu hợp lệ.';
        confirmMsg.className = 'input-message valid';
        return true;
    }

    // Enable/disable button
    async function updateButton() {
        let userValid = await validateUsername();
        let passValid = validatePassword();
        let confirmValid = validateConfirm();
        if (userValid && passValid && confirmValid) {
            registerBtn.disabled = false;
            registerBtn.classList.add('enabled');
        } else {
            registerBtn.disabled = true;
            registerBtn.classList.remove('enabled');
        }
    }

    usernameInput.addEventListener('input', updateButton);
    usernameInput.addEventListener('blur', updateButton);
    passwordInput.addEventListener('input', updateButton);
    confirmInput.addEventListener('input', updateButton);

    // Submit form
    document.querySelector('.registration-form').onsubmit = async function (e) {
        e.preventDefault();
        let userValid = await validateUsername();
        let passValid = validatePassword();
        let confirmValid = validateConfirm();
        if (!(userValid && passValid && confirmValid)) return;

        // Giả lập gửi lên server
        registerBtn.disabled = true;
        registerBtn.textContent = 'Đang xử lý...';
        setTimeout(() => {
            // Giả lập thành công
            showToast('Đăng ký thành công! Vui lòng kiểm tra email để xác nhận.');
            registerBtn.disabled = false;
            registerBtn.textContent = 'Đăng ký';
            // Reset form
            document.querySelector('.registration-form').reset();
            passwordStrength.innerHTML = '';
            usernameMsg.textContent = '';
            passwordMsg.textContent = '';
            confirmMsg.textContent = '';
        }, 1500);
    };

    // Show toast message
    function showToast(message) {
        toast.textContent = message;
        toast.className = 'toast show';
        setTimeout(() => {
            toast.className = toast.className.replace('show', '');
        }, 3000);
    }
}); 