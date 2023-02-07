// файл с плагинами (общими)

// поиск и замена
import replace from "gulp-replace";
// обработка ошибок
import plumber from "gulp-plumber";
// сообщения (подсказки)
import notify from "gulp-notify";
// локальный сервер
import browsersync from "browser-sync";
// проверка обновления картинки
import newer from "gulp-newer";
// gulp if (условное ветвление)
import ifPlugin from "gulp-if";

// экспортируем объект
export const plugins = {
	replace: replace,
	plumber: plumber,
	notify: notify,
	browsersync: browsersync,
	newer: newer,
	if: ifPlugin,
}