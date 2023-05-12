const BOARD_SIZE = 10

export enum BOARD_STATUS {
  EMPTY,
  SHIP,
  HIT,
  MISS,
  SUNK
}

export const board: { status: BOARD_STATUS; shipId: number }[][] = []

for (let row = 0; row < BOARD_SIZE; row++) {
  board[row] = []
  for (let col = 0; col < BOARD_SIZE; col++) {
    board[row][col] = { status: BOARD_STATUS.EMPTY, shipId: 0 }
  }
}
