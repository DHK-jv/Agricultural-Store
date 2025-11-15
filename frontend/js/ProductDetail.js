// Lấy giỏ hàng từ localStorage (nếu có)
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Hàm thêm vào giỏ hàng
function addToCart(productName) {
  const product = {
    name: productName,
    price: 200000, // giá demo, sau có thể lấy từ data
    quantity: 1,
  };

  // Kiểm tra sản phẩm đã có trong giỏ chưa
  const existingProduct = cart.find((item) => item.name === product.name);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push(product);
  }

  // Lưu lại vào localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Cập nhật số lượng trên icon giỏ hàng
  updateCartCount();

  alert(`${productName} đã được thêm vào giỏ hàng!`);
}

// Hàm cập nhật số lượng hiển thị trên icon giỏ hàng
function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  let total = 0;
  cart.forEach((item) => (total += item.quantity));
  cartCount.textContent = total;
}

// Load giỏ hàng khi trang mở
document.addEventListener("DOMContentLoaded", updateCartCount);

function changeMainImage(src) {
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail-images img');
    
    // Change main image
    mainImage.src = src;
    
    // Update active thumbnail
    thumbnails.forEach(thumb => {
        if (thumb.src === src) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
}

// Set first thumbnail as active on page load
document.addEventListener('DOMContentLoaded', function() {
    const firstThumb = document.querySelector('.thumbnail-images img');
    if (firstThumb) {
        firstThumb.classList.add('active');
    }
});