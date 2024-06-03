export const getUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return 'https://drimo.dev-2-tech.ru/api'
  } else if (process.env.NODE_ENV === 'production') {
    return 'https://drimo-design.com/api'
  }
}

export const getAuthURL = () => {
  if (process.env.NODE_ENV === 'development') {
    return 'https://drimo.dev-2-tech.ru/auth_api/auth'
  } else if (process.env.NODE_ENV === 'production') {
    return 'https://drimo-design.com/auth_api/auth'
  }
}