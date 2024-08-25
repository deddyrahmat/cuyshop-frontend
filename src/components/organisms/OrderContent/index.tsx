import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import Table from "../Table";
import { handleOrders } from "../../../services/order";
import {
  CartType,
  DataItem,
  Order,
  OrderItemsParseType,
  PaginationData,
} from "../../../types/containerTypes";
import { isEmpty } from "../../../utils/array/CheckValueEmpty";
import Pagination from "../../molecules/Pagination";
import Button from "../../atoms/Button";
import { formatRupiah } from "../../../utils/currency/Rupiah";
import Modal from "../../molecules/Modal";
import DefaultCard from "../../molecules/DefaultCard";

const OrderContent: React.FC = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1024px)" });

  const [dataProducts, setDataProducts] = useState<DataItem[]>([]);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productOrder, setProductOrder] = useState<Order | null>(null);
  const [orderItemsParse, setOrderItemsParse] = useState<OrderItemsParseType[]>(
    []
  );

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const listProducts = async (page = 1) => {
    const res = await handleOrders(page);
    if (res) {
      const mappedData = mapOrdersToDataItems(
        res.data?.data || [],
        page,
        itemsPerPage
      );
      setDataProducts(mappedData);
      setPagination(res.data?.pagination || null);
    }
  };

  const mapOrdersToDataItems = (
    orders: Order[],
    currentPage: number,
    itemsPerPage: number
  ): DataItem[] => {
    return orders.map((order, index) => {
      const penerima = order?.address?.fullname || "";
      const statusPayment = order.status || "";
      const dibeli = new Date(order.created_at).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      const total = formatRupiah(order?.total_price || "0");
      const snapUrlObject = JSON.parse(order.snap_url.split("\r\n\r\n")[1]);
      const snapUrl = snapUrlObject.snap_url || "";
      const onClickPay = () => window.open(snapUrl, "_blank");
      const handleDetail = (id: number) => {
        const selectedOrder = orders.find((data: Order) => data.id === id);
        if (selectedOrder) {
          setProductOrder(selectedOrder);
          openModal();
        } else {
          console.warn("Order not found for id:", id);
          setProductOrder(null);
        }
      };

      const id = (currentPage - 1) * itemsPerPage + (index + 1);

      const action = order.status ? (
        <Button
          statusButton="custom"
          type="button"
          onClick={() => handleDetail(order?.id)}
          className="mx-auto bg-green-400 text-white px-3 py-1 rounded text-xs"
        >
          Detail
        </Button>
      ) : (
        <>
          <Button
            statusButton="custom"
            type="button"
            onClick={onClickPay}
            className="mx-auto bg-yellow-600 text-white px-3 py-1 rounded text-xs"
          >
            Pay
          </Button>
          <Button
            statusButton="custom"
            type="button"
            onClick={() => handleDetail(order?.id)}
            className="mx-auto bg-green-400 text-white px-3 py-1 rounded text-xs"
          >
            Detail
          </Button>
        </>
      );

      return {
        id: id.toString(),
        Penerima: penerima,
        Total: total,
        "Status Pembayaran": statusPayment,
        "Tanggal Pembelian": dibeli,
        Action: action,
      };
    });
  };

  useEffect(() => {
    listProducts(currentPage);
  }, [currentPage]);

  const [cartOrderProduct, setCartOrderProduct] = useState<CartType[]>([]);
  useEffect(() => {
    if (productOrder?.order_items) {
      try {
        const parsedOrderItems = JSON.parse(productOrder.order_items);
        setOrderItemsParse(parsedOrderItems);
        setCartOrderProduct(parsedOrderItems[0]);
      } catch (error) {
        console.error("Failed to parse order items", error);
        setOrderItemsParse([]);
      }
    }
  }, [productOrder]);

  console.log("dataPro", dataProducts);
  return (
    <>
      <Modal isOpen={isModalOpen} title="Detail Order" onClose={closeModal}>
        <section className="grid grid-rows-1 gap-4 items-start">
          <section className="flex lg:items-end flex-col lg:flex-row gap-4">
            <h1 className="font-bold capitalize">Tujuan Pengiriman</h1>
            <hr className="flex-grow border border-green-600" />
          </section>
          {productOrder && orderItemsParse.length > 0 ? (
            <>
              <article className="flex-grow text-left space-y-2">
                <section className="flex gap-2">
                  <h6 className="capitalize">{orderItemsParse[1]?.fullname}</h6>
                  <span className="font-normal">|</span>
                  <span className="font-normal hover:!text-white">
                    {orderItemsParse[1]?.phone}
                  </span>
                </section>
                <p className="text-sm font-normal">{`${orderItemsParse[1]?.address} ${orderItemsParse[1]?.other ?? ""}`}</p>
                <p className="text-sm font-normal uppercase">{`${orderItemsParse[1]?.province?.name ?? ""}, ${orderItemsParse[1]?.city?.name ?? ""}, ${orderItemsParse[1]?.city?.postal_code ?? ""}`}</p>
              </article>

              <section className="flex lg:items-end flex-col lg:flex-row gap-4 mt-5">
                <h1 className="font-bold capitalize">Daftar Produk</h1>
                <hr className="flex-grow border border-green-600" />
              </section>
              <section className="grid grid-cols-1 lg:grid-cols-2 gap-2 space-y-10">
                {cartOrderProduct?.map((item: CartType, indexItem: number) => (
                  <article
                    key={indexItem}
                    className="p-3 rounded shadow border-gray-200"
                  >
                    <div className="w-full">
                      <img
                        src={item.thumbnail}
                        alt={`${item.title} Image`}
                        className="h-full w-full max-w-52 max-h-52 rounded-md mx-auto"
                      />
                    </div>
                    <div className="w-full">
                      <p className="text-lg">{item.title}</p>
                      <p className="text-green-600 text-xl mt-3 font-bold">
                        {formatRupiah(item?.price)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {item.weight} Gram
                      </p>
                    </div>
                  </article>
                ))}
              </section>

              <section className="flex lg:items-end flex-col lg:flex-row gap-4 mt-5">
                <h1 className="font-bold capitalize">Layanan Pengiriman</h1>
                <hr className="flex-grow border border-green-600" />
              </section>
              {orderItemsParse[2] && (
                <section className="flex flex-col justify-between h-full p-6 border border-gray-200 rounded-lg shadow bg-white text-gray-700">
                  <div>
                    <p className="capitalize font-bold">
                      {orderItemsParse[2]?.service}
                    </p>
                    <p className="text-sm text-wrap mt-3 font-semibold">
                      Detail :
                    </p>
                    <p className="text-sm text-wrap">
                      {orderItemsParse[2]?.description ??
                        "Deskripsi tidak tersedia"}
                    </p>
                    <p className="text-sm text-wrap mt-3 font-semibold">
                      Estimasi Pengiriman :
                    </p>
                    <p className="text-sm text-wrap">
                      {orderItemsParse[2]?.cost?.[0]?.etd ??
                        "Estimasi tidak tersedia"}{" "}
                      hari
                    </p>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-wrap font-semibold">Biaya :</p>
                    <p className="text-sm text-wrap">
                      {/* {formatRupiah(orderItemsParse[2]?.cost?.[0]?.value ?? 0)} */}
                      {formatRupiah(
                        String(orderItemsParse[2]?.cost?.[0]?.value) ??
                          String(0)
                      )}
                    </p>
                  </div>
                </section>
              )}
            </>
          ) : (
            <DefaultCard>No data available</DefaultCard>
          )}
        </section>
      </Modal>
      <section className="container mx-auto py-5 px-8 bg-white min-h-[50vh] rounded">
        {isDesktopOrLaptop && (
          <>
            <section className="flex lg:items-end flex-col lg:flex-row  gap-4 mb-8">
              <h1 className="font-bold capitalize">List Orders</h1>
              <hr className="flex-grow border border-green-600" />
            </section>
            <Table data={dataProducts} showActionColumn={true} />
          </>
        )}

        {isTabletOrMobile && (
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <section className="flex lg:items-end flex-col lg:flex-row  gap-1 mb-4">
              <h1 className="font-bold capitalize">List Orders</h1>
              <hr className="flex-grow border border-green-600" />
            </section>
            {Array.isArray(dataProducts) &&
              !isEmpty(dataProducts) &&
              dataProducts.map((product: DataItem, productIndex: number) => (
                <DefaultCard key={productIndex}>
                  <p className="capitalize font-semibold mb-2">
                    {product?.Penerima}
                  </p>
                  <p className="font-medium">
                    {product?.["Tanggal Pembelian"]}
                  </p>
                  <p className="font-medium">{product?.Total}</p>
                  <div className="flex justify-between items-center w-full mt-4">
                    <span
                      className={`${product["Status Pembayaran"] === "pending" ? "bg-yellow-100 text-yellow-800" : product["Status Pembayaran"] === "cancel" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}  text-xs font-medium py-1 px-3 rounded `}
                    >
                      {product["Status Pembayaran"]}
                    </span>
                    <span>{product.Action}</span>
                  </div>
                </DefaultCard>
              ))}
          </section>
        )}
        {!isEmpty(dataProducts) && (
          <section className="flex justify-center mt-8 lg:mt-10">
            {pagination &&
              pagination?.from !== 1 &&
              pagination?.last_page !== 1 && (
                <Pagination
                  currentPage={pagination.current_page}
                  lastPage={pagination.last_page}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              )}
          </section>
        )}
      </section>
    </>
  );
};

export default OrderContent;
