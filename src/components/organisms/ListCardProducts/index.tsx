import Card from "../../molecules/Card";
import Pagination from "../../molecules/Pagination";

function ListCardProducts() {
  return (
    <section className="2xl:container 2xl:mx-auto py-5 px-8 2xl:px-1">
      <section className="flex lg:items-end flex-col lg:flex-row gap-2 mb-5">
        <h1 className="font-bold ">Produk Baru</h1>
        <hr className="w-11/12 border border-green-600" />
      </section>
      <section className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4 gap-3">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </section>

      <section className="flex justify-center mt-8 lg:mt-10">
        <Pagination />
      </section>
    </section>
  );
}

export default ListCardProducts;
