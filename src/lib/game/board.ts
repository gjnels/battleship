import { writable } from 'svelte/store'

const BOARD_SIZE = 10

export enum BOARD_STATUS {
  EMPTY,
  SHIP,
  HIT,
  MISS,
  SUNK
}

const setEmptyBoard = () => {
  const board: { status: BOARD_STATUS; shipId: number }[][] = []
  for (let row = 0; row < BOARD_SIZE; row++) {
    board[row] = []
    for (let col = 0; col < BOARD_SIZE; col++) {
      board[row][col] = { status: BOARD_STATUS.EMPTY, shipId: 0 }
    }
  }
  return board
}

export const board = writable<{ status: BOARD_STATUS; shipId: number }[][]>(
  setEmptyBoard()
)

export const resetBoard = () => {
  board.set(setEmptyBoard())
}

export const removeShip = (id: number) => {
  board.update((board) => {
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col].shipId === id) {
          board[row][col].shipId = 0
          board[row][col].status = BOARD_STATUS.EMPTY
        }
      }
    }
    return board
  })
}
