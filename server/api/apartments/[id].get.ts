export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id') ?? ''
  const apartment = await getApartmentById(id)

  if (!apartment) {
    // statusMessage — только ASCII (кириллица в HTTP-статусе ломает ответ), текст для людей — в message
    throw createError({ statusCode: 404, statusMessage: 'Not Found', message: 'Апартаменты не найдены' })
  }
  return apartment
})
