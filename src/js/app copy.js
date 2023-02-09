// js код

// проверка поддержки webp, добавление класса webp/no-webp для html
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

const header = document.querySelector('.header');
const menuHeadlines = document.querySelectorAll('.menu__li-headline');
const menuLinks = document.querySelectorAll('.menu__link_hover');

menuHeadlines.forEach(el => {
	el.addEventListener('click', function (e) {
		if (document.documentElement.clientWidth <= 1024) {
			el.parentElement.classList.toggle('_hover');
		}
	});
});

// проверка на телефон/пк, если телефон, к бади добавляется класс тач, если пк - класс пк.
const isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (
			isMobile.Android() ||
			isMobile.BlackBerry() ||
			isMobile.iOS() ||
			isMobile.Opera() ||
			isMobile.Windows());
	}
};

if (isMobile.any()) {
	menuLinks.forEach(el => {
		el.addEventListener('click', function (e) {
			if (document.documentElement.clientWidth > 1024) {
				header.classList.add('_hover');
				menuLinks.forEach(el => {
					el.parentElement.classList.remove('_hover');
				})
				el.parentElement.classList.add('_hover');
			}
		});
		el.addEventListener('click', function (e) {
			if (document.documentElement.clientWidth <= 1024) {
				el.parentElement.classList.toggle('_hover');
			}
		});
	});
} else {
	menuLinks.forEach(el => {
		el.addEventListener('mouseenter', function (e) {
			if (document.documentElement.clientWidth > 1024) {
				header.classList.add('_hover');
				menuLinks.forEach(el => {
					el.parentElement.classList.remove('_hover');
				})
				el.parentElement.classList.add('_hover');
			}
		});
		el.addEventListener('click', function (e) {
			if (document.documentElement.clientWidth <= 1024) {
				el.parentElement.classList.toggle('_hover');
			}
		});
	});

};

const isiPhone = {
	iPhone: function () {
		return navigator.userAgent.match(/iPhone/i);
	},
	any: function () {
		return (
			isiPhone.iPhone());
	}
};

if (isiPhone.any()) {
	const btns = document.querySelectorAll('.btn');
	if (btns.length > 0) {
		btns.forEach(el => {
			el.style.display = 'none';
			let video = el.previousElementSibling;
			video.setAttribute("controls", "controls");
		});
	}
};

header.addEventListener('mouseleave', function (e) {
	if (document.documentElement.clientWidth > 1024) {
		header.classList.remove('_hover');
		menuLinks.forEach(el => {
			el.parentElement.classList.remove('_hover');
		})
	}
});

// меню бургер

const iconMenu = document.querySelector('.header__icon');
const menuBody = document.querySelector('.menu');

if (iconMenu) {
	iconMenu.addEventListener('click', function (e) {
		header.classList.toggle('_hover');
		iconMenu.classList.toggle('_active');
		menuBody.classList.toggle('_active');
		document.body.classList.toggle('_lock');
	});
};

// Динамический адаптив , переброс файлов в др. элементы

function DynamicAdapt(type) {
	this.type = type;
}

DynamicAdapt.prototype.init = function () {
	const _this = this;
	// массив объектов
	this.оbjects = [];
	this.daClassname = "_dynamic_adapt_";
	// массив DOM-элементов
	this.nodes = document.querySelectorAll("[data-da]");

	// наполнение оbjects объктами
	for (let i = 0; i < this.nodes.length; i++) {
		const node = this.nodes[i];
		const data = node.dataset.da.trim();
		const dataArray = data.split(",");
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(dataArray[0].trim());
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
		оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	}

	this.arraySort(this.оbjects);

	// массив уникальных медиа-запросов
	this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
	}, this);
	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
		return Array.prototype.indexOf.call(self, item) === index;
	});

	// навешивание слушателя на медиа-запрос
	// и вызов обработчика при первом запуске
	for (let i = 0; i < this.mediaQueries.length; i++) {
		const media = this.mediaQueries[i];
		const mediaSplit = String.prototype.split.call(media, ',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];

		// массив объектов с подходящим брейкпоинтом
		const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
			return item.breakpoint === mediaBreakpoint;
		});
		matchMedia.addListener(function () {
			_this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	}
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
	if (matchMedia.matches) {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.moveTo(оbject.place, оbject.element, оbject.destination);
		}
	} else {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			if (оbject.element.classList.contains(this.daClassname)) {
				this.moveBack(оbject.parent, оbject.element, оbject.index);
			}
		}
	}
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
	element.classList.add(this.daClassname);
	if (place === 'last' || place >= destination.children.length) {
		destination.insertAdjacentElement('beforeend', element);
		return;
	}
	if (place === 'first') {
		destination.insertAdjacentElement('afterbegin', element);
		return;
	}
	destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
	element.classList.remove(this.daClassname);
	if (parent.children[index] !== undefined) {
		parent.children[index].insertAdjacentElement('beforebegin', element);
	} else {
		parent.insertAdjacentElement('beforeend', element);
	}
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
	if (this.type === "min") {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return -1;
				}

				if (a.place === "last" || b.place === "first") {
					return 1;
				}

				return a.place - b.place;
			}

			return a.breakpoint - b.breakpoint;
		});
	} else {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return 1;
				}

				if (a.place === "last" || b.place === "first") {
					return -1;
				}

				return b.place - a.place;
			}

			return b.breakpoint - a.breakpoint;
		});
		return;
	}
};

const da = new DynamicAdapt("max"); // min и max
da.init();

// ПОИСК

const search = document.querySelector('.header__search');
const searchIcon = document.querySelector('.header__search button');

if (searchIcon) {
	searchIcon.addEventListener('click', function (e) {
		e.preventDefault();
		search.classList.add('_active');
	});
};

function closeSearch() {
	search.classList.remove('_active');
}

document.addEventListener('click', function (e) {
	if (e.target.parentElement !== search) {
		closeSearch();
	}
});

// ScrollMagic

// sticky элемент

let controller = new ScrollMagic.Controller({
	globalSceneOptions: {
		triggerHook: 'onLeave'
	}
});

let scene1;

const trigger = document.querySelector('.trigger1');

document.addEventListener('DOMContentLoaded', function () {
	if (document.documentElement.clientWidth > 1024 && trigger) {
		scene1 = new ScrollMagic.Scene({
			triggerElement: ".trigger1",
			duration: document.querySelector('.trigger1').clientHeight - document.querySelector('.pin1').clientHeight,
		}).setPin('.pin1').addTo(controller);
	}
})

addEventListener('resize', function () {

	menuLinks.forEach(el => {
		el.parentElement.classList.remove('_hover');
	});

	header.classList.remove('_hover');
	menuBody.classList.remove('_active');
	iconMenu.classList.remove('_active');
	document.body.classList.remove('_lock');

	if (trigger) {
		if (document.documentElement.clientWidth > 1024) {
			if (scene1) {
				scene1 = scene1.destroy(true);
			}
			scene1 = new ScrollMagic.Scene({
				triggerElement: ".trigger1",
				duration: document.querySelector('.trigger1').clientHeight - document.querySelector('.pin1').clientHeight,
			}).setPin('.pin1').addTo(controller);
		} else {
			if (scene1) {
				scene1 = scene1.destroy(true);
			}
		}
	}
});

// анимация заголовков

let controller2 = new ScrollMagic.Controller({
	globalSceneOptions: {
		triggerHook: 'onEnter'
	}
});

new ScrollMagic.Scene({ triggerElement: ".headline_1" })
	.setClassToggle(".headline_1", "_active")
	.reverse(false)
	// add class toggle
	.addTo(controller2);

new ScrollMagic.Scene({ triggerElement: ".headline_2" })
	.setClassToggle(".headline_2", "_active")
	.reverse(false)
	// add class toggle
	.addTo(controller2);

new ScrollMagic.Scene({ triggerElement: ".headline_3" })
	.setClassToggle(".headline_3", "_active")
	.reverse(false)
	// add class toggle
	.addTo(controller2);

new ScrollMagic.Scene({ triggerElement: ".headline_4" })
	.setClassToggle(".headline_4", "_active")
	.reverse(false)
	// add class toggle
	.addTo(controller2);

new ScrollMagic.Scene({ triggerElement: ".headline_5" })
	.setClassToggle(".headline_5", "_active")
	.reverse(false)
	// add class toggle
	.addTo(controller2);

new ScrollMagic.Scene({ triggerElement: ".headline_6" })
	.setClassToggle(".headline_6", "_active")
	.reverse(false)
	// add class toggle
	.addTo(controller2);

// анимированные иконки

const animIcons = document.querySelectorAll('.questions__icon-wrap video');

animIcons.forEach(el => {
	el.addEventListener('mouseenter', function (e) {
		el.play();
	});
});

animIcons.forEach(el => {
	el.addEventListener('mouseleave', function (e) {
		el.pause();
		el.currentTime = 0;
	});
});

'use strict';

// CUSTOM SELECT

class CustomSelect {
	static CLASS_NAME_SELECT = 'select';
	static CLASS_NAME_ACTIVE = 'select_show';
	static CLASS_NAME_SELECTED = 'select__option_selected';
	static SELECTOR_ACTIVE = '.select_show';
	static SELECTOR_DATA = '[data-select]';
	static SELECTOR_DATA_TOGGLE = '[data-select="toggle"]';
	static SELECTOR_OPTION_SELECTED = '.select__option_selected';

	constructor(target, params) {
		this._elRoot = typeof target === 'string' ? document.querySelector(target) : target;
		this._params = params || {};
		this._onClickFn = this._onClick.bind(this);
		if (this._params.options) {
			this._elRoot.classList.add(CustomSelect.CLASS_NAME_SELECT);
			this._elRoot.innerHTML = CustomSelect.template(this._params);
		}
		this._elToggle = this._elRoot.querySelector(CustomSelect.SELECTOR_DATA_TOGGLE);
		this._elRoot.addEventListener('click', this._onClickFn);
	}
	_onClick(e) {
		const target = e.target;
		const type = target.closest(CustomSelect.SELECTOR_DATA).dataset.select;
		if (type === 'toggle') {
			this.toggle();
		} else if (type === 'option') {
			this._changeValue(target);
		}
	}
	_update(option) {
		option = option.closest('.select__option');
		const selected = this._elRoot.querySelector(CustomSelect.SELECTOR_OPTION_SELECTED);
		if (selected) {
			selected.classList.remove(CustomSelect.CLASS_NAME_SELECTED);
		}
		option.classList.add(CustomSelect.CLASS_NAME_SELECTED);
		this._elToggle.textContent = option.textContent;
		this._elToggle.value = option.dataset['value'];
		this._elToggle.dataset.index = option.dataset['index'];
		this._elRoot.dispatchEvent(new CustomEvent('select.change'));
		this._params.onSelected ? this._params.onSelected(this, option) : null;
		return option.dataset['value'];
	}
	_reset() {
		const selected = this._elRoot.querySelector(CustomSelect.SELECTOR_OPTION_SELECTED);
		if (selected) {
			selected.classList.remove(CustomSelect.CLASS_NAME_SELECTED);
		}
		this._elToggle.textContent = 'Выберите из списка';
		this._elToggle.value = '';
		this._elToggle.dataset.index = -1;
		this._elRoot.dispatchEvent(new CustomEvent('select.change'));
		this._params.onSelected ? this._params.onSelected(this, null) : null;
		return '';
	}
	_changeValue(option) {
		if (option.classList.contains(CustomSelect.CLASS_NAME_SELECTED)) {
			return;
		}
		this._update(option);
		this.hide();
	}
	show() {
		document.querySelectorAll(CustomSelect.SELECTOR_ACTIVE).forEach(select => {
			select.classList.remove(CustomSelect.CLASS_NAME_ACTIVE);
		});
		this._elRoot.classList.add(CustomSelect.CLASS_NAME_ACTIVE);
	}
	hide() {
		this._elRoot.classList.remove(CustomSelect.CLASS_NAME_ACTIVE);
	}
	toggle() {
		if (this._elRoot.classList.contains(CustomSelect.CLASS_NAME_ACTIVE)) {
			this.hide();
		} else {
			this.show();
		}
	}
	dispose() {
		this._elRoot.removeEventListener('click', this._onClickFn);
	}
	get value() {
		return this._elToggle.value;
	}
	set value(value) {
		let isExists = false;
		this._elRoot.querySelectorAll('.select__option').forEach((option) => {
			if (option.dataset['value'] === value) {
				isExists = true;
				return this._update(option);
			}
		});
		if (!isExists) {
			return this._reset();
		}
	}
	get selectedIndex() {
		return this._elToggle.dataset['index'];
	}
	set selectedIndex(index) {
		const option = this._elRoot.querySelector(`.select__option[data-index="${index}"]`);
		if (option) {
			return this._update(option);
		}
		return this._reset();
	}
}

CustomSelect.template = params => {
	const name = params['name'];
	const options = params['options'];
	const targetValue = params['targetValue'];
	const items = [];
	let selectedIndex = -1;
	let selectedValue = '';
	let selectedContent = 'Выберите из списка';
	options.forEach((option, index) => {
		let selectedClass = '';
		if (option[0] === targetValue) {
			selectedClass = ' select__option_selected';
			selectedIndex = index;
			selectedValue = option[0];
			selectedContent = option[1];
		}
		items.push(`<li class="select__option${selectedClass}" data-select="option" data-value="${option[0]}" data-index="${index}">${option[1]}</li>`);
	});
	return `<button type="button" class="select__toggle" name="${name}" value="${selectedValue}" data-select="toggle" data-index="${selectedIndex}">${selectedContent}</button>
	<div class="select__dropdown">
	  <ul class="select__options">${items.join('')}</ul>
	</div>`;
};

document.addEventListener('click', (e) => {
	if (!e.target.closest('.select')) {
		document.querySelectorAll(CustomSelect.SELECTOR_ACTIVE).forEach(select => {
			select.classList.remove(CustomSelect.CLASS_NAME_ACTIVE);
		});
	}
});

// #select-1 - селектор для выбора элемента, который необходимо инициализировать как CustomSelect
const select1Check = document.querySelector('.select_1');
if (select1Check) {
	const select1 = new CustomSelect('.select_1');
}
const select2Check = document.querySelector('.select_2');
if (select2Check) {
	const select2 = new CustomSelect('.select_2');
}

const select3Check = document.querySelector('.select-3');
if (select3Check) {
	const select3 = new CustomSelect('.select-3');
}

const select4Check = document.querySelector('.select-4');
if (select4Check) {
	const select4 = new CustomSelect('.select-4');
}
const select5Check = document.querySelector('.select-5');
if (select5Check) {
	const select5 = new CustomSelect('.select-5');
}

// табы

const tabItem = document.querySelectorAll('.tabs__item');
const tabBody = document.querySelectorAll('.tabs__block');

if (tabItem && tabBody) {
	for (let i = 0; i < tabItem.length; i++) {
		tabItem[i].addEventListener("click", function (e) {
			e.preventDefault();
			let activeTabAttr = e.target.getAttribute("data-tab");

			for (let j = 0; j < tabItem.length; j++) {
				let contentAttr = tabBody[j].getAttribute("data-tab-content");

				if (activeTabAttr === contentAttr) {
					tabItem[j].classList.add("_active");
					tabBody[j].classList.add("_active");
				} else {
					tabItem[j].classList.remove("_active");
					tabBody[j].classList.remove("_active");
				}
			};
		});
	};
};

// переключение бэкграунда на странице контакты

const mscTab = document.querySelector('.tabs__item:first-child');
const spbTab = document.querySelector('.tabs__item:last-child');
const mscBack = document.querySelector('.top-block__moscow');
const spbBack = document.querySelector('.top-block__spb');

if (mscTab && spbTab) {
	mscTab.addEventListener('click', function () {
		spbBack.style.opacity = 0;
		mscBack.style.opacity = 1;
	});
	spbTab.addEventListener('click', function () {
		mscBack.style.opacity = 0;
		spbBack.style.opacity = 1;
	});
}

// переключение клиентов

const clientsList = document.querySelectorAll('.clients__items');
const clientsBack = document.querySelectorAll('.clients-item_prev');
const clientsNext = document.querySelectorAll('.clients-item_next');
let clientsCounter = 1;

if (clientsBack && clientsBack && clientsList) {
	clientsBack.forEach(el => {
		el.addEventListener('click', function (e) {
			e.preventDefault();
			clientsCounter -= 1;
			deleteActiveClientsList()
		});
	});
	clientsNext.forEach(el => {
		el.addEventListener('click', function (e) {
			e.preventDefault();
			clientsCounter += 1;
			deleteActiveClientsList()
		});
	});
}

function deleteActiveClientsList() {
	clientsList.forEach(el => {
		el.classList.remove('_active');
		if (clientsCounter == el.getAttribute("data-number")) {
			el.classList.add('_active');
		}
	});
}

// аккордеоны

const accordeons = document.querySelectorAll('.industries__item_accordion');

if (accordeons.length > 0) {
	accordeons.forEach(el => {
		el.addEventListener('click', function (e) {
			e.preventDefault();
			el.classList.toggle('_active');
		})
	})
}

document.addEventListener('fullscreenchange', e => {
	if (e.target.hasAttribute('controls')) {
		e.target.removeAttribute("controls");
	} else {
		e.target.setAttribute("controls", "controls");
	}
});

const playBtns = document.querySelectorAll('.btn');
function openFullscreen(video) {
	video.play();
	if (video.requestFullscreen) {
		video.requestFullscreen();
	} else if (video.mozRequestFullScreen) { /* Firefox */
		video.mozRequestFullScreen();
	} else if (video.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
		video.webkitRequestFullscreen();
	} else if (video.msRequestFullscreen) { /* IE/Edge */
		video.msRequestFullscreen();
	}
}

if (playBtns.length > 0) {
	playBtns.forEach(el => {
		el.addEventListener('click', function (e) {
			e.preventDefault();
			let video = el.previousElementSibling;
			openFullscreen(video);
		});
	});
};

// попапы

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding'); // фиксированные объекты

let unlock = true; // блочим повторное нажатие на ссылку попапа, пока он открывается

const timeout = 800; // таже цифра что и в транзишн

// вешаем обработчик на линк отсылающий на попап
if (popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener('click', function (e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const currentPopup = document.getElementById(popupName);
			popupOpen(currentPopup);
			e.preventDefault();
		})
	}
};

// закрытие popup по клику на иконку закрытия
const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function (e) {
			popupClose(el.closest('.popup')); // ближайший класс .popup
			e.preventDefault();
		})
	}
};

// функция открытия
function popupOpen(currentPopup) {
	if (currentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open');
		// если есть открытый попап и попап находится в нем, мы оставляем бадилок
		if (popupActive) {
			// popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		currentPopup.classList.add('open');
		currentPopup.addEventListener('click', function (e) {
			if (!e.target.closest('.popup__content')) { // при клике на попап контент ничего не произойдет, если клик выше попап закроется
				popupClose(e.target.closest('.popup'));
			}
		});
	}
};

// функция закрытия
// если есть открытый попап и попап находится в нем, мы оставляем бадилок
function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('open');
		if (doUnlock) {
			bodyUnlock();
		}
	}
}

// блокируем сролл бади при открытом попапе
function bodyLock() {
	// избегаем сдвиг контента, скрываем скролл. при открытии попапа.
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	if (lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
};

// анлок бади + лок скролла на время, чтоб не дергался попап
function bodyUnlock() {
	setTimeout(function () {
		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = '0px';
			}
		}
		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
};

// закрытие попапа по ескейп

document.addEventListener('keydown', function (e) {
	if (e.key === 'Escape') {
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
});

// полифилы - подгоняют параметры под старые браузеры. 
(function () {
	// проверяем поддержку
	if (!Element.prototype.closest) {
		// реализуем
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();

(function () {
	// проверяем поддержку
	if (!Element.prototype.matches) {
		// определяем свойства
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;
	}
})();

// imask

document.querySelectorAll('.phone-mask').forEach((e) => {
	const phoneMask = IMask(e, { mask: '+{7} (000) 000-00-00' })
})

// calendar

// разрешаем выбрать дату только на 3 месяца вперед
function maxDate() {
	let date = new Date();
	date.setMonth(date.getMonth() + 3);
	return date;
}

const calendar = document.getElementById('calendar');

if (calendar) {
	new AirDatepicker('#calendar',
		{
			selectedDates: [new Date()],
			navTitles: {
				days: 'MMMM yyyy',
			},
			minDate: [new Date()],
			maxDate: [new Date(maxDate())],
			disableNavWhenOutOfRange: true,
		}
	);
}

// появление на мобилках

const chooseDate = document.querySelector('.popup_calendar .popup__left .more');
const chooseTime = document.querySelector('.popup__calendar .more');
const popupRightWrapper = document.querySelector('.popup_calendar .popup__right');
const popupFirstChild = document.querySelector('.popup_calendar .popup__left');
const popupCalendar = document.querySelector('.popup__calendar');
const popupDates = document.querySelector('.dates');
const acceptDate = document.querySelectorAll('.dates button');
const popupTimeWrapper = document.querySelector('.popup__time');
const popupContacts = document.querySelector('.popup_calendar .popup__form');
const timeFinish = document.querySelector('.popup__time-finish');
const meetingComplete = document.querySelector('.popup_calendar .popup__form .more');
const meetingCompleteInfo = document.querySelector('.popup_calendar .popup__left-finish');
const meetingCompleteImg = document.querySelector('.popup_calendar .popup__right picture img');

if (acceptDate) {
	acceptDate.forEach(el => {
		el.addEventListener('click', function (e) {
			e.preventDefault();
			popupTimeWrapper.style.display = 'none';
			popupContacts.style.display = 'block';
			timeFinish.style.display = 'block';
		});
	});
}

if (chooseDate) {
	chooseDate.addEventListener('click', function (e) {
		e.preventDefault();
		popupFirstChild.style.display = 'none';
		popupRightWrapper.style.display = 'flex';
	});
}

if (chooseTime) {
	chooseTime.addEventListener('click', function (e) {
		e.preventDefault();
		popupCalendar.style.display = 'none';
		popupDates.style.display = 'block';
	});
}

if (meetingComplete) {
	meetingComplete.addEventListener('click', function (e) {
		e.preventDefault();
		popupFirstChild.style.display = 'none';
		popupTimeWrapper.style.display = 'none';
		popupContacts.style.display = 'none';
		meetingCompleteInfo.style.display = 'flex';
		meetingCompleteImg.classList.add('_show');
	});
}

// scroll header/back

const backNav = document.querySelector('.back');
const wrapper = document.querySelector('.wrapper');

window.addEventListener('scroll', function (e) {
	if (backNav) {
		if (window.pageYOffset > 1000) {
			backNav.classList.add('_scroll');
		} else {
			backNav.classList.remove('_scroll');
		}
	}
	if (window.pageYOffset > 10) {
		header.classList.add('_scroll');
	} else {
		header.classList.remove('_scroll');
	}
});

window.addEventListener('DOMContentLoaded', function (e) {
	if (window.pageYOffset > 10) {
		header.classList.add('_scroll');
	} else {
		header.classList.remove('_scroll');
	}

	if (backNav) {
		wrapper.style.paddingBottom = '88px';
	}
})

const scrollTop = document.querySelector('.back__top a');

if (scrollTop) {
	scrollTop.addEventListener('click', function (e) {
		e.preventDefault();
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	});
}