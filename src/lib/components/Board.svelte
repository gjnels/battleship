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

  let validPlacement = false

  const setCoords = (rowIdx: number, colIdx: number) => {
    if (!$selectedShip) return

    if ($selectedShip.vertical) {
      x = colIdx
      y = rowIdx > max ? max : rowIdx
    } else {
      x = colIdx > max ? max : colIdx
      y = rowIdx
    }

    validPlacement = checkValidPlacement()
  }

  const placeShip = () => {
    if (!$selectedShip) return
    if (!validPlacement) {
      console.log('cannot place ship here')
      return
    }
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
        board[y + i][x].status = BOARD_STATUS.SHIP
        board[y + i][x].shipId = $selectedShip.id
      } else {
        board[y][x + i].status = BOARD_STATUS.SHIP
        board[y][x + i].shipId = $selectedShip.id
      }
    }
    $selectedShip = null
  }

  const checkValidPlacement = () => {
    if (!$selectedShip || x < 0 || y < 0) return false
    for (let i = 0; i < $selectedShip.size; i++) {
      if ($selectedShip.vertical) {
        if (board[y + i][x].status !== BOARD_STATUS.EMPTY) return false
      } else {
        if (board[y][x + i].status !== BOARD_STATUS.EMPTY) return false
      }
    }
    return true
  }
</script>

<div
  class="relative flex flex-col gap-0.5"
  class:cursor-not-allowed={!$selectedShip}
  on:mouseleave={() => {
    if ($selectedShip) {
      x = -1
      y = -1
    }
  }}
>
  {#each board as row, rowIdx}
    <div
      class="flex gap-0.5"
      class:cursor-not-allowed={!$selectedShip}
    >
      {#each row as col, colIdx}
        <!-- svelte-ignore a11y-mouse-events-have-key-events -->
        <button
          class="h-8 w-8"
          class:bg-blue-300={col.status === BOARD_STATUS.EMPTY}
          class:bg-teal-300={col.status === BOARD_STATUS.SHIP}
          class:cursor-not-allowed={!$selectedShip}
          on:click={placeShip}
          on:mouseover={() => {
            setCoords(rowIdx, colIdx)
          }}
        />
      {/each}
    </div>
  {/each}
  <Selector
    {x}
    {y}
    {validPlacement}
  />
  {#if !$selectedShip}
    <div class="mt-2 self-center text-lg font-semibold">Select a ship</div>
  {/if}
</div>
