export default function ImpressumScreen({ onBack }) {
  return (
    <div className="legal-screen">
      <button className="backlink" onClick={onBack}>← Zurück</button>

      {/* ── IMPRESSUM ─────────────────────────────────────────── */}
      <h1 className="h1">Impressum</h1>
      <p className="sub" style={{ marginBottom: 16 }}>Angaben gemäß § 5 TMG</p>

      <div className="card">
        <h2 className="legal-h2">Betreiber</h2>
        <p>
          Ducks in the Sand UG (haftungsbeschränkt)<br />
          Vertreten durch: Robert Günther<br />
          Schlüterstraße 14<br />
          20146 Hamburg
        </p>
      </div>

      <div className="card">
        <h2 className="legal-h2">Kontakt</h2>
        <p>
          E-Mail: <a href="mailto:rg@ducksinthesand.de" className="legal-link">rg@ducksinthesand.de</a><br />
          Telefon: +49 172 1320149
        </p>
      </div>

      <div className="card">
        <h2 className="legal-h2">Umsatzsteuer-ID</h2>
        <p>USt-IdNr. folgt</p>
      </div>

      <div className="card">
        <h2 className="legal-h2">Verantwortlich für den Inhalt (§ 55 Abs. 2 RStV)</h2>
        <p>Robert Günther, Schlüterstraße 14, 20146 Hamburg</p>
      </div>

      <div className="card">
        <h2 className="legal-h2">Haftungsausschluss</h2>
        <p>
          Die Inhalte dieser App dienen ausschließlich der Unterhaltung und dem spielerischen Sprachenlernen.
          Sämtliche Beleidigungen und Ausdrücke sind als humorvolles Lernmaterial gedacht und richten sich
          nicht gegen einzelne Personen oder Gruppen. Der Betreiber übernimmt keine Haftung für den Einsatz
          der vermittelten Ausdrücke im realen Sprachgebrauch.
        </p>
      </div>

      <div className="card">
        <h2 className="legal-h2">Streitschlichtung</h2>
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
          <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="legal-link">
            https://ec.europa.eu/consumers/odr/
          </a>.<br />
          Wir sind nicht verpflichtet und nicht bereit, an einem Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </div>

      {/* ── DATENSCHUTZ ───────────────────────────────────────── */}
      <h1 className="h1" style={{ marginTop: 32 }}>Datenschutzerklärung</h1>
      <p className="sub" style={{ marginBottom: 16 }}>Stand: Juli 2026 · gemäß DSGVO, BDSG und TMG</p>

      <div className="card">
        <h2 className="legal-h2">1. Verantwortlicher</h2>
        <p>
          Robert Günther<br />
          Schlüterstraße 14, 20146 Hamburg<br />
          E-Mail: <a href="mailto:rg@ducksinthesand.de" className="legal-link">rg@ducksinthesand.de</a>
        </p>
      </div>

      <div className="card">
        <h2 className="legal-h2">2. Erhobene Daten und Zweck</h2>
        <p style={{ marginBottom: 10 }}>
          <strong>Nutzungsdaten (lokal):</strong> Hurolingo speichert Ihren Lernfortschritt, XP-Punkte
          und Abzeichen ausschließlich lokal im <em>localStorage</em> Ihres Browsers. Diese Daten
          verlassen Ihr Gerät nicht und werden nicht an Server übertragen.
          Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Bereitstellung
          der App-Funktionalität).
        </p>
        <p>
          <strong>Keine Registrierung erforderlich:</strong> Hurolingo erfordert kein Nutzerkonto.
          Es werden keine personenbezogenen Daten wie Name oder E-Mail-Adresse erhoben.
        </p>
      </div>

      <div className="card">
        <h2 className="legal-h2">3. Eingesetzte Dienste</h2>

        <p style={{ marginBottom: 10 }}>
          <strong>Vercel (Hosting):</strong> Vercel Inc., 340 Pine Street, Suite 701, San Francisco,
          CA 94104, USA. Die App wird über Vercel ausgeliefert. Dabei werden technisch notwendige
          Verbindungsdaten (IP-Adresse, Browser-Typ, Zeitstempel) in Server-Logs erfasst.
          Datenübermittlung in die USA auf Basis von Standardvertragsklauseln (SCCs).{' '}
          <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="legal-link">
            Datenschutzerklärung Vercel
          </a>.
        </p>

        <p style={{ marginBottom: 10 }}>
          <strong>Google AdSense (Werbung):</strong> Google Ireland Limited, Gordon House,
          Barrow Street, Dublin 4, Irland. Wir nutzen Google AdSense zur Einblendung von Werbeanzeigen.
          Google AdSense verwendet Cookies und ähnliche Technologien, um personalisierte Werbung
          auszuspielen. Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung). Sie können
          personalisierte Werbung unter{' '}
          <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="legal-link">
            adssettings.google.com
          </a>{' '}
          deaktivieren.{' '}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="legal-link">
            Datenschutzerklärung Google
          </a>.
        </p>

        <p>
          <strong>Google Fonts / CDN:</strong> Sofern externe Schriftarten oder Ressourcen geladen
          werden, kann dabei Ihre IP-Adresse an Google-Server übermittelt werden. Hurolingo verwendet
          ausschließlich systemseitige Schriftarten und lädt keine externen Fonts nach.
        </p>
      </div>

      <div className="card">
        <h2 className="legal-h2">4. Cookies und lokale Speicherung</h2>
        <p style={{ marginBottom: 10 }}>
          <strong>localStorage (technisch notwendig):</strong> Hurolingo speichert Ihren Spielfortschritt
          im localStorage Ihres Browsers. Dies ist für die Kernfunktion der App erforderlich und
          bedarf keiner Einwilligung (§ 25 Abs. 2 TDDDG).
        </p>
        <p>
          <strong>AdSense-Cookies:</strong> Google AdSense setzt Cookies zur Auslieferung und Messung
          von Werbeanzeigen. Diese Cookies erfordern Ihre Einwilligung gemäß § 25 Abs. 1 TDDDG.
          Durch die weitere Nutzung der App nach Anzeige dieses Hinweises erklären Sie sich damit
          einverstanden.
        </p>
      </div>

      <div className="card">
        <h2 className="legal-h2">5. Ihre Rechte</h2>
        <p>
          Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17),
          Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) sowie Widerspruch
          (Art. 21 DSGVO).<br /><br />
          Da Hurolingo keine personenbezogenen Daten auf Servern speichert, können Sie Ihre lokalen
          Daten jederzeit selbst löschen: Browser-Einstellungen → Website-Daten löschen.<br /><br />
          Für Anfragen wenden Sie sich an:{' '}
          <a href="mailto:rg@ducksinthesand.de" className="legal-link">rg@ducksinthesand.de</a>.<br /><br />
          Beschwerderecht bei der zuständigen Aufsichtsbehörde:{' '}
          <a href="https://www.datenschutz-hamburg.de" target="_blank" rel="noopener noreferrer" className="legal-link">
            Hamburgischer Beauftragter für Datenschutz und Informationsfreiheit
          </a>.
        </p>
      </div>

      <div style={{ height: 20 }} />
    </div>
  )
}
