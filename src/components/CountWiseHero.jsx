import { Link } from 'react-router-dom'
import { COUNTWISE_APP_URL } from '../data/site'
import { leaveToApp } from '../lib/leaveToApp'

// The CountWise landing hero. Rendered in two places with identical layout:
//   1. inside the takeover overlay (non-interactive)
//   2. on the /countwise page (interactive)
// Identical markup is what makes the hand-off invisible.
// The actions row carries data-t="back" so the takeover animates it as one piece.
export default function CountWiseHero({ interactive = true, onBack }) {
  const handleBack = (e) => {
    if (!onBack || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    onBack() // reverse transition; plain link still works as a fallback
  }

  const handleSignIn = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return // allow new-tab clicks
    e.preventDefault()
    leaveToApp(COUNTWISE_APP_URL)
  }

  return (
    <div className="cw">
      <p className="cw__mono" data-t="eyebrow">COUNTWISE</p>
      <h1 className="cw__title" data-t="title">Every expense counts.</h1>
      <p className="cw__copy" data-t="copy">Personal finance, built around clarity.</p>
      <div className="cw__actions" data-t="back">
        {interactive ? (
          <>
            <a href={COUNTWISE_APP_URL} className="cw__signin" onClick={handleSignIn}>
              Sign in <span aria-hidden="true">→</span>
            </a>
            <Link to="/" className="cw__back" onClick={handleBack}>
              Return to portfolio
            </Link>
          </>
        ) : (
          <>
            <span className="cw__signin">Sign in <span aria-hidden="true">→</span></span>
            <span className="cw__back">Return to portfolio</span>
          </>
        )}
      </div>
    </div>
  )
}
