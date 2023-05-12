<script lang="ts">
  import { ships } from '$lib/game/ships'
  import Ship from '$lib/components/Ship.svelte'
</script>

<h1 class="my-2 text-center text-3xl font-bold">Battleship</h1>

{#each ships as ship}
  <Ship {ship} />
{/each}
