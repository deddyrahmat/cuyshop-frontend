import { useState, useEffect } from "react";
import { handleOrders } from "../../../services/order";
import {
  CartType,
  DataItem,
  Order,
  OrderItemsParseType,
  PaginationData,
} from "../../../types/containerTypes";
import { formatRupiah } from "../../../utils/currency/Rupiah";
import Button from "../../atoms/Button";

export const useOrderContent = () => {
  const [dataProducts, setDataProducts] = useState<DataItem[]>([]);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
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
      const mappedData = mapOrdersToDataItems(res.data?.data || [], page);
      setDataProducts(mappedData);
      setPagination(res.data?.pagination || null);
    }
  };

  const mapOrdersToDataItems = (
    orders: Order[],
    currentPage: number
  ): DataItem[] => {
    return orders.map((order, index) => {
      const penerima = order?.address?.fullname || "";
      const statusPayment = (
        <p
          className={`${order?.status === "success" ? "text-green-600" : "text-red-600"} font-medium`}
        >
          {order.status || ""}
        </p>
      );
      const dibeli = new Date(order.created_at).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      const total = formatRupiah(order?.total_price || "0");
      const snapUrlObject = JSON.parse(order.snap_url.split("\r\n\r\n")[1]);
      const snapUrl = snapUrlObject.snap_url || "";
      const onClickPay = () => (window.location.href = snapUrl);
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

      const id = (currentPage - 1) * 10 + (index + 1);

      const action =
        order.status === "success" ? (
          <Button
            statusButton="custom"
            type="button"
            onClick={() => handleDetail(order?.id)}
            className="mx-auto bg-green-400 text-white px-3 py-1 rounded text-xs"
          >
            Detail
          </Button>
        ) : (
          <section className="flex gap-2">
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
          </section>
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
  const parseOrderItems = () => {
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
  };

  useEffect(() => {
    parseOrderItems();
  }, [productOrder]);

  return {
    cartOrderProduct,
    dataProducts,
    pagination,
    currentPage,
    isModalOpen,
    productOrder,
    orderItemsParse,
    setCurrentPage,
    closeModal,
  };
};
