<style>
  .settings {
    display: grid;
    grid-template-rows: 68px 1fr 65px 373px;
    align-items: center;
    height: 100vh;
  }

  .settigns-caption {
    color: var(--color-gray);
    text-align: center;
  }

  .settings-act {
    font-size: 29px;
    appearance: none;
    -webkit-appearance: none;
    border: none;
    margin: 0 auto 35px;
    background: none;
    color: var(--color-blue);
    font-weight: 300;
  }

  .settings-input {
    font-size: 82px;
    font-weight: 300;
    text-align: center;
    height: 96px;
  }
</style>

<script>
  import PadComponent from "../components/pad.svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let service = {};

  let input = "";

  function onInput(event) {
    input += event.detail.value;
  }

  function onSave() {
    service.setFreeMoney(parseInt(input, 10))
    dispatch("save")
  }

  function onDelete() {
    input = input.substr(0, input.length - 1);
  }

  function clearStorage() {
    service.clearStorage()
  }
</script>

<div class="settings">
  <p on:dblclick={clearStorage} class="settigns-caption">
    Сколько у вас остаётся от зарплаты на ежедневные траты?
  </p>
  <span class="settings-input">{input}</span>
  {#if input.length > 0}
  <button on:click={onSave} class="settings-act">
    Начать тратить
  </button>
  {:else}
  <span></span>
  {/if}
  <PadComponent on:input={onInput} on:delete={onDelete} />
</div>
