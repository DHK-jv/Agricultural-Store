function getCart() {
		return JSON.parse(localStorage.getItem('cart') || '{}');
	}
	function setCart(cart) {
		localStorage.setItem('cart', JSON.stringify(cart));
	}
	function updateCartCount() {
		var cart = getCart();
		var count = Object.values(cart).reduce((a,b) => a+b, 0);
		document.getElementById('cart-count').innerText = count;
	}
	function addToCart(product) {
		var cart = getCart();
		cart[product] = (cart[product]||0) + 1;
		setCart(cart);
		updateCartCount();
		renderCart();
		alert('Đã thêm ' + product + ' vào giỏ hàng!');
	}
	function removeFromCart(product) {
		var cart = getCart();
		if(cart[product]) {
			cart[product]--;
			if(cart[product]<=0) delete cart[product];
			setCart(cart);
			updateCartCount();
			renderCart();
		}
	}
    // Lọc danh mục
	function filterCategory(cat) {
		document.querySelectorAll('.cat-btn').forEach(btn=>btn.classList.remove('active'));
		if(cat==='all') document.querySelector('.cat-btn').classList.add('active');
		else document.querySelector('.cat-btn[onclick*="'+cat+'"').classList.add('active');
		document.querySelectorAll('.modern-product').forEach(p=>{
			if(cat==='all'||p.dataset.cat===cat) p.style.display='flex';
			else p.style.display='none';
		});
	}
	filterCategory('all');
    
    // Hiển thị giỏ hàng
	function renderCart() {
		var cart = getCart();
		var html = '';
		var keys = Object.keys(cart);
		if(keys.length===0) {
			html = '<p>Giỏ hàng trống.</p>';
		} else {
			html = '<table style="width:100%;border-collapse:collapse;">';
			html += '<tr><th style="text-align:left;">Sản phẩm</th><th>Số lượng</th><th></th></tr>';
			keys.forEach(function(item){
				html += '<tr>'+
					'<td>'+item+'</td>'+
					'<td>'+cart[item]+'</td>'+
					'<td><button onclick="removeFromCart(\''+item+'\')">Xóa</button></td>'+
				'</tr>';
			});
			html += '</table>';
		}
		document.getElementById('cart-list').innerHTML = html;
	}
	updateCartCount();
	renderCart();