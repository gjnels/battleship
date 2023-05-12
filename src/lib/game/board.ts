import { get, writable } from 'svelte/store'

const BOARD_SIZE = 10

export enum BOARD_STATUS {
  EMPTY,
  SHIP,
  HIT,
  MISS,
  SUNK
}

export const board: BOARD_STATUS[][] = []

for (let row = 0; row < BOARD_SIZE; row++) {
  board[row] = []
  for (let col = 0; col < BOARD_SIZE; col++) {
    board[row][col] = BOARD_STATUS.EMPTY
  }
}
