export const statusArray = [
  {
    status: 1,
    title: 'Не оплачен'
  },
  {
    status: 2,
    title: 'Отменен'
  },
  {
    status: 3,
    title: 'Оплачен'
  },
]

export function getStatus(status: string) {
  switch (Number(status)) {
    case 1: return 'Не оплачен'
    case 2: return 'Отменен'
    case 3: return 'Оплачен'
    default: {
      console.error('Такого статуса не существует')
      return ''
    }
  }
}


export function getStatusColor(status: string) {
  if (Number(status) === 3) {
    return 'success'
  } else return 'failed'
}