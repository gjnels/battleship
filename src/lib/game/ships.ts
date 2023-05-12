import { readonly, writable } from 'svelte/store'

export interface Ship {
  size: number
  name: string
  hits: boolean[]
  vertical: boolean
}

const createShip = (size: number, name: string, vertical = false) => {
  const { subscribe, update, set } = writable<Ship>({
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
  createShip(5, 'Carrier'),
  createShip(4, 'Battleship'),
  createShip(3, 'Destroyer'),
  createShip(3, 'Submarine'),
  createShip(2, 'Patrol Boat')
]
