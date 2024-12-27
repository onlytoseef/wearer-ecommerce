import React, { useEffect, useState, Suspense } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  notification,
  Spin,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  fetchProducts,
  updateProduct,
  deleteProduct,
} from "../../store/features/productSlice";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"; // Import icons

const { Option } = Select;
const LazyTable = React.lazy(() => import("antd/es/table"));

const AddProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);

  const [form] = Form.useForm();

  // Fetch products when component mounts
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddProduct = async (values) => {
    try {
      if (editingProduct) {
        // If editing an existing product
        await dispatch(
          updateProduct({ id: editingProduct.id, updatedProduct: values })
        ).unwrap();
        notification.success({
          message: "Product Updated",
          description: "The product has been updated successfully!",
        });
      } else {
        // Add a new product
        await dispatch(addProduct(values)).unwrap();
        notification.success({
          message: "Product Added",
          description: "The product has been added successfully!",
        });
      }
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      console.error("Error adding/updating product:", error);
      notification.error({
        message: "Error",
        description:
          error.message ||
          "An error occurred while adding/updating the product.",
      });
    }
  };

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    form.setFieldsValue(product);
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img
          src={image}
          alt="Product"
          style={{
            width: 50,
            height: 50,
            objectFit: "cover", // Maintain aspect ratio
            borderRadius: "50%", // Make the image round
          }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Stock Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Button
            onClick={() => handleEditProduct(record)}
            icon={<EditOutlined />} // Edit icon
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button
            type="danger"
            onClick={() => handleDeleteProduct(record.id)}
            icon={<DeleteOutlined />} // Delete icon
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="min-h-100">
      <Button
        className="bg-primary text-white hover:bg-transparent hover:!text-primary hover:!outline-primary font-monster "
        onClick={() => setIsModalOpen(true)}
      >
        Add Product
      </Button>

      {/* Lazy loading the Table with Suspense */}
      <Suspense fallback={<Spin size="large" tip="Loading Products..." />}>
        <LazyTable
          columns={columns}
          dataSource={products}
          rowKey="id"
          loading={status === "loading"}
          pagination={{ pageSize: 5 }}
          // Add responsive behavior here
          scroll={{ x: 768 }} // Horizontal scroll on small screens
        />
      </Suspense>

      {/* Modal for adding/updating product */}
      <Modal
        title={editingProduct ? "Edit Product" : "Add Product"}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingProduct(null);
          form.resetFields();
        }}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddProduct}>
          <Form.Item
            name="name"
            label="Product Name"
            rules={[{ required: true, message: "Please enter product name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Product Description"
            rules={[
              { required: true, message: "Please enter product description" },
            ]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item
            name="image"
            label="Product Image URL"
            rules={[
              { required: true, message: "Please enter product image URL" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select placeholder="Select category">
              <Option value="tracksuits">Tracksuits</Option>
              <Option value="caps">Caps</Option>
              <Option value="hoodies">Hoodies</Option>
              <Option value="tshirts">T-Shirts</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="quantity"
            label="Stock Quantity"
            rules={[{ required: true, message: "Please enter stock quantity" }]}
          >
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="sizes"
            label="Available Sizes"
            rules={[
              { required: true, message: "Please select at least one size" },
            ]}
          >
            <Select mode="multiple" placeholder="Select sizes">
              <Option value="small">Small</Option>
              <Option value="medium">Medium</Option>
              <Option value="large">Large</Option>
              <Option value="extra-large">Extra Large</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {editingProduct ? "Update Product" : "Add Product"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddProduct;
