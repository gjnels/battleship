<script lang="ts">
  import { BOARD_STATUS, board } from '$lib/game/board'
  import { selectedShip, ships } from '$lib/game/ships'
  import { get } from 'svelte/store'
  import Selector from './Selector.svelte'
  let x = -1
  let y = -1

  $: if (!$selectedShip) {
    x = -1
    y = -1
  }

  $: max = $selectedShip ? board.length - $selectedShip.size : 0

  const setCoords = (rowIdx: number, colIdx: number) => {
    if (!$selectedShip) return

    if ($selectedShip.vertical) {
      x = colIdx
      y = rowIdx > max ? max : rowIdx
    } else {
      x = colIdx > max ? max : colIdx
      y = rowIdx
    }
  }

  const placeShip = () => {
    if (!$selectedShip) return
    checkValidPlacement()
    $ships = $ships.map((ship) => {
      if (get(ship).id === $selectedShip?.id) {
        ship.update((s) => {
          s.coords = { x, y }
          return s
        })
      }
      return ship
    })
    const size = $selectedShip.size
    for (let i = 0; i < size; i++) {
      if ($selectedShip.vertical) {
        board[y + i][x] = BOARD_STATUS.SHIP
      } else {
        board[y][x + i] = BOARD_STATUS.SHIP
      }
    }
    $selectedShip = null
  }

  const checkValidPlacement = () => {
    if (!$selectedShip || x < 0 || y < 0) return false
    for (let i = 0; i < $ships.length; i++) {
      // console.log(get($ships[i]).coords)
    }
    return true
  }
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
  {#each board as row, rowIdx}
    <div class="flex gap-0.5">
      {#each row as col, colIdx}
        <!-- svelte-ignore a11y-mouse-events-have-key-events -->
        {#if $selectedShip}
          <button
            class="h-8 w-8 bg-blue-300"
            on:click={placeShip}
            on:mouseover={() => {
              setCoords(rowIdx, colIdx)
            }}
          />
        {:else}
          <div class="h-8 w-8 bg-blue-300" />
        {/if}
      {/each}
    </div>
  {/each}
  <Selector
    {x}
    {y}
  />
</div>
