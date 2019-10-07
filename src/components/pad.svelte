<script>
  import { createEventDispatcher } from "svelte";

  export let operation = false;
  const dispatch = createEventDispatcher();

  let substract = false;

  function submitInput(event) {
    window.navigator.vibrate(60)
    dispatch("input", {
      value: event.target.innerText
    });
  }

  function submitDelete(event) {
    window.navigator.vibrate(60)
    dispatch("delete");
  }

  function submitOperation(event) {
    window.navigator.vibrate(60)
    dispatch("operationChange", {
      substract
    });
    substract = !substract;
  }
</script>

<style>
  .pad {
    display: flex;
    flex-wrap: wrap;
  }
  .pad-button {
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    -webkit-tap-highlight-color: transparent;
    font-family: "Roboto";
    font-size: 46px;
    color: var(--color-blue);
    width: calc(100% / 3);
    margin-bottom: 36px;
    -webkit-appearance: none;
    background: none;
    border: none;
    font-weight: 300;
    position: relative;
  }
  .pad-button:focus {
    outline: none;
  }
  .pad-button::after {
    content: "";
    display: block;
    position: absolute;
    width: 100px;
    border-radius: 50%;
    height: 100px;
    background-color: transparent;
    transform: scale(1);
    transition: background-color .3s ease-out, transform .1s ease-out;
    top: -23px;
    left: 13px;
  }
  .pad-button svg {
    stroke: var(--color-blue);
  }
  .pad-button:active::after {
    transform: scale(1.2);
    transition: background-color .005s ease-out, transform 2s ease-out;
    background-color: rgba(0, 0, 0, 0.05)
  }
</style>

<div class="pad">
  <button on:click={submitInput} class="pad-button">1</button>
  <button on:click={submitInput} class="pad-button">2</button>
  <button on:click={submitInput} class="pad-button">3</button>
  <button on:click={submitInput} class="pad-button">4</button>
  <button on:click={submitInput} class="pad-button">5</button>
  <button on:click={submitInput} class="pad-button">6</button>
  <button on:click={submitInput} class="pad-button">7</button>
  <button on:click={submitInput} class="pad-button">8</button>
  <button on:click={submitInput} class="pad-button">9</button>

  {#if operation}
  <button on:click={submitOperation} class="pad-button">
    {#if substract}–{:else}+{/if}
  </button>
  {:else}
  <div class="pad-button"></div>
  {/if}

  <button on:click={submitInput} class="pad-button">0</button>
  <button on:click={submitDelete} class="pad-button __delete">
    <svg
      width="44"
      height="35"
      viewBox="0 0 44 35"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.60896 17.5618H43.1975M1.18359 16.5004L18.08 33.3969M1.18359
        18.6174L18.0234 1.77762"
        stroke-width="3" />
    </svg>

  </button>
</div>
