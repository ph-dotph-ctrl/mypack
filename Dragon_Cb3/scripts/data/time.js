export function dhm(ms) {
    let year = Math.floor(ms / (365 * 24 * 60 * 60 * 1000));
    let yearms = ms % (365 * 24 * 60 * 60 * 1000);
    let month = Math.floor(yearms / (30 * 24 * 60 * 60 * 1000));
    let monthms = ms % (30 * 24 * 60 * 60 * 1000);
    let week = Math.floor(monthms / (7 * 24 * 60 * 60 * 1000));
    let weeksms = ms % (7 * 24 * 60 * 60 * 1000);
    let days = Math.floor(ms / (24 * 60 * 60 * 1000));
    let daysms = ms % (24 * 60 * 60 * 1000);
    let hours = Math.floor((daysms) / (60 * 60 * 1000));
    let hoursms = ms % (60 * 60 * 1000);
    let minutes = Math.floor((hoursms) / (60 * 1000));
    let minutesms = ms % (60 * 1000);
    let sec = Math.floor((minutesms) / (1000));
    return [days, hours, minutes, sec]
}
