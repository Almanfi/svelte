import { writable } from "svelte/store";

export const clients = writable(null);

export const products = writable(null);

export const focusedProductId = writable(null);