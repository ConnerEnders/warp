import { writable } from 'svelte/store';

export let wasd = writable({
	w: false,
	a: false,
	s: false,
	d: false,
	space: false,
	control: false
});

document.addEventListener('keydown', (e) => {
	switch (e.key.toLowerCase()) {
		case 'w':
			wasd.update((wasd) => ({ ...wasd, w: true }));
			break;
		case 'a':
			wasd.update((wasd) => ({ ...wasd, a: true }));
			break;
		case 's':
			wasd.update((wasd) => ({ ...wasd, s: true }));
			break;
		case 'd':
			wasd.update((wasd) => ({ ...wasd, d: true }));
			break;
		case ' ':
			wasd.update((wasd) => ({ ...wasd, space: true }));
			break;
		case 'shift':
			wasd.update((wasd) => ({ ...wasd, control: true }));
			break;
	}
});

document.addEventListener('keyup', (e) => {
	switch (e.key.toLowerCase()) {
		case 'w':
			wasd.update((wasd) => ({ ...wasd, w: false }));
			break;
		case 'a':
			wasd.update((wasd) => ({ ...wasd, a: false }));
			break;
		case 's':
			wasd.update((wasd) => ({ ...wasd, s: false }));
			break;
		case 'd':
			wasd.update((wasd) => ({ ...wasd, d: false }));
			break;
		case ' ':
			wasd.update((wasd) => ({ ...wasd, space: false }));
			break;
		case 'shift':
			wasd.update((wasd) => ({ ...wasd, control: false }));
			break;
	}
});
