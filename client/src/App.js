import React, { useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";

const App = () => {
  const [data, setData] = useState({
    name: "",
    price1: 0,
    price2: 0,
    receiptId: "",
  });

  const handlChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const hanleSubmitCreatePdf = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/create-pdf", data).then((response) => {
      axios
        .get("http://localhost:5000/get-pdf", { responseType: "blob" })
        .then((res) => {
          const pdfBlog = new Blob([res.data], { type: "application/pdf" });
          saveAs(pdfBlog,"newPdf.pdf")
        });
    });
  };

  return (
    <div>
      <form onSubmitCapture={hanleSubmitCreatePdf}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={data.name}
          onChange={handlChange}
        />
        <br />
        <input
          type="number"
          placeholder="Receip Id"
          name="receiptId"
          value={data.receiptId}
          onChange={handlChange}
        />
        <br />
        <input
          type="number"
          placeholder="Price 1"
          name="price1"
          value={data.price1}
          onChange={handlChange}
        />
        <br />
        <input
          type="number"
          placeholder="Price 2"
          value={data.price2}
          name="price2"
          onChange={handlChange}
        />
        <br />
        <button type="submit">Generate Pdf</button>
      </form>
    </div>
  );
};

export default App;
