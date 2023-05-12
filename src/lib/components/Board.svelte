<script lang="ts">
  import { board } from '$lib/game/board'
  import { selectedShip } from '$lib/game/ships'
  import Selector from './Selector.svelte'
  let x = -1
  let y = -1

  $: if (!$selectedShip) {
    x = -1
    y = -1
  }

  $: max = $selectedShip ? $board.length - $selectedShip.size : 0
</script>

<div
  class="relative flex flex-col gap-0.5"
  on:mouseleave={() => {
    if ($selectedShip) {
      x = -1
      y = -1
    }
  }}
>
  {#each $board as row, rowIdx}
    <div class="flex gap-0.5">
      {#each row as col, colIdx}
        <!-- svelte-ignore a11y-mouse-events-have-key-events -->
        <div
          class="h-8 w-8 bg-blue-300"
          on:mouseover={() => {
            if ($selectedShip) {
              if ($selectedShip.vertical) {
                x = colIdx
                y = rowIdx > max ? max : rowIdx
              } else {
                x = colIdx > max ? max : colIdx
                y = rowIdx
              }
            }
          }}
        />
      {/each}
    </div>
  {/each}
  <Selector
    {x}
    {y}
  />
</div>
