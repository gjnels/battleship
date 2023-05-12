import { writable } from 'svelte/store'

export interface Ship {
  id: number
  size: number
  name: string
  hits: boolean[]
  vertical: boolean
}

const createShip = (
  id: number,
  size: number,
  name: string,
  vertical = false
) => {
  const { subscribe, update, set } = writable<Ship>({
    id,
    size,
    name,
    hits: Array(size).fill(false),
    vertical
  })

  return {
    subscribe,
    update,
    set
  }
}

export const ships = [
  createShip(1, 5, 'Carrier'),
  createShip(2, 4, 'Battleship'),
  createShip(3, 3, 'Destroyer'),
  createShip(4, 3, 'Submarine'),
  createShip(5, 2, 'Patrol Boat')
]

export const selectedShip = writable<Ship | null>(null)
