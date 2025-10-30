export type user = {
    id: string,
    name: string,
    email: string
    expiresAt?: number
}

export type car = {
    id: number,
    make: string, 
    model: string,
    description: string,
    year: number,
    topSpeed: number,
    pricePerDay: number,
    images: string[],
    seats: number,
    transmission: string,
}

export type RootStackParamList = {
  Tabs: undefined;
  CarDetails: { id: string };
  BookingForm: undefined
};