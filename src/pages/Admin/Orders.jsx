import { Table, Select, message } from "antd";
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
          userDetails: {
            firstName: orders[orderNumber].firstName,
            lastName: orders[orderNumber].lastName,
            email: orders[orderNumber].email,
            phone: orders[orderNumber].phone,
            address: orders[orderNumber].address,
            city: orders[orderNumber].city,
          },
          items: orders[orderNumber].product
            ? [orders[orderNumber].product]
            : [],
          totalPrice: (orders[orderNumber].product
            ? [orders[orderNumber].product]
            : []
          ).reduce((total, item) => total + item.price * item.quantity, 0), // Calculate total price safely
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
      render: (text, record) =>
        `${record.userDetails.firstName} ${record.userDetails.lastName}` ||
        "N/A",
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
      title: "City",
      key: "city",
      render: (text, record) => record.userDetails?.city || "N/A",
    },
    {
      title: "Product(s)",
      key: "items",
      render: (text, record) => (
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
      <h2 className="text-2xl font-monster text-center  font-semibold mb-4">
        Admin Order Management
      </h2>
      <hr />
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
