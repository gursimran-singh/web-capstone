import "./widgetLg.css";
import { useState, useEffect } from "react";
import baseURL from "../../slices/requestMethods.js";

export default function WidgetLg() {
  const initialProdState = {
    id: null,
  };

  const [objData, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {

      const result = baseURL.get("/order")
        .then(response => {
          setData(response.data.Items);
        });
    };

    
    fetchData();

  }, []);

  if (objData.length > 8) {
    setData(objData.slice(0, 8));
  }

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        {objData.map(obj => {
          return (
            <tr className="widgetLgTr">
              <td className="widgetLgUser">
                <span className="widgetLgName">{obj.customer_name}</span>
              </td>
              <td className="widgetLgDate">{obj.order_date}</td>
              <td className="widgetLgAmount">${obj.total_price}</td>
              <td className="widgetLgStatus">
                <Button type="Approved" />
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
