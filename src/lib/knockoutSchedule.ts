// Real FIFA World Cup 2026 knockout kickoff times, keyed by match label.
// Source times are US Eastern (EDT = UTC-4) from the official schedule, stored
// here in UTC (ET + 4h). Used to pre-fill kickoffs when generating rounds and to
// backfill any knockout match that's missing one. Slots follow the bracket order
// the app generates (winners paired by label number), which matches the real draw.
//
// R16-1 Canada v Morocco     Sat Jul 4  1:00pm ET
// R16-2 Paraguay v France    Sat Jul 4  5:00pm ET
// R16-5 Brazil v Norway      Sun Jul 5  4:00pm ET
// R16-6 Mexico v England     Sun Jul 5  8:00pm ET
// R16-4 Portugal v Spain     Mon Jul 6  3:00pm ET
// R16-3 USA v Belgium        Mon Jul 6  8:00pm ET
// R16-8 Argentina v Egypt    Tue Jul 7 12:00pm ET
// R16-7 Switzerland v Col.   Tue Jul 7  4:00pm ET
// QF-1 Foxborough            Thu Jul 9  4:00pm ET
// QF-2 Inglewood             Fri Jul 10 3:00pm ET
// QF-3 Miami                 Sat Jul 11 5:00pm ET
// QF-4 Kansas City           Sat Jul 11 9:00pm ET
// SF-1 Dallas                Tue Jul 14 3:00pm ET
// SF-2 Atlanta               Wed Jul 15 3:00pm ET
// 3RD  Miami                 Sat Jul 18 5:00pm ET
// FINAL MetLife (NJ)         Sun Jul 19 3:00pm ET
export const KNOCKOUT_KICKOFFS: Record<string, string> = {
  'R16-1': '2026-07-04T17:00:00Z',
  'R16-2': '2026-07-04T21:00:00Z',
  'R16-3': '2026-07-07T00:00:00Z',
  'R16-4': '2026-07-06T19:00:00Z',
  'R16-5': '2026-07-05T20:00:00Z',
  'R16-6': '2026-07-06T00:00:00Z',
  'R16-7': '2026-07-07T20:00:00Z',
  'R16-8': '2026-07-07T16:00:00Z',
  'QF-1': '2026-07-09T20:00:00Z',
  'QF-2': '2026-07-10T19:00:00Z',
  'QF-3': '2026-07-11T21:00:00Z',
  'QF-4': '2026-07-12T01:00:00Z',
  'SF-1': '2026-07-14T19:00:00Z',
  'SF-2': '2026-07-15T19:00:00Z',
  '3RD': '2026-07-18T21:00:00Z',
  FINAL: '2026-07-19T19:00:00Z',
}
