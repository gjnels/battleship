import { writable } from 'svelte/store'

export interface Ship {
  id: number
  size: number
  name: string
  hits: boolean[]
  vertical: boolean
  coords: { x: number; y: number } | null
}

const createShip = (id: number, size: number, name: string) => {
  const { subscribe, update, set } = writable<Ship>({
    id,
    size,
    name,
    hits: Array(size).fill(false),
    vertical: false,
    coords: null
  })

  return {
    subscribe,
    update,
    set
  }
}

export const ships = writable([
  createShip(1, 5, 'Carrier'),
  createShip(2, 4, 'Battleship'),
  createShip(3, 3, 'Destroyer'),
  createShip(4, 3, 'Submarine'),
  createShip(5, 2, 'Patrol Boat')
])

export const selectedShip = writable<Ship | null>(null)
