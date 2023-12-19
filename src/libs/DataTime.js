export function dbStandardTime (str) {
 return str.replace('T',' ').substring(0,16)
}