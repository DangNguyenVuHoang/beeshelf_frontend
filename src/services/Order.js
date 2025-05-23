import { toast } from "react-toastify";

import useAxiosBearer from "./CustomizeAxios";

export default function AxiosOrder() {
  const { fetchDataBearer } = useAxiosBearer();

  const getOrderByUserId = async (
    userId,
    filterByStatus,
    sortBy,
    descending,
    pageIndex,
    Size
  ) => {
    try {
      const queryParams = new URLSearchParams();
      if (typeof filterByStatus !== "")
        queryParams.append("filterByStatus", filterByStatus);
      if (typeof sortBy !== "undefined") queryParams.append("sortBy", sortBy);
      if (typeof descending !== "undefined")
        queryParams.append("descending", descending);
      queryParams.append("pageIndex", pageIndex);
      queryParams.append("pageSize", Size);

      const fetching = await fetchDataBearer({
        url: `order/get-orders/${userId}?${queryParams.toString()}`,
        method: "GET",
      });
      return fetching;
    } catch (e) {
      console.error(e);
      return e;
    }
  };
  const createOrder = async (data, send) => {
    try {
      const fetching = fetchDataBearer({
        url: `order/create-order?send=${send}`,
        method: "POST",
        data: data,
      });
      const result = await toast.promise(fetching, {
        pending: "Order is creating...",
        success: {
          render() {
            return `Order created`;
          },
        },
        error: {
          render({ data }) {
            return `${data.response.data.message || "Something went wrong!"}`;
          },
        },
      });
      return result;
    } catch (e) {
      console.error(e);
      return {
        error: true,
        message: e.response?.data?.message || "Something went wrong!",
      };
    }
  };
  const updateOrder = async (data, orderId, warehouseId, send) => {
    try {
      const fetching = fetchDataBearer({
        url: `order/update-order/${orderId}?${
          warehouseId && "warehouseId=" + warehouseId + "&send=" + send
        }`,
        method: "PUT",
        data: data,
      });
      const result = await toast.promise(fetching, {
        pending: "Order is updating...",
        success: {
          render() {
            return `Order updated`;
          },
        },
        error: {
          render({ data }) {
            return `${data.response.data.message || "Something went wrong!"}`;
          },
        },
      });
      return result;
    } catch (e) {
      console.error(e);
      return {
        error: true,
        message: e.response?.data?.message || "Something went wrong!",
      };
    }
  };

  const sendOrderById = async (id) => {
    try {
      const fetching = fetchDataBearer({
        url: `order/send-order/` + id,
        method: "PUT",
      });
      await toast.promise(fetching, {
        pending: "Order in progress...",
        success: {
          render() {
            return `Send order successfully`;
          },
        },
        error: {
          render({ data }) {
            return `${data.response.data.message || "Something went wrong!"}`;
          },
        },
      });
      return await fetching;
    } catch (e) {
      return e;
    }
  };
  const deleteOrderById = async (id) => {
    try {
      const fetching = fetchDataBearer({
        url: `order/delete-order/` + id,
        method: "DELETE",
      });
      await toast.promise(fetching, {
        pending: "Order in progress...",
        success: {
          render() {
            return `Delete order successfully`;
          },
        },
        error: {
          render({ data }) {
            return `${data.response.data.message || "Something went wrong!"}`;
          },
        },
      });
      return await fetching;
    } catch (e) {
      return e;
    }
  };
  const cancelOrderById = async (id) => {
    try {
      const fetching = fetchDataBearer({
        url: `order/cancel-order/` + id,
        method: "PUT",
      });
      await toast.promise(fetching, {
        pending: "Order in progress...",
        success: {
          render() {
            return `Cancel order successfully`;
          },
        },
        error: {
          render({ data }) {
            return `${data.response.data.message || "Something went wrong!"}`;
          },
        },
      });
      return await fetching;
    } catch (e) {
      return e;
    }
  };

  return {
    getOrderByUserId,
    createOrder,
    sendOrderById,
    deleteOrderById,
    updateOrder,
    cancelOrderById,
  };
}
