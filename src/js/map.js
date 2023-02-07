// карта

ymaps.ready(init);

function init() {
	var myMap = new ymaps.Map("map", {
		center: [55.76, 37.64],
		zoom: 12
	}),



		// Создаем метку с помощью вспомогательного класса.
		myPlacemark1 = new ymaps.Placemark([55.752247, 37.671193], {
			hintContent: 'Severin',
			balloonContent: `
				<div class="balloon__name">Северин Девелопмент</div>
				<div class="balloon__address">г. Москва, Нижняя Сыромятническая ул., 10, стр. 2, этаж 7</div>
				<div class="balloon__graphic">Пн-пт: с 9:00 до 19:00</div>
			`
		}, {
			iconLayout: 'default#image',
			iconImageHref: 'img/icons/card-point.png',
			iconImageSize: [40, 40],
			iconImageOffset: [-19, -44],
		});

	// Добавляем все метки на карту.
	myMap.geoObjects
		.add(myPlacemark1);
}