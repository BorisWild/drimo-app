export interface IUser {
  created_at: string,
  email: string,
  full_name: string,
  id: number,
  orders: any[],
  phone: string | null,
  saved_constructions: any[]
  updated_at: string,
}