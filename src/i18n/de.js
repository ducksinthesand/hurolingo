// German UI strings — used as the default interface language for beta launch.
// To add another UI language, create a matching file (e.g. en.js) and
// import it in src/i18n/index.js.
export default {
  // Top bar / nav
  nav_languages: 'Sprachen',
  nav_path: 'Lernpfad',
  nav_profile: 'Profil',

  // Language picker
  picker_heading: 'Wähle dein Gift 🌍',
  picker_tagline: 'Lern, Freunde zu verlieren — in 8 Sprachen',
  starter_tag: 'STARTER-PAKET',
  insults_count: (n) => `${n} Beleidigungen`,

  // Path screen
  back_all_languages: '← Alle Sprachen',

  // Lesson screen
  quit_lesson: '✕ Lektion abbrechen',
  prompt_meaning: 'Was bedeutet das?',
  prompt_say: 'Wie sagt man das?',
  prompt_blank: 'Fülle die Lücke aus',
  prompt_pairs: 'Paare zuordnen',
  feedback_correct: 'Gut gemacht! 🎉',
  feedback_wrong: (answer) => `Falsch. Es heißt „${answer}".`,
  feedback_literally: 'wörtlich:',
  btn_continue: 'Weiter',
  btn_continue_wait: (n) => `Weiter in ${n}…`,

  // Results screen
  result_flawless: 'Makellos!',
  result_complete: 'Lektion abgeschlossen!',
  result_sub_flawless: 'Kein einziger Fehler. Beeindruckend.',
  result_sub_ok: 'Übung macht den Meister.',
  result_correct: 'richtig',
  result_new_badge: 'Neues Abzeichen!',
  result_new_badges: 'Neue Abzeichen!',

  // Profile screen
  profile_heading: 'Dein Beleidigungslebenslauf 📜',
  profile_xp_to_next: (n) => `${n} bis zum nächsten Level`,
  profile_lessons: 'Lektionen',
  profile_perfects: 'Perfekt',
  profile_languages: 'Sprachen',
  profile_active_lang: 'Aktive Sprache',
  profile_active_lang_sub: (name) => `Aktuell am Lernen: ${name}`,
  profile_badges: 'Abzeichen',
  profile_langs_tried: 'Ausprobierte Sprachen',
  profile_no_langs: 'Noch keine. Geh, beleidige ein Wörterbuch.',

  // Ad slot
  ad_configure: 'AdSense in src/config.js konfigurieren',
  ad_banner_label: 'WERBUNG (Banner)',
  ad_interstitial_label: 'WERBUNG',
}
