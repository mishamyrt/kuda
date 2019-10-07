<script>
  import PadComponent from "../components/pad.svelte";
  import HistoryComponent from "../components/history.svelte";
  import { createEventDispatcher } from "svelte";

  export let service = {};

  const dispatch = createEventDispatcher();
  let input = "";
  let substract = true;

  let availableToday = parseInt(service.availableToday)
  let history = service.history

  function onOperationChange(event) {
    substract = event.detail.substract;
  }

  function onInput(event) {
    input += event.detail.value;
  }

  function onDelete() {
    input = input.substr(0, input.length - 1);
  }

  function addOperation(event) {
    let wasPositive = availableToday > 0
    service.addOperation(parseInt(input), substract)
    input = ''
    availableToday = parseInt(service.availableToday)
    if (wasPositive && availableToday < 0) {
      window.navigator.vibrate([100,30,100,30,100,30,200,30,200,30,200,30,100,30,100,30,100]);
    }
    history = service.history
  }

  function onSettingsClick() {
    dispatch("settings")
  }
</script>

<style>
  .main {
    display: grid;
    grid-template-rows: calc(9vh + 23px) 1fr 373px;
    height: 100vh;
  }
  .main-current {
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: space-between;
  }
  .main-currentValue,
  .main-inputValue {
    font-size: 82px;
    font-weight: 300;
    max-width: 87vw;
    overflow-x: scroll;
    height: 96px;
    text-align: right;
  }
  .main-currentValue.__minus {
    color: var(--color-red)
  }
  .main-values {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
  }
  .main-act {
    font-size: 29px;
    appearance: none;
    -webkit-appearance: none;
    border: none;
    margin: 0 auto 35px;
    background: none;
    color: var(--color-blue);
    font-weight: 300;
  }

  .main-settings {
    position: absolute;
    fill: var(--color-blue);
    top: 14px;
    left: 0;
  }
</style>

<div class="main">
  <div class="main-history">
    <HistoryComponent history={history} />
  </div>
  <div class="main-current">
    <svg class="main-settings" on:click={onSettingsClick} height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><g><path d="m13.85 22.25h-3.7c-.74001 0-1.36001-.54-1.45001-1.27l-.27-1.89c-.27-.14-.53-.29-.79-.46l-1.8.72c-.7.26-1.47-.03-1.81-.65l-1.83-3.17c-.35-.66-.2-1.44.36-1.88l1.53-1.19c-.01-.15-.02-.3-.02-.46 0-.15.01-.31.02-.46l-1.52-1.19c-.59-.45001-.74-1.26001-.37-1.88001l1.85-3.19c.34-.62 1.11-.9 1.79-.63l1.81.73c.26-.17.52-.32.78-.46l.27-1.91c.09-.7.71-1.25 1.44001-1.25h3.7c.74 0 1.36.54 1.45 1.27l.27 1.89c.27.14.53.29.79.46l1.8-.72c.71-.26 1.48.03 1.82.65l1.84 3.18c.36.66.2 1.44-.36 1.88001l-1.52 1.19c.01.15.02.3.02.46s-.01.31-.02.46l1.52 1.19c.56.45.72 1.23.37 1.86l-1.86 3.22c-.34.62-1.11.9-1.8.63l-1.8-.72c-.26.17-.52.32-.78.46l-.27 1.91c-.1.68-.72 1.22-1.46 1.22zm-3.23-2h2.76l.37-2.55.53-.22c.44-.18.88-.44 1.34-.78l.45-.34 2.38.96 1.38-2.4-2.03-1.58.07-.56c.03-.26.06-.51.06-.78s-.03-.53-.06-.78l-.07-.56 2.03-1.58001-1.39-2.4-2.39.96-.45-.35c-.42-.32-.87-.58-1.33-.77l-.52-.22-.37-2.55h-2.76l-.37 2.55-.53001.21c-.44.19-.88.44-1.34.79l-.45.33-2.38-.95-1.39 2.39 2.03 1.58001-.07.56c-.0349.262-.05493.5257-.06.79 0 .26.02.53.06.78l.07.56-2.03 1.58 1.38 2.4 2.39-.96.45.35c.43.33.86.58 1.33.77l.53001.22z"/><path d="m12 15.5c1.933 0 3.5-1.567 3.5-3.5s-1.567-3.5-3.5-3.5-3.5 1.567-3.5 3.5 1.567 3.5 3.5 3.5z"/></g></svg>
    <div class="main-values">
      <span class:__minus={availableToday < 0} class="main-currentValue">{availableToday}</span>
      <span class="main-inputValue">{input}</span>
    </div>
    {#if input.length > 0}
    <button class="main-act" on:click={addOperation}>
      Записать {#if substract}трату{:else}доход{/if}
    </button>
    {/if}
  </div>
  <PadComponent
    operation={true}
    on:input={onInput}
    on:delete={onDelete}
    on:operationChange={onOperationChange} />
</div>
