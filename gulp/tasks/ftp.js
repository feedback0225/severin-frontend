// отправляет файлы на сервер

// настройки
import { configFTP } from '../config/ftp.js';
// отправляет на сервер
import vinylFTP from 'vinyl-ftp';
// утилиты для отображения копирования файлов на сервер
import util from 'gulp-util';

export const ftp = () => {
	configFTP.log = util.log;
	const ftpConnect = vinylFTP.create(configFTP);
	return app.gulp.src(`${app.path.buildFolder}/**/*.*`, {})
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "FTP",
				message: "Error: <%= error.message %>"
			})
		))
		.pipe(ftpConnect.dest(`/${app.path.ftp}/${app.path.rootFolder}`));
}