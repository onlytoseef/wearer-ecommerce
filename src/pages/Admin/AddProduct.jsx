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
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Option } = Select;
const LazyTable = React.lazy(() => import("antd/es/table"));

const AddProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);

  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddProduct = async (values) => {
    try {
      if (editingProduct) {
        await dispatch(
          updateProduct({ id: editingProduct.id, updatedProduct: values })
        ).unwrap();
        notification.success({
          message: "Product Updated",
          description: "The product has been updated successfully!",
        });
      } else {
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
    form.setFieldsValue({
      ...product,
      images: product.images ? product.images.join(", ") : "",
    });
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: "Images",
      dataIndex: "images",
      key: "images",
      render: (images) => (
        <div style={{ display: "flex", gap: "5px" }}>
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Product-${index}`}
              style={{
                width: 50,
                height: 50,
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
          ))}
        </div>
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
      title: "Product Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Button
            onClick={() => handleEditProduct(record)}
            icon={<EditOutlined className="text-green-600" />}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDeleteProduct(record.id)}
            icon={<DeleteOutlined className="text-red-500" />}
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
        className="bg-primary text-white hover:bg-transparent hover:!text-primary hover:!outline-primary font-monster"
        onClick={() => setIsModalOpen(true)}
      >
        Add Product
      </Button>

      <h1 className="text-center sm:text-[2rem] font-monster">All Products</h1>
      <hr className="mb-4" />

      <Suspense fallback={<Spin size="large" tip="Loading Products..." />}>
        <LazyTable
          columns={columns}
          dataSource={products.map((product) => ({
            ...product,
            images: product.images
              ? Array.isArray(product.images)
                ? product.images
                : product.images.split(",").map((img) => img.trim())
              : [],
          }))}
          rowKey="id"
          loading={status === "loading"}
          pagination={{ pageSize: 5 }}
          scroll={{ x: 768 }}
        />
      </Suspense>

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
            name="images"
            label="Product Image URLs (comma-separated)"
            rules={[
              { required: true, message: "Please enter product image URLs" },
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
            name="price"
            label="Product Price"
            rules={[{ required: true, message: "Please enter Product Price" }]}
          >
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="originalPrice"
            label="Original Price"
            rules={[
              { required: true, message: "Please enter Orignal Product Price" },
            ]}
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
              <Option value="S-30">S-30</Option>
              <Option value="M-32">M-32</Option>
              <Option value="L-34">L-34</Option>
              <Option value="XL-36">XL-36</Option>
              <Option value="XXL-38">XXL-38</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              className="bg-primary text-white hover:!bg-green-900 hover:!text-white hover:!outline-primary"
              htmlType="submit"
              block
            >
              {editingProduct ? "Update Product" : "Add Product"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddProduct;
