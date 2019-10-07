import AppComponent from './app.svelte';

new AppComponent({
  target: document.getElementById('app'),
  props: {}
});
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/worker.js')
}
