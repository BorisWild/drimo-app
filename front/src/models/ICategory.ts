export interface ICategory {
  id: number,
  title: string,
  created_at: string,
  updated_at: string,
  children: number[],
  solutions: number
}