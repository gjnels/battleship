<script lang="ts">
  import { selectedShip } from '$lib/game/ships'
  export let x: number
  export let y: number
  export let validPlacement: boolean
</script>

{#if $selectedShip && x >= 0 && y >= 0}
  <div
    class="pointer-events-none absolute {validPlacement
      ? 'bg-lime-500/50'
      : 'bg-red-500/50'}"
    style="{$selectedShip.vertical
      ? 'height'
      : 'width'}: calc({$selectedShip.size * 2}rem + {($selectedShip.size - 1) *
      2}px); left: calc({x * 2}rem + {x * 2}px); top: calc({y * 2}rem + {y *
      2}px); {$selectedShip.vertical ? 'width' : 'height'}: 2rem;"
  />
{/if}
