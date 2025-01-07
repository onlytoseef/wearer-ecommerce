import { Table, Select, Button, message } from "antd";
import { useEffect, useState } from "react";
import { getOrders, updateOrderStatus } from "../../store/features/orderSlice"; // Adjust your slice paths accordingly
import { useDispatch, useSelector } from "react-redux";
import { firestore } from "../../config/firebase"; // Assuming Firebase is set up correctly
import { doc, updateDoc } from "firebase/firestore";

const { Option } = Select;

const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);

  const [loading, setLoading] = useState(false);

  // Fetch orders from Firestore (or use Redux store)
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        // Dispatch getOrders to fetch data from Firestore and update Redux store
        dispatch(getOrders());
      } catch (error) {
        message.error("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [dispatch]);

  const handleStatusChange = async (orderNumber, status) => {
    const orderRef = doc(firestore, "orders", orderNumber);

    try {
      // Update order status in Firestore
      await updateDoc(orderRef, {
        status,
      });

      // Dispatch action to update status in Redux store
      dispatch(updateOrderStatus({ orderNumber, status }));
      console.log(
        "User Details:",
        orders[orderNumber]?.userDetails || "NO DETAILS"
      );
      message.success("Order status updated successfully");
    } catch (error) {
      message.error("Failed to update order status");
    }
  };

  // Map the data from Firebase structure
  const dataSource =
    orders && Object.keys(orders).length > 0
      ? Object.keys(orders).map((orderNumber) => ({
          key: orderNumber,
          orderNumber,
          userDetails: orders[orderNumber].userDetails || {},
          items: orders[orderNumber].items, // Array of products
          totalPrice: orders[orderNumber].items.reduce(
            (total, item) =>
              total + item.productOrder.price * item.productOrder.quantity,
            0
          ), // Calculate total price
          status: orders[orderNumber].status,
        }))
      : [];

  const columns = [
    {
      title: "Order Number",
      dataIndex: "orderNumber",
      key: "orderNumber",
    },
    {
      title: "Customer Name",
      key: "customerName",
      render: (text, record) => record.userDetails?.name || "N/A",
    },
    {
      title: "Email",
      key: "email",
      render: (text, record) => record.userDetails?.email || "N/A",
    },
    {
      title: "Phone",
      key: "phone",
      render: (text, record) => record.userDetails?.phone || "N/A",
    },
    {
      title: "Address",
      key: "address",
      render: (text, record) => record.userDetails?.address || "N/A",
    },
    {
      title: "Product(s)",
      key: "items",
      render: (text, record) => (
        <div>
          {record.items.map((item, index) => (
            <div key={index}>
              <span>{item.productOrder.name}</span> -{" "}
              <span>${item.productOrder.price}</span> x{" "}
              <span>{item.productOrder.quantity}</span>
            </div>
          ))}
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
      title: "Status",
      key: "status",
      render: (text, record) => (
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
      <h2 className="text-2xl font-semibold mb-4">Admin Order Management</h2>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey="orderNumber"
        pagination={false}
        scroll={{ x: 1000 }} // Add horizontal scrolling for small screens
        responsive // Enable responsive behavior for smaller screens
      />
    </div>
  );
};

export default Orders;
