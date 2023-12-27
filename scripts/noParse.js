export function parseToFloatFx2(value) {
  return parseFloat(value.toString().replace(",", ".")).toFixed(2);
}
