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

    // Xử lý "Quên mật khẩu?"
    const forgot = document.querySelector('.forgot-password');
    if (forgot) {
        forgot.addEventListener('click', function (e) {
            e.preventDefault();
            alert('Vui lòng liên hệ quản trị viên để lấy lại mật khẩu.');
        });
    }
});