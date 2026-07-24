import { useEffect, useRef } from 'react'
import { ADSENSE_CLIENT, ADSENSE_SLOT_BANNER, ADSENSE_SLOT_INTERSTITIAL } from '../config.js'
import { t } from '../i18n/index.js'

/*
  Ad slot component.
  - While ADSENSE_CLIENT is empty it renders a labelled placeholder box.
  - Once you set ADSENSE_CLIENT + slot ids in src/config.js and uncomment
    the adsbygoogle <script> in index.html, it renders a real AdSense unit.
*/
export default function AdSlot({ kind = 'banner' }) {
  const slot = kind === 'interstitial' ? ADSENSE_SLOT_INTERSTITIAL : ADSENSE_SLOT_BANNER
  const live = ADSENSE_CLIENT && slot
  const ref = useRef(null)

  useEffect(() => {
    if (live && ref.current && window.adsbygoogle) {
      try { (window.adsbygoogle = window.adsbygoogle || []).push({}) } catch { /* ignore */ }
    }
  }, [live])

  if (!live) {
    const label = kind === 'interstitial' ? t.ad_interstitial_label : t.ad_banner_label
    return (
      <div className={`ad-slot ad-${kind}`}>
        {label}<br />{t.ad_configure}
      </div>
    )
  }
  return (
    <ins
      ref={ref}
      className={`adsbygoogle ad-${kind}`}
      style={{ display: 'block' }}
      data-ad-client={ADSENSE_CLIENT}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  )
}
