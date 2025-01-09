import { Table, Select, message, DatePicker, Spin } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, updateOrderStatus } from "../../store/features/orderSlice";
import { firestore } from "../../config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import moment from "moment";

const { Option } = Select;
const { RangePicker } = DatePicker;

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.order);

  const [filteredOrders, setFilteredOrders] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const handleStatusChange = async (orderNumber, status) => {
    const orderRef = doc(firestore, "orders", orderNumber.toString());

    try {
      await updateDoc(orderRef, { status });
      dispatch(updateOrderStatus({ orderNumber, status }));
      message.success("Order status updated successfully");
    } catch (error) {
      message.error("Failed to update order status");
    }
  };

  const handleDateChange = (dates) => {
    if (!dates || dates.length === 0) {
      setDateRange([null, null]);
      setFilteredOrders(Object.values(orders));
      return;
    }

    setDateRange(dates);

    const [start, end] = dates.map((date) => date.startOf("day").toDate());

    const filtered = Object.keys(orders)
      .map((orderNumber) => ({
        ...orders[orderNumber],
        orderNumber,
      }))
      .filter(
        (order) =>
          new Date(order.timestamp) >= start && new Date(order.timestamp) <= end
      );

    setFilteredOrders(filtered);
  };

  const dataSource = (
    dateRange[0] && dateRange[1] ? filteredOrders : Object.values(orders)
  ).map((order) => ({
    key: order.orderNumber,
    orderNumber: order.orderNumber,
    userDetails: {
      firstName: order.firstName,
      lastName: order.lastName,
      email: order.email,
      phone: order.phone,
      address: order.address,
      city: order.city,
    },
    items: order.product ? [order.product] : [],
    totalPrice: (order.product ? [order.product] : []).reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ),
    status: order.status,
    timestamp: moment(order.timestamp).format("YYYY-MM-DD HH:mm:ss"),
  }));

  const columns = [
    { title: "Order Number", dataIndex: "orderNumber", key: "orderNumber" },
    {
      title: "Customer Name",
      key: "customerName",
      render: (_, record) =>
        `${record.userDetails.firstName} ${record.userDetails.lastName}` ||
        "N/A",
    },
    {
      title: "Email",
      key: "email",
      render: (_, record) => record.userDetails?.email || "N/A",
    },
    {
      title: "Phone",
      key: "phone",
      render: (_, record) => record.userDetails?.phone || "N/A",
    },
    {
      title: "Address",
      key: "address",
      render: (_, record) => record.userDetails?.address || "N/A",
    },
    {
      title: "City",
      key: "city",
      render: (_, record) => record.userDetails?.city || "N/A",
    },
    {
      title: "Product(s)",
      key: "items",
      render: (_, record) => (
        <div>
          {record.items && record.items.length > 0 ? (
            record.items.map((item, index) => (
              <div key={index}>
                <span>{item.name}</span> - <span>Rs.{item.price}</span> x{" "}
                <span>{item.quantity}</span>
              </div>
            ))
          ) : (
            <span>No products</span>
          )}
        </div>
      ),
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price) => `Rs.${price}`,
    },
    {
      title: "Date & Time",
      dataIndex: "timestamp",
      key: "timestamp",
      render: (timestamp) => timestamp || "N/A",
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <Select
          defaultValue={record.status}
          onChange={(value) => handleStatusChange(record.orderNumber, value)}
          style={{ width: 120 }}
        >
          <Option value="placed">Placed</Option>
          <Option value="confirmed">Confirmed</Option>
          <Option value="delivered">Delivered</Option>
        </Select>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-monster text-center font-semibold mb-4">
        Admin Order Management
      </h2>
      <hr />
      <div className="my-4">
        <RangePicker onChange={handleDateChange} />
      </div>
      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey="orderNumber"
          pagination={false}
          scroll={{ x: 1000 }}
          responsive
        />
      )}
    </div>
  );
};

export default Orders;
