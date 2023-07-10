export function parseDate(date?: Date) {
    if (!date) {
        return "-"
    }
    const tmp = new Date(date)
    return `${tmp.getDate()}/${tmp.getMonth()+1}/${tmp.getFullYear()}`
}

export function parseDateToIso(date: Date) {
    return (new Date(date)).toISOString()
}

export function convertISO8601ToSeconds(input: string): number {
    let reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
    let hours = 0, minutes = 0, seconds = 0, totalseconds = 0;
    if (reptms.test(input)) {
        const matches = reptms.exec(input);
        if (matches == null) {
            return -1;
        }
        if (matches[1]) hours = Number(matches[1]);
        if (matches[2]) minutes = Number(matches[2]);
        if (matches[3]) seconds = Number(matches[3]);
        totalseconds = hours * 3600 + minutes * 60 + seconds;
    }
    return (totalseconds * 1000);
}

export function convertMsToTime(time: number) {
    const date = new Date(time);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}