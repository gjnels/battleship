<script lang="ts">
  import { resetShip, type Ship } from '$lib/game/ships'
  import type { Writable } from 'svelte/store'
  import { selectedShip } from '$lib/game/ships'
  import { removeShip } from '$lib/game/board'

  export let ship: Writable<Ship>

  const handleShipClick = () => {
    $selectedShip = $selectedShip?.id === $ship.id ? null : $ship
  }
  const handleRemove = () => {
    resetShip($ship.id)
    removeShip($ship.id) // Remove ship from board
  }
  const handleFlip = () => {
    $ship.vertical = !$ship.vertical
  }
</script>

<!-- Ship container -->
<div class="space-y-2 rounded-md bg-white p-2 shadow-md">
  <!-- Ship info -->
  <div class="flex justify-between">
    <!-- Ship name -->
    <span class="font-medium">{$ship.name}</span>
    {#if $ship.coords}
      <!-- Remove ship from board button -->
      <button
        class="bg-orange-300"
        on:click={handleRemove}>Remove</button
      >
    {:else}
      <!-- Flip ship button -->
      <button
        class="bg-teal-300"
        on:click={handleFlip}>Flip</button
      >
    {/if}
  </div>
  <!-- Ship -->
  <button
    class="unstyled flex w-fit rounded-full {$ship.vertical
      ? 'flex-col py-2'
      : 'px-2'} {!!$ship.coords
      ? 'bg-teal-400'
      : $selectedShip?.id === $ship.id
      ? 'bg-sky-500'
      : 'bg-blue-500'}"
    on:click={handleShipClick}
    disabled={!!$ship.coords}
  >
    <!-- Ship markers -->
    {#each $ship.hits as hit}
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
