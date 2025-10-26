export type user = {
    id: string,
    name: string,
    email: string
    expiresAt?: number
}

export type car = {
    id: string,
    make: string, 
    model: string,
    year: number,
    pricePerDay: number,
    images: string[],
    seats: number,
    transmission: string,
}