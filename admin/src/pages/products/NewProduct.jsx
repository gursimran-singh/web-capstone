import "./product.css";

export default function NewProduct() {
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="file" />
        </div>
        <div className="addProductItem">
          <label>Name</label>
          <input type="text" placeholder="Name" />
        </div>
        <div className="addProductItem">
          <label>Category</label>
          <select name="active" id="active">
            <option value="yes">cate1</option>
            <option value="no">cate2</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input type="text" placeholder="price" />
        </div>
        <div className="addProductItem">
          <label>Active</label>
          <select name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input type="textarea" row="2" />
        </div>
        <button className="addProductButton">Create</button>
      </form>
    </div>
  );
}
