export const sk = {
  // Meta
  page_title: 'Filip Hájek',
  page_description: 'Softvérový inžinier a zakladateľ FlowCode. Kontraktný vývojár pre malé aj veľké spoločnosti.',

  // Header
  name: 'Filip Hájek',
  role: 'Softvérový inžinier & zakladateľ',
  at_flowcode: 'FlowCode',
  tagline: 'Kontraktný vývojár pre spoločnosti od startupov až po nadnárodné korporácie.',

  // Nav
  nav_about: 'O mne',
  nav_work: 'Práca',
  nav_contact: 'Kontakt',

  // Lang toggle
  lang_toggle: 'EN',

  // About
  about_title: 'O mne',
  about_body:
    'Narodil som sa v Bratislave a programovaniu sa venujem odmalička — svoju prvú stránku som vytvoril ako 14-ročný a odvtedy som neprestal. Dnes vediem vlastnú softvérovú firmu FlowCode a pracujem ako kontraktný vývojár pre spoločnosti od startupov až po nadnárodné korporácie. Mimo práce mi najväčšiu radosť robí rodina, s ktorou sa snažím tráviť čo najviac času. Rád si vyčistím hlavu v prírode — či už na turistike, lezení, lyžovaní alebo splavovaní. Hudba je tiež veľká časť môjho života a rád chodím na koncerty a festivaly.',
  visit_flowcode: 'Navštíviť flowcode.sk →',

  // Work
  work_title: 'Práca',
  work_body:
    'O webové technológie sa zaujímam odmalička. Začínal som s PHP, postupne som prešiel na JavaScript a dnes pracujem prevažne s React a TypeScript. Mám skúsenosti s frontendovými aplikáciami, React Native mobilnými appkami a backendovými službami na AWS. Cez FlowCode ponúkam softvérový vývoj na mieru — od jednoduchých webov až po komplexné systémy pre veľké korporácie. Zaujímam sa aj o blockchain technológie, hlavne ekosystém Ethereum a oblasť decentralizovaných financií.',
  work_cta: 'flowcode.sk',

  // Contact
  contact_title: 'Kontakt',
  contact_name: 'Meno',
  contact_email: 'E-mail',
  contact_message: 'Správa',
  contact_send: 'Odoslať',
  contact_reset: 'Vymazať',
  contact_success: 'Ďakujem, ozvem sa čo najskôr.',
  contact_error: 'Nastala chyba. Skúste to prosím neskôr.',
  contact_verifying: 'Overujem...',

  // Footer
  footer_copyright: '© Filip Hájek',

  // General
  close: 'Zavrieť',
  back: '← Späť',
} as const

export type TranslationKey = keyof typeof sk
