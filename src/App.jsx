import React, { useState } from "react";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [dataList, setDataList] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const fetchData = async () => {
    if (!inputValue) {
      alert("Masukkan kata kunci abstrak!");
      return;
    }

    try {
      const response = await fetch(
        `https:///web-production-0386.up.railway.app/jurnal-rekomen/?abstract=${encodeURIComponent(
          inputValue
        )}&cachebust=${new Date().getTime()}`
      );
      const result = await response.json();

      if (Array.isArray(result)) {
        setDataList(result);
      } else {
        alert("Data yang diterima bukan list.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Gagal memuat data. Coba lagi.");
    }
  };

  return (
    <div>
      <header className="header">
        <h1>Sistem Rekomendasi Jurnal</h1>
      </header>

      <div className="container">
        <h1>Cari Jurnal</h1>
        <div className="input-group">
          <input
            type="text"
            placeholder="Masukkan abstrak..."
            value={inputValue}
            onChange={handleInputChange}
          />
          <button onClick={fetchData}>Cari</button>
        </div>
        <ul>
          {dataList.map((item, index) => (
            <li key={index}>
              <strong>Jurnal ID:</strong> {item.journalId}
              <br />
              <strong>Judul:</strong> {item.title}
              <br />
              <strong>Abstrak:</strong> {item.abstract}
              <br />
              <strong>Skor:</strong> {item.skor}
              <br />
              <strong>Link:</strong>{" "}
              <a href={item.Link} target="_blank" rel="noopener noreferrer">{item.Link}</a> 
              
            </li>
          ))}
        </ul>
      </div>

      <footer className="footer">
        &copy; 2024 Sistem Rekomendasi Jurnal.
      </footer>
    </div>
  );
}

export default App;
