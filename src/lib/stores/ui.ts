// src/lib/stores/ui.ts
import { writable } from 'svelte/store';

export const showTaskModal = writable<boolean>(false);
export const darkMode = writable<boolean>(false);
export const workTime = writable<number>(25);
export const breakTime = writable<number>(5);
