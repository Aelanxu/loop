
function localDate(t=Date.now()){
    const d = new Date(t);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString();
}