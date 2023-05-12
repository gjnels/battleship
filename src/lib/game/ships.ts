import { get, writable } from 'svelte/store'

export interface Ship {
  id: number
  size: number
  name: string
  hits: boolean[]
  vertical: boolean
  coords: { x: number; y: number } | null
}

const createShip = (
  id: number,
  size: number,
  name: string,
  vertical = false,
  coords: { x: number; y: number } | null = null
) => {
  return writable<Ship>({
    id,
    size,
    name,
    hits: Array(size).fill(false),
    vertical,
    coords
  })
}

const createShips = () => {
  return [
    createShip(1, 5, 'Carrier'),
    createShip(2, 4, 'Battleship'),
    createShip(3, 3, 'Destroyer'),
    createShip(4, 3, 'Submarine'),
    createShip(5, 2, 'Patrol Boat')
  ]
}

export const ships = writable(createShips())

export const resetShips = () => ships.set(createShips())
export const resetShip = (id: number) => {
  ships.update((ships) =>
    ships.map((s) => {
      const ship = get(s)
      if (ship.id === id) {
        return createShip(ship.id, ship.size, ship.name)
      }
      return s
    })
  )
}

export const selectedShip = writable<Ship | null>(null)
