import { FaClock, FaCopyright } from "react-icons/fa";

function Footer() {
  return (
    <footer className="py-5 px-8 bg-white mt-8">
      <section className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
        <article className=" w-full">
          <h2 className="text-lg lg:text-xl font-bold">Alamat</h2>
          <hr className="mt-2 mb-3 border-2 border-gray-300" />
          <p>Jalan. Sudirman, Pekanbaru, Riau</p>
        </article>
        <article className=" w-full">
          <h2 className="text-lg lg:text-xl font-bold">Metode Pembayaran</h2>
          <hr className="mt-2 mb-3 border-2 border-gray-300" />
          <section className="grid grid-cols-3 gap-4 ">
            <div>
              <img
                src="./image/payments/BCA.png"
                alt="BCA"
                className="w-32 lg:w-20 object-contain "
              />
            </div>
            <div>
              <img
                src="./image/payments/BNI.png"
                alt="BNI"
                className="w-32 lg:w-20 object-contain "
              />
            </div>
            <div>
              <img
                src="./image/payments/BRI.png"
                alt="BRI"
                className="w-32 lg:w-20 object-contain "
              />
            </div>
          </section>
        </article>
        <article className=" w-full">
          <h2 className="text-lg lg:text-xl font-bold">Jam Operasional</h2>
          <hr className="mt-2 mb-3 border-2 border-gray-300" />
          <div className="flex items-center justify-start gap-2">
            <FaClock />
            <span>Buka Setiap hari</span>
          </div>
          <div className="flex items-center justify-start gap-2 ">
            <p className="font-bold">{`Senin-Jum'at`}</p>
            <span>08.30 - 18.00 WIB</span>
          </div>
          <div className="flex items-center justify-start gap-2 ">
            <p className="font-bold">Sabtu-Minggu</p>
            <span>08.30 - 16.00 WIB</span>
          </div>
        </article>
      </section>
      <hr className="border-2 border-gray-200 mt-5 mb-3" />
      <section className="flex items-center justify-center gap-2">
        <p>
          <FaCopyright />
        </p>
        <span className="text-lg">CuyShop </span>
        <span>2024</span>
      </section>
    </footer>
  );
}

export default Footer;
