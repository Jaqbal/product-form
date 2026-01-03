import { useState } from "react";

const ProductForm = () => {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct({
      ...product,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!product.title.trim()) newErrors.title = "Title required";
    if (!product.price || product.price <= 0) newErrors.price = "Price must be greater than 0";
    if (!product.description.trim()) newErrors.description = "Description required";
    if (!product.category.trim()) newErrors.category = "Category required";
    if (!product.image.startsWith("http")) newErrors.image = "Valid image URL required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");

    if (!validate()) return;

    try {
      const res = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      const data = await res.json();
      console.log(data);

      setSuccess("Product created successfully");

      setProduct({
        title: "",
        price: "",
        description: "",
        category: "",
        image: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>NO LIBRARY FORM</h2>

      <label>
        Product title
        <input
          name="title"
          placeholder="Enter product title"
          value={product.title}
          onChange={handleChange}
        />
      </label>
      {errors.title && <p className="error">{errors.title}</p>}

      <label>
        Price
        <input
          name="price"
          type="number"
          placeholder="Enter price"
          value={product.price}
          onChange={handleChange}
        />
      </label>
      {errors.price && <p className="error">{errors.price}</p>}

      <label>
        Description
        <textarea
          name="description"
          placeholder="Enter product description"
          value={product.description}
          onChange={handleChange}
        />
      </label>
      {errors.description && <p className="error">{errors.description}</p>}

      <label>
        Category
        <input
          name="category"
          placeholder="Enter category"
          value={product.category}
          onChange={handleChange}
        />
      </label>
      {errors.category && <p className="error">{errors.category}</p>}

      <label>
        Image URL
        <input
          name="image"
          placeholder="https://example.com/image.jpg"
          value={product.image}
          onChange={handleChange}
        />
      </label>
      {errors.image && <p className="error">{errors.image}</p>}

      <button type="submit">Create Product</button>

      {success && <p className="success">{success}</p>}
    </form>
  );
};

export default ProductForm;
