import "./category.css";

export default function NewProduct() {
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Category</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Name</label>
          <input type="text" placeholder="Category Name" />
        </div>
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" placeholder="select image for category" />
        </div>
        <div className="addProductItem">
          <label>Active</label>
          <select name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <button className="addProductButton">Create</button>
      </form>
    </div>
  );
}
