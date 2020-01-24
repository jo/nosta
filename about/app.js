import marked from '/js/marked.esm.js'

export const App = async ({ elements: { article } }) => {
  const readme = await fetch('./README.md', { cache: 'no-cache' }) 
  const text = await readme.text()

  article.innerHTML = marked(text)
}
