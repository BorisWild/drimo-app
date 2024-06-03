import { IElement } from "./IElement";
export interface ISolutionPage {
  id: number,
  name: string, 
  image: string,
  length: number,
  height: number,
  width: number,
  weight: number,
  file: string,
  ar_file: string,
  user_id: number,
  created_at: string,
  updated_at: string,
  subcategory_id?: number
  parts: IElement[]
}