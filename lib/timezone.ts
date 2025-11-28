import { DateTime } from 'luxon';

const REF_HOURS = ['03:00', '09:00', '15:00', '21:00'];

export function getReferenceDateTimes(dateISO: string, tz: string) {
  return REF_HOURS.map(h => {
    const [hh, mm] = h.split(':').map(Number);

    const dtLocal = DateTime.fromISO(dateISO, { zone: tz }).set({
      hour: hh,
      minute: mm,
      second: 0,
      millisecond: 0
    });

    return {
      localISO: dtLocal.toISO(),
      utcISO: dtLocal.toUTC().toISO(),
      hourLabel: h,
    };
  });
}
