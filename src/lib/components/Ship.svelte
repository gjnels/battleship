<script lang="ts">
  import type { Ship } from '$lib/game/ships'
  import type { Writable } from 'svelte/store'
  import { selectedShip } from '$lib/game/ships'

  export let ship: Writable<Ship>

  let self: HTMLButtonElement
</script>

<div>
  <p>
    {$ship.name}
    {#if !$ship.coords}
      <button
        class="bg-teal-500 font-bold"
        on:click={() => ($ship.vertical = !$ship.vertical)}>Flip</button
      >
    {/if}
  </p>
  <p>
    Coords: {$ship.coords
      ? `X: ${$ship.coords.x} | Y: ${$ship.coords.y}`
      : 'not placed'}
  </p>
  <button
    bind:this={self}
    class="flex w-fit rounded-full {$ship.vertical
      ? 'flex-col py-2'
      : 'px-2'} {!!$ship.coords
      ? 'bg-teal-400'
      : $selectedShip?.id === $ship.id
      ? 'bg-sky-500'
      : 'bg-blue-500'}"
    on:click={(e) => {
      e.stopPropagation()
      if ($selectedShip?.id === $ship.id) {
        $selectedShip = null
      } else {
        $selectedShip = $ship
      }
    }}
    disabled={!!$ship.coords}
  >
    {#each $ship.hits as hit, idx}
      <div class="flex h-8 w-8 items-center justify-center">
        <span
          class="aspect-square w-3 rounded-full {hit
            ? 'bg-red-500'
            : 'bg-white'}"
        />
      </div>
    {/each}
  </button>
</div>
