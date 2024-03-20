export const $ = selector => document.querySelector(selector)

export const setLoading = (el, status='true') => {
  el.setAttribute("aria-busy", status)
}

export const clean = (el) => {
  el.innerHTML = ''
}
