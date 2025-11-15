
function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '{}');
}
function updateCartCount() {
    var cart = getCart();
    var count = Object.values(cart).reduce((a,b) => a+b, 0);
    document.getElementById('cart-count').innerText = count;
}
updateCartCount();
