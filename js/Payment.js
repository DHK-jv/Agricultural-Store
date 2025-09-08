// Payment.js - Hiệu ứng động cho trang thanh toán

document.addEventListener('DOMContentLoaded', function() {
  // Hiệu ứng nút thanh toán
  var payBtn = document.querySelector('.payment-btn');
  if (payBtn) {
    payBtn.addEventListener('mouseenter', function() {
      payBtn.style.transform = 'scale(1.08)';
      payBtn.style.boxShadow = '0 4px 18px rgba(56,142,60,0.18)';
    });
    payBtn.addEventListener('mouseleave', function() {
      payBtn.style.transform = 'scale(1)';
      payBtn.style.boxShadow = '0 2px 8px rgba(56,142,60,0.10)';
    });
    payBtn.addEventListener('click', function() {
      showPaymentToast('Thanh toán thành công!');
    });
  }

  // Hiệu ứng nhập thông tin
  var inputs = document.querySelectorAll('.payment-form input, .payment-form select');
  inputs.forEach(function(input) {
    input.addEventListener('focus', function() {
      input.style.borderColor = '#388e3c';
      input.style.boxShadow = '0 0 6px #43a04755';
    });
    input.addEventListener('blur', function() {
      input.style.borderColor = '#ccc';
      input.style.boxShadow = 'none';
    });
  });

  // Toast thông báo
  function showPaymentToast(msg) {
    var toast = document.createElement('div');
    toast.className = 'payment-toast';
    toast.innerText = msg;
    toast.style.position = 'fixed';
    toast.style.bottom = '32px';
    toast.style.right = '32px';
    toast.style.background = '#388e3c';
    toast.style.color = '#fff';
    toast.style.padding = '16px 32px';
    toast.style.borderRadius = '8px';
    toast.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
    toast.style.fontSize = '1rem';
    toast.style.zIndex = '9999';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.4s';
    document.body.appendChild(toast);
    setTimeout(function() { toast.style.opacity = '1'; }, 50);
    setTimeout(function() {
      toast.style.opacity = '0';
      setTimeout(function() { toast.remove(); }, 400);
    }, 1800);git 
  }
});
