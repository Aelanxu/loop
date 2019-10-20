//const host = "http://127.0.0.1";
const host = "http://106.54.131.66"

function localDate(t = Date.now()) {
    const d = new Date(t);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString();
}
export { host, localDate };