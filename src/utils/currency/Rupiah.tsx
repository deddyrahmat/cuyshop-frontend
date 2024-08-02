export const formatRupiah = (price: string) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(parseFloat(price));
};
