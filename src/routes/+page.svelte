<script lang="ts">
  import { ships } from '$lib/game/ships'
  import Ship from '$lib/components/Ship.svelte'
  import Board from '$lib/components/Board.svelte'
</script>

<h1 class="my-2 text-center text-3xl font-bold">Battleship</h1>

<h2 class="my-4 text-center text-2xl font-medium">Place your ships</h2>
<div class="mt-4 flex flex-wrap-reverse justify-center gap-8">
  <div class="w-60 space-y-4">
    {#each $ships as ship}
      <Ship {ship} />
    {/each}
  </div>
  <Board />
</div>
