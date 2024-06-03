export interface ISolution {
  id: number,
  name: string,
  image: string,
  length: number,
  width: number,
  height: number,
  weight: number,
  created_at: string,
  updated_at: string,
  full_name?: string,
}