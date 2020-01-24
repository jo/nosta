export const Nosta = properties => {
  // catch links
  // only static links present in dom at time of Nosta call
  const links = document.querySelectorAll("a[href^='/']")
  for (const link of links) {
    link.addEventListener('click', async event => {
      event.preventDefault()
      
      const path = link.getAttribute('href')
      history.pushState({}, '', path)
      dispatch(path)
    })
  }

  // listen to url change
  window.onpopstate = event => {
    const path = document.location.pathname
    dispatch(path)
  }

  // Dispather
  // import application js
  // execute application
  const dispatch = async path => {
    console.log(`♦ ${path}`)

    try {
      // load app script, eg `/about/app.js`
      const { App } = await import(`${path}app.js`)
      App(properties)
    } catch (error) {
      article.innerHTML = `<pre>${error.message}</pre>`
    }
  }

  // initial dispatch
  dispatch(document.location.pathname)
}
