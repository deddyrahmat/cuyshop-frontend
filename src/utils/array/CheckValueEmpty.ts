// fungsi untuk melakukan pengecekan terhadap suatu variabel
//  suatu variabel telah didefinisikan, tidak kosong, dan tidak bernilai false
// outputnya boolean
type EmptyCheckable = string | null | undefined | [] | object;

export function isEmpty(value: EmptyCheckable): boolean {
  if (value == null) return true; // covers both undefined and null
  if (typeof value === "string") return value.trim() === "";
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") return Object.keys(value).length === 0;
  return false;
}
