import { useForm } from "react-hook-form";

const LibraryForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      console.log(result);
      reset();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>LIBRARY FORM</h2>

      <label>
        Product title
        <input
          placeholder="Enter product title"
          {...register("title", { required: "Title required" })}
        />
      </label>
      {errors.title && <p className="error">{errors.title.message}</p>}

      <label>
        Price
        <input
          type="number"
          placeholder="Enter price"
          {...register("price", {
            required: "Price required",
            min: { value: 0.1, message: "Price must be greater than 0" },
          })}
        />
      </label>
      {errors.price && <p className="error">{errors.price.message}</p>}

      <label>
        Description
        <textarea
          placeholder="Enter product description"
          {...register("description", {
            required: "Description required",
          })}
        />
      </label>
      {errors.description && (
        <p className="error">{errors.description.message}</p>
      )}

      <label>
        Category
        <input
          placeholder="Enter category"
          {...register("category", {
            required: "Category required",
          })}
        />
      </label>
      {errors.category && (
        <p className="error">{errors.category.message}</p>
      )}

      <label>
        Image URL
        <input
          placeholder="https://example.com/image.jpg"
          {...register("image", {
            required: "Image required",
            pattern: {
              value: /^https?:\/\//,
              message: "Valid URL required",
            },
          })}
        />
      </label>
      {errors.image && <p className="error">{errors.image.message}</p>}

      <button type="submit">Create Product</button>
    </form>
  );
};

export default LibraryForm;
