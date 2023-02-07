const anim = lottie;
const anim2 = lottie;
const animCall = lottie;
const animCalendar = lottie;
const animMessage = lottie;

anim.loadAnimation({
	container: document.querySelector('.lottie'),
	renderer: 'canvas',
	loop: true,
	autoplay: true,
	path: './1.json'
});

anim2.loadAnimation({
	container: document.querySelector('.lottie2'),
	renderer: 'canvas',
	loop: true,
	autoplay: true,
	path: './2.json'
});

animCall.loadAnimation({
	container: document.querySelector('.lottie-call'),
	renderer: 'svg',
	loop: true,
	autoplay: true,
	path: './call.json'
});

animCalendar.loadAnimation({
	container: document.querySelector('.lottie-calendar'),
	renderer: 'svg',
	loop: true,
	autoplay: true,
	path: './calendar.json'
});

animMessage.loadAnimation({
	container: document.querySelector('.lottie-message'),
	renderer: 'svg',
	loop: true,
	autoplay: true,
	path: './message.json'
});

// animation scroll

const animation = document.querySelectorAll('.lottie3');

/* Initialize ScrollMagic */
const controller = new ScrollMagic.Controller();

/* Initialize each lottie animation */
animation.forEach(async (animation) => {
	const lottieInstance = lottie.loadAnimation({
		container: animation,
		renderer: 'svg',
		loop: false,
		autoplay: false,
		path: animation.dataset.animPath
	})


	const animDuration = (() => {
		let duration;

		if (animation.dataset.animDuration) {
			duration = animation.dataset.animDuration;
			const durationIsNumString = /^\d+$/.test(duration);
			if (durationIsNumString) {
				duration = parseInt(duration)
			}
		} else {
			duration = "parentHeight"
		}
		return duration
	})();

	const animTriggerHook = (() => {
		let triggerHook;

		if (animation.dataset.animTriggerHook) {
			triggerHook = animation.dataset.animTriggerHook;
			triggerHook = parseFloat(triggerHook)
		} else {
			triggerHook = 0.5
		}

		return triggerHook
	})();

	const animOffset = (() => {
		let offset;

		if (animation.dataset.animOffset) {
			offset = animation.dataset.animOffset;
			offset = parseInt(offset)
		} else {
			offset = 0
		}

		return offset
	})();


	lottieInstance.addEventListener('DOMLoaded', async (e) => {
		/* Waits until the SVGs have loaded to get height of container - prevents breaking of non-fixed height containers. */
		let parent = animation.parentElement;

		/* Build ScrollMagic scene once all SVGs are loaded*/
		new ScrollMagic.Scene({
			/* Animation will be linked to the scroll progress of its container, starting when the top of container is halfway through viewport and ending when bottom of container is halfway through viewport */
			triggerElement: parent,
			triggerHook: animTriggerHook,
			offset: animOffset,
			duration: animDuration === "parentHeight" ? parent.offsetHeight : animDuration === "elemHeight" ? animation.offsetHeight : animDuration
		}).addTo(controller)
			// .addIndicators() /* Debugging tool to see where an  d when animations occur */
			.on("progress", function (e) {
				const scrollFrame = e.progress * (lottieInstance.totalFrames - 1);
				lottieInstance.goToAndStop(scrollFrame, true);
			});

	})
})