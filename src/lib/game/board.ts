import { writable } from 'svelte/store'

const BOARD_SIZE = 10

export const board = writable(
  Array(BOARD_SIZE).fill(Array(BOARD_SIZE).fill(null))
)
