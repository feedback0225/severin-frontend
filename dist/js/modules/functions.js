// проверка поддержки webp, добавление класса webp/no-webp для html
export function isWebp() {
	// проверка поддержки webp
	function testWebP(callback) {
		let webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}
	// добавление класса _webp или _no-webp для HTML
	testWebP(function (support) {
		let className = support === true ? 'webp' : 'no-webp';
		document.documentElement.classList.add(className);
	});
}

export function headerBackground() {

	const header = document.querySelector('.header');
	const menuLinks = document.querySelectorAll('.menu__list > li');

	if (document.documentElement.clientWidth > 992) {
		menuLinks.forEach(el => {
			el.addEventListener('mouseenter', function (e) {
				header.classList.add('_hover');
				menuLinks.forEach(el => {
					el.classList.remove('_hover');
				})
				e.target.classList.add('_hover');
			});
		});
	}

	if (document.documentElement.clientWidth <= 992) {
		menuLinks.forEach(el => {
			el.addEventListener('click', function (e) {
				el.classList.toggle('_hover');
			});
		});
	}

	header.addEventListener('mouseleave', function (e) {
		header.classList.remove('_hover');
		menuLinks.forEach(el => {
			el.classList.remove('_hover');
		})
	});
}

// меню бургер

export function menuBurger() {
	const iconMenu = document.querySelector('.header__icon');
	const menuBody = document.querySelector('.menu');
	const header = document.querySelector('.header');

	if (iconMenu) {
		iconMenu.addEventListener('click', function (e) {
			header.classList.toggle('_hover');
			iconMenu.classList.toggle('_active');
			menuBody.classList.toggle('_active');
			document.body.classList.toggle('_lock');
		});
	};
}