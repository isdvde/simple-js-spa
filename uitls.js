export const $ = selector => document.querySelector(selector)

export const setLoading = (app, status='true') => {
  app.setAttribute("aria-busy", status)
}

export const clean = (app) => {
  app.innerHTML = ''
}
