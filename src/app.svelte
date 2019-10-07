<script>
import MainScreen from './screens/main.svelte'
import SettingsScreen from './screens/settings.svelte'
import FinanceService from "./services/finance.js"

const service = new FinanceService()
let inSettings = false

function toggleSettings() {
  inSettings = !inSettings
}
</script>

{#if inSettings}
  <SettingsScreen on:save={toggleSettings} service={service}/>
{:else}
  <MainScreen on:settings={toggleSettings} service={service}/>
{/if}


