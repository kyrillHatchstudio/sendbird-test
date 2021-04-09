export const TIME_LOCALE = 'en-US';

/**
 * Check if startTime is less than (difference) bigger than endTime
 * @param startTime
 * @param endTime
 * @param difference in seconds
 */
 export const checkDifference = (startTime: Date, endTime: Date, difference: number): boolean => {
    const differenceInMS = difference * 1000;
    const endMaximumOneDifferenceAhead = (endTime.getTime() - differenceInMS) <= startTime.getTime();
    return endMaximumOneDifferenceAhead;
  }
  

export const isToday = (date: Date) => {
    const today = new Date()
    return date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();
}

export const isSameDay = (A: Date, B: Date) => {
    return A.getDate() === B.getDate();
}

export const getHours = (date: Date) => {
    return date.toLocaleString(TIME_LOCALE, {hour: 'numeric'}).replace(/(am)|(pm)/ig, '');
}

export const getHalfDay = (date: Date): 'AM' | 'PM' => {
    return date.getHours() < 12 ? 'AM' : 'PM';
}

/**
 * 2020-10-28 14:00:00+00 -> Oct, 28 2020
 * @param date 
 */
export const getFullDate = (date: Date): string => {
    return date.toLocaleDateString(TIME_LOCALE, {month: 'short', day: '2-digit', year: 'numeric'});
}

export const getAllDaysBetween = (start: Date, end: Date): Date[] => {
    const startDay = new Date(start);
    startDay.setHours(0, 0, 0, 0);
    const endDay = new Date(end);
    endDay.setHours(0, 0, 0, 0);

    if (endDay.getTime() < startDay.getTime()) {
        throw new Error(`Can't get all days between start and end. End is before start`);
    }

    const daysBetween: Date[] = [];
    let day = startDay;
    while(day.getTime() <= endDay.getTime()) {
        daysBetween.push(day);
        day = new Date(day);
        day.setDate(day.getDate() + 1);
    }

    return daysBetween;
}

export const getSecondsBetween = (start: Date, end: Date): number => {
    return (end.getTime() - start.getTime()) / 1000;
}

/**
 * e.g. 1800 -> 30 min
 * e.g. 15000 -> 4 h 10 min
 * @param s 
 */
export const beautifySeconds = (s:number): string => {
    if (s < 60) {
        return `${s} sec`;
    }

    let inMinutes = s / 60;
    if (inMinutes < 60) {
      return  `${inMinutes.toFixed()} min`;
    }
    
    const inHours = Math.floor(s / 3600);
    inMinutes = inMinutes % 60;
    return `${inHours.toFixed()} h ${inMinutes.toFixed()} min`
}
