document.addEventListener('DOMContentLoaded', function() {
    const resetBtn = document.getElementById('resetpassword-btn');
    const form = document.querySelector('.forgotpassword-form');
    let timeLeft = 60;
    let countdownTimer;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Disable button and start countdown
        resetBtn.disabled = true;
        startCountdown();
        
        // Show toast message
        showToast('Vui lòng kiểm tra email của bạn');
    });

    function startCountdown() {
        timeLeft = 60;
        updateButtonText();
        
        countdownTimer = setInterval(() => {
            timeLeft--;
            updateButtonText();
            
            if (timeLeft <= 0) {
                clearInterval(countdownTimer);
                resetBtn.disabled = false;
                resetBtn.textContent = 'Lấy lại mật khẩu';
            }
        }, 1000);
    }

    function updateButtonText() {
        resetBtn.textContent = `Vui lòng đợi (${timeLeft}s)`;
    }

    function showToast(message) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }
});