document.addEventListener('DOMContentLoaded', function () {
    // Hiển thị/ẩn mật khẩu
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    if (togglePassword) {
        togglePassword.addEventListener('click', function () {
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;
            this.classList.toggle('active');
        });
    }

        document.addEventListener('DOMContentLoaded', function () {
            // Hiển thị/ẩn mật khẩu
            const passwordInput = document.getElementById('password');
            const togglePassword = document.getElementById('togglePassword');
            if (togglePassword) {
                togglePassword.addEventListener('click', function () {
                    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
                    this.classList.toggle('active');
                });
            }

            // Xử lý nút Đăng ký
            const registerBtn = document.querySelector('.btn-register');
            if (registerBtn) {
                registerBtn.addEventListener('click', function () {
                    window.location.href = 'Registration.html';
                });
            }

            // Xử lý đăng nhập
            const form = document.querySelector('.login-form');
            if (form) {
                form.addEventListener('submit', function (e) {
                    e.preventDefault();
                    const username = form.username.value.trim();
                    const password = form.password.value.trim();
                    if (!username || !password) {
                        alert('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu!');
                        return;
                    }
                    // Giả lập kiểm tra đăng nhập với CSDL
                    // Thay bằng AJAX thực tế nếu có server
                    // Ví dụ: đăng nhập thành công nếu username là "user" và password là "123456Aa@"
                    if (username === 'user' && password === '123456Aa@') {
                        alert('Đăng nhập thành công!');
                        window.location.href = '../Home.html';
                    } else {
                        alert('Tên đăng nhập hoặc mật khẩu không đúng!');
                    }
                });
            }
        });

    // Kiểm tra input trước khi submit
    const form = document.querySelector('.login-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const username = form.username.value.trim();
            const password = form.password.value.trim();
            if (!username || !password) {
                alert('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu!');
                return;
            }
            // Xử lý đăng nhập ở đây (ví dụ: gửi dữ liệu lên server)
            alert('Đăng nhập thành công!');
        });
    }
});