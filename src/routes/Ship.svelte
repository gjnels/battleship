<script lang="ts">
  import type { Ship } from '$lib/game/ships'
  import type { Writable } from 'svelte/store'

  export let ship: Writable<Ship>
</script>

<p>
  {$ship.name}
  <button
    class=" bg-teal-500 font-bold"
    on:click={() => ($ship.vertical = !$ship.vertical)}>Flip</button
  >
</p>
<div
  class="flex w-fit rounded-full bg-blue-500 {$ship.vertical
    ? 'flex-col py-2'
    : 'px-2'}"
>
  {#each $ship.hits as hit, idx}
    <button
      class="flex h-8 w-8 items-center justify-center"
      on:click={() => ($ship.hits[idx] = !$ship.hits[idx])}
    >
      <span
        class="aspect-square w-3 rounded-full {hit ? 'bg-red-500' : 'bg-white'}"
      />
    </button>
  {/each}
</div>
