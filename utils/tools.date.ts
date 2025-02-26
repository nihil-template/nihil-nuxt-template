import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';
import ko from 'dayjs/locale/ko';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.tz.setDefault('Asia/Seoul');
dayjs.locale(ko);

export class DateTools {
  static nowTime() {
    return dayjs().tz('Asia/Seoul').toDate();
  }

  static nowFormat(format: string) {
    const defaultFormat = 'YYYY-MM-DD';

    return dayjs()
      .tz('Asia/Seoul')
      .format(format || defaultFormat);
  }

  static time(time: string) {
    return dayjs(time).tz('Asia/Seoul').toDate();
  }

  static timeFormat(time: string, format: string) {
    const defaultFormat = 'YYYY-MM-DD';

    return dayjs(time)
      .tz('Asia/Seoul')
      .format(format || defaultFormat);
  }

  static format(time: string | number | Date, format: string) {
    const defaultFormat = 'YYYY-MM-DD';

    return dayjs(time)
      .tz('Asia/Seoul')
      .format(format || defaultFormat);
  }

  static beforeDate(date: string | number | Date, before: number) {
    return dayjs(date).tz('Asia/Seoul').subtract(before, 'day').toDate();
  }

  static afterDate(date: string | number | Date, after: number) {
    return dayjs(date).tz('Asia/Seoul').add(after, 'day').toDate();
  }

  static getDiff(
    baseDate: string | number | Date,
    diffDate: string | number | Date
  ) {
    return dayjs(baseDate)
      .tz('Asia/Seoul')
      .diff(dayjs(diffDate).tz('Asia/Seoul'), 'day');
  }
}
