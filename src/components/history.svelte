<script>
  import { afterUpdate } from "svelte";
  export let history = [];
  let historyContainer;

  afterUpdate(() => {
    historyContainer.scrollTo(0, 99999)
  })

  function getTime (isoDate) {
    const date = new Date(Date.parse(isoDate))
    let minutes = date.getMinutes().toString()
    let hours = date.getHours().toString()
    if (minutes.length === 1) {
      minutes = '0' + minutes
    }
    if (hours.length === 1) {
      hours = '0' + hours
    }
    return hours + ":" + minutes
  }
</script>

<style>
  .history {
    height: 106px;
    padding-top: 20px;
    border-bottom: 1px solid var(--color-line);
    padding-bottom: 2px;
    overflow-y: auto;
  }
  .history-item {
    margin-bottom: 18px;
    display: flex;
    font-size: 16px;
    justify-content: space-between;
  }
  .history-time {
    color: var(--color-gray)
  }

  .history-time b {
    color: black
  }

  .history-item.__add,
  .history-item.__add .history-time b {
    color: var(--color-green)
  }

  .history-item.__add .history-time {
    color: var(--color-green-tint)
  }
</style>

<div class="history" bind:this={historyContainer}>
  {#each history as item}
    <div class:__add={!item.substract} class="history-item">
      <span class="history-time">
        Сегодня
        <b>{getTime(item.date)}</b>
      </span>
      <span class="history-amount">{item.amount}</span>
    </div>
  {/each}
</div>
