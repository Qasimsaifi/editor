import { writable } from "svelte/store";

// Create a writable store with an initial value of false (not in full-screen)
export const fullscreenStore = writable(false);

// Subscribe to changes in fullscreenStore and save the value to local storage
if (typeof localStorage !== "undefined") {

    fullscreenStore.subscribe(value => {
        localStorage.setItem("fullscreen", JSON.stringify(value));
    });
}
