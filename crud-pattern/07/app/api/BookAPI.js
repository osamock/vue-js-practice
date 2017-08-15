export const get = () =>
  fetch('http://localhost:3000/books')
    .then(response => response.json())
    .then(books => books.reduce((a, b) => ({...a, [b.id]: b}), {}))

export const post = book =>
  fetch('http://localhost:3000/books', {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(book)
  })

export const put = book =>
  fetch(`http://localhost:3000/books/${book.id}`, {
    method: 'PUT',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(book)
  })

export const remove = id =>
  fetch(`http://localhost:3000/books/${id}`, {
    method: 'DELETE'
  })
