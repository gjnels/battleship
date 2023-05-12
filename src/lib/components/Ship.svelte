<script lang="ts">
  import { resetShip, type Ship } from '$lib/game/ships'
  import type { Writable } from 'svelte/store'
  import { selectedShip } from '$lib/game/ships'
  import { removeShip } from '$lib/game/board'

  export let ship: Writable<Ship>

  let self: HTMLButtonElement
</script>

<div class="space-y-1 rounded-md bg-white p-2 shadow-md">
  <p>
    {$ship.name}
    {#if $ship.coords}
      <button
        class="bg-orange-300"
        on:click={() => {
          resetShip($ship.id)
          removeShip($ship.id)
        }}>Remove</button
      >
    {:else}
      <button
        class="bg-teal-300"
        on:click={() => ($ship.vertical = !$ship.vertical)}>Flip</button
      >
    {/if}
  </p>
  <button
    bind:this={self}
    class="unstyled flex w-fit rounded-full {$ship.vertical
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
