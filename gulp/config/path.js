// файл с путями

// получаем имя папки проекта (gulp)
// import { src } from 'gulp';
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

// путь до папки с результатом (создается автоматом, можно использовать папку проекта)
const buildFolder = `./dist`;
// путь до папки с исходниками
const srcFolder = `./src`;

// информация по путям
export const path = {
	build: {
		// js
		js: `${buildFolder}/js/`,
		// css
		css: `${buildFolder}/css/`,
		// для html
		html: `${buildFolder}/`,
		// images
		images: `${buildFolder}/img/`,
		// шрифты
		fonts: `${buildFolder}/fonts/`,
		// переносить из src сюда
		files: `${buildFolder}/files/`
	},
	src: {
		// js
		js: `${srcFolder}/js/app.js`,
		// images
		images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
		// + svg
		svg: `${srcFolder}/img/**/*.svg`,
		// scss файлы
		scss: `${srcFolder}/scss/style.scss`,
		// для html файлов
		html: `${srcFolder}/*.html`,
		// путь до всех файлов в src
		files: `${srcFolder}/files/**/*.*`,
		// svg
		svgicons: `${srcFolder}/svgicons/*.svg`,
	},
	watch: {
		// js
		js: `${srcFolder}/js/**/*.js`,
		// scss
		scss: `${srcFolder}/scss/**/*.scss`,
		// для html (пути отличаются для склейки index.html)
		html: `${srcFolder}/**/*.html`,
		// images
		images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,svg,ico}`,
		// наблюдатель для авто добавления новых файлов
		files: `${srcFolder}/files/**/*.*`
	},
	clean: buildFolder,
	buildFolder: buildFolder,
	srcFolder: srcFolder,
	rootFolder: rootFolder,
	// подключаемся к удаленному серверу, заходим в папку тест, создаем папку проекта (gulp) 
	ftp: `test`,
}