// Flag emoji by team name, for the FIFA WC 2026 knockout teams.
export const FLAGS: Record<string, string> = {
  'South Africa': '🇿🇦',
  Canada: '🇨🇦',
  Netherlands: '🇳🇱',
  Morocco: '🇲🇦',
  Germany: '🇩🇪',
  Paraguay: '🇵🇾',
  France: '🇫🇷',
  Sweden: '🇸🇪',
  Belgium: '🇧🇪',
  Senegal: '🇸🇳',
  USA: '🇺🇸',
  'Bosnia and Herzegovina': '🇧🇦',
  Spain: '🇪🇸',
  Austria: '🇦🇹',
  Portugal: '🇵🇹',
  Croatia: '🇭🇷',
  Brazil: '🇧🇷',
  Japan: '🇯🇵',
  'Ivory Coast': '🇨🇮',
  Norway: '🇳🇴',
  Mexico: '🇲🇽',
  Ecuador: '🇪🇨',
  England: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  'DR Congo': '🇨🇩',
  Switzerland: '🇨🇭',
  Algeria: '🇩🇿',
  Colombia: '🇨🇴',
  Ghana: '🇬🇭',
  Australia: '🇦🇺',
  Egypt: '🇪🇬',
  Argentina: '🇦🇷',
  'Cape Verde': '🇨🇻',
}

export function teamLabel(name: string): string {
  if (!name) return ''
  const f = FLAGS[name]
  return f ? `${f} ${name}` : name
}

// ISO 3166-1 alpha-2 codes (flagcdn uses these) for image flags — these render on
// every OS, unlike emoji flags which Windows browsers don't display.
export const FLAG_CODES: Record<string, string> = {
  'South Africa': 'za',
  Canada: 'ca',
  Netherlands: 'nl',
  Morocco: 'ma',
  Germany: 'de',
  Paraguay: 'py',
  France: 'fr',
  Sweden: 'se',
  Belgium: 'be',
  Senegal: 'sn',
  USA: 'us',
  'Bosnia and Herzegovina': 'ba',
  Spain: 'es',
  Austria: 'at',
  Portugal: 'pt',
  Croatia: 'hr',
  Brazil: 'br',
  Japan: 'jp',
  'Ivory Coast': 'ci',
  Norway: 'no',
  Mexico: 'mx',
  Ecuador: 'ec',
  England: 'gb-eng',
  'DR Congo': 'cd',
  Switzerland: 'ch',
  Algeria: 'dz',
  Colombia: 'co',
  Ghana: 'gh',
  Australia: 'au',
  Egypt: 'eg',
  Argentina: 'ar',
  'Cape Verde': 'cv',
  // group-stage-only teams (and name variants used in the archives)
  'South Korea': 'kr',
  Czechia: 'cz',
  Qatar: 'qa',
  Haiti: 'ht',
  Scotland: 'gb-sct',
  Türkiye: 'tr',
  Turkiye: 'tr',
  Curaçao: 'cw',
  Curacao: 'cw',
  Tunisia: 'tn',
  'Saudi Arabia': 'sa',
  Uruguay: 'uy',
  Iran: 'ir',
  'New Zealand': 'nz',
  Iraq: 'iq',
  Jordan: 'jo',
  Panama: 'pa',
  Uzbekistan: 'uz',
  Columbia: 'co',
  "Côte d'Ivoire": 'ci',
  "Cote d'Ivoire": 'ci',
}

export function flagUrl(name: string, height = 18): { src: string; srcSet: string } | null {
  const code = FLAG_CODES[name]
  if (!code) return null
  return {
    src: `https://flagcdn.com/h${height}/${code}.png`,
    srcSet: `https://flagcdn.com/h${height * 2}/${code}.png 2x`,
  }
}

// Canonical team names for autofill in admin forms.
export const TEAM_NAMES = Object.keys(FLAGS).sort((a, b) => a.localeCompare(b))
export const TEAM_DATALIST_ID = 'team-options'
