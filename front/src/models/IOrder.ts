export interface IOrder {
  address: {
    building: string,
    city: string,
    flat: string,
    street: string,
  },
  comment: string | null,
  created_at: string,
  delivery_method_name: string,
  id: number,
  payment_method_name: string,
  price: number,
  solution_id: number,
  solution_name: string,
  status: string,
  updated_at: string,
}