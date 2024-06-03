export const getImageFromJSON = (image: string) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      return 'https://drimo.dev-2-tech.ru/' + JSON.parse(image).src

    } else if (process.env.NODE_ENV === 'production') {
      return 'https://drimo-design.com/' + JSON.parse(image).src
    } else return ''

  } catch (e) {
    console.error('Неправильный формат изображения, нужен JSON')
    return ''
  }
}