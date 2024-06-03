export interface SortParam {
  param: string,
  isSortable: boolean,
  id: string,
}

export interface ISort {
  params: SortParam[]
}