// Plays a short "paper" cover over the page, then opens the CountWise app.
// The app is a separate site, so this is a normal page load, but the cover
// hides the gap so it feels like one continuous move.
export function leaveToApp(url) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) {
    window.location.assign(url)
    return
  }

  const cover = document.createElement('div')
  cover.className = 'leave-cover'
  cover.setAttribute('aria-hidden', 'true')
  document.body.appendChild(cover)

  // If the visitor comes back with the browser Back button, remove the cover.
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) cover.remove()
  }, { once: true })

  requestAnimationFrame(() => cover.classList.add('is-on'))
  setTimeout(() => window.location.assign(url), 450)
}
