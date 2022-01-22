/**
 * Commons.
 */
function kbesIsTrue(str) {
  return str && /(true|on|yes)/i.test(str);
}

/**
 * Generators.
 */
function kbesRuntimeId() {
  return 'X' + Date.now() + Math.ceil(Math.random() * 1000);
}

function kbesIsRuntimeId(id) {
  return /^X\d+$/.test(id);
}

/**
 * Checks.
 */
function kbesIsPositive(val) {
  return /^\d+$/.test(val);
}

function kbesIsPrice(val) {
  return /^[\d\s,\.]+$/.test(val);
}

/**
 * Formatting.
 */
function kbesFormatPrice(val) {
  var arr = ('' + val).split('.'),
    part1 = arr[0],
    part2 = arr.length > 1 ? '.' + arr[1] : '',
    rgx = /(\d+)(\d{3})/;
  while (rgx.test(part1)) {
    part1 = part1.replace(rgx, '$1' + ' ' + '$2');
  }
  return (part1 + part2).replace(/\s/gi, '\xA0'); // solid
}

/** end. */
