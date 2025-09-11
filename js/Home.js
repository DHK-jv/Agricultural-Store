// Home.js - Hiệu ứng động hiện đại cho trang chủ

document.addEventListener('DOMContentLoaded', function() {
  // Hiệu ứng banner chuyển động mượt
  var banners = document.querySelectorAll('.banner-featured');
  var currentBanner = 0;
  function showBanner(idx) {
    banners.forEach(function(b, i) {
      b.classList.toggle('active', i === idx);
      b.style.opacity = i === idx ? '1' : '0.3';
      b.style.transform = i === idx ? 'scale(1.04)' : 'scale(0.98)';
      b.style.transition = 'opacity 0.7s, transform 0.7s';
    });
  }
  function nextBanner() {
    currentBanner = (currentBanner + 1) % banners.length;
    showBanner(currentBanner);
  }
  function prevBanner() {
    currentBanner = (currentBanner - 1 + banners.length) % banners.length;
    showBanner(currentBanner);
  }
  var leftBtn = document.querySelector('.banner-btn.left');
  var rightBtn = document.querySelector('.banner-btn.right');
  if (leftBtn && rightBtn) {
    leftBtn.onclick = prevBanner;
    rightBtn.onclick = nextBanner;
  }
  setInterval(nextBanner, 4000);
  showBanner(currentBanner);

  // Hiệu ứng hover cho sản phẩm tiêu biểu
  var cards = document.querySelectorAll('.featured-card');
  cards.forEach(function(card) {
    card.addEventListener('mouseenter', function() {
      card.style.transform = 'translateY(-8px) scale(1.04)';
      card.style.boxShadow = '0 12px 40px rgba(56,142,60,0.18)';
    });
    card.addEventListener('mouseleave', function() {
      card.style.transform = 'none';
      card.style.boxShadow = '0 6px 32px rgba(56,142,60,0.13)';
    });
  });

  // Hiệu ứng search bar
  var searchInput = document.querySelector('.search-form input[type="text"]');
  if (searchInput) {
    searchInput.addEventListener('focus', function() {
      searchInput.style.borderColor = '#388e3c';
      searchInput.style.boxShadow = '0 0 8px #43a04755';
    });
    searchInput.addEventListener('blur', function() {
      searchInput.style.borderColor = '#ccc';
      searchInput.style.boxShadow = 'none';
    });
  }

  // Hiệu ứng nút thêm vào giỏ hàng
  var addBtns = document.querySelectorAll('.featured-info button');
  addBtns.forEach(function(btn) {
    btn.addEventListener('mousedown', function() {
      btn.style.transform = 'scale(0.96)';
    });
    btn.addEventListener('mouseup', function() {
      btn.style.transform = 'scale(1)';
    });
    btn.addEventListener('mouseleave', function() {
      btn.style.transform = 'scale(1)';
    });
  });

  // Hiệu ứng hiện badge giỏ hàng khi thêm sản phẩm
  window.addToCart = function(product) {
    var cart = JSON.parse(localStorage.getItem('cart') || '{}');
    cart[product] = (cart[product]||0) + 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    var cartCount = document.getElementById('cart-count');
    if (cartCount) {
      cartCount.innerText = Object.values(cart).reduce((a,b) => a+b, 0);
      cartCount.style.background = '#e53935';
      cartCount.style.color = '#fff';
      cartCount.style.transform = 'scale(1.2)';
      setTimeout(function() {
        cartCount.style.transform = 'scale(1)';
      }, 300);
    }
    // Hiệu ứng nhấn nút khi thêm giỏ hàng
  var btns = document.querySelectorAll("button[onclick*='addToCart']");
  btns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      btn.style.transform = "scale(0.9)";
      btn.style.backgroundColor = "#2e7d32"; // xanh đậm hơn khi click
      btn.style.transition = "transform 0.15s, background-color 0.15s";
      setTimeout(function () {
        btn.style.transform = "scale(1)";
        btn.style.backgroundColor = "";
      }, 200);
    });
  });

    // Toast thông báo
    var toast = document.createElement('div');
    toast.innerText = 'Đã thêm ' + product + ' vào giỏ hàng!';
    toast.style.position = 'fixed';
    toast.style.bottom = '32px';
    toast.style.right = '32px';
    toast.style.background = '#388e3c';
    toast.style.color = '#fff';
    toast.style.padding = '14px 28px';
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
    }, 1500);
  };

  // Cập nhật số lượng giỏ hàng khi tải trang
  var cartCount = document.getElementById('cart-count');
  if (cartCount) {
    var cart = JSON.parse(localStorage.getItem('cart') || '{}');
    cartCount.innerText = Object.values(cart).reduce((a,b) => a+b, 0);
  }
});

