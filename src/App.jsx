import { useState } from "react";
import "./App.css";

function App() {

  

  const [transactions, setTransactions] = useState([]);
  const [role, setRole] = useState("viewer");

  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("");

  
  let income = 0;
  let expense = 0;

  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].type === "income") {
      income += transactions[i].amount;
    } else {
      expense += transactions[i].amount;
    }
  }

  let balance = income - expense;

  
  const handleAdd = () => {

    if (amount === "" || category === "") {
      alert("fill all fields");
      return;
    }

    let newItem = {
      id: Date.now(),
      amount: Number(amount),
      type: type,
      category: category
    };

    setTransactions([newItem, ...transactions]);

    setAmount("");
    setCategory("");
  };

  
  const handleDelete = (id) => {

    let newList = [];

    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].id !== id) {
        newList.push(transactions[i]);
      }
    }

    setTransactions(newList);
  };

  
  let map = {};
  for (let i = 0; i < transactions.length; i++) {

    let t = transactions[i];

    if (t.type === "expense") {

      if (!map[t.category]) {
        map[t.category] = 0;
      }

      map[t.category] += t.amount;
    }
  }

  let max = 0;
  let maxCat = "";

  for (let key in map) {
    if (map[key] > max) {
      max = map[key];
      maxCat = key;
    }
  }

  return (
    <div className="app">

      <h1>   Finance Dashboard</h1>

      
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="viewer">Viewer</option>
        <option value="admin">Admin</option>
      </select>
 
      {role === "viewer" && (
        <p style={{ marginTop: "10px", color: "gray" }}>
          Viewer mode (read only)
        </p>
      )}

     
      <div className="top-box">

        <div className="mini-card">
          <p>Income</p>
          <h3 className="green">₹{income}</h3>
        </div>

        <div className="mini-card">
          <p>Expense</p>
          <h3 className="red">₹{expense}</h3>
        </div>

        <div className="mini-card">
          <p>Balance</p>
          <h3 className="blue">₹{balance}</h3>
        </div>

      </div>

      
      {role === "admin" && (
        <div className="form-card">

          <h3>Add Transaction</h3>

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <button onClick={handleAdd}>Add</button>

        </div>
      )}

      
      <h3>Transactions</h3>

      {transactions.length === 0 ? (
        <p>No data</p>
      ) : (
        transactions.map((t) => (
          <div key={t.id} className={`card ${t.type}`}>

            <p>
              <b>{t.category}</b> — ₹{t.amount}
            </p>

            <p>{t.type}</p>

            
            {role === "admin" && (
              <button onClick={() => handleDelete(t.id)}>
                Delete
              </button>
            )}

          </div>
        ))
      )}

     
      <div className="form-card">
        <h3>Insights</h3>

        {maxCat === "" ? (
          <p>No data</p>
        ) : (
          <p>Most spending: {maxCat} (₹{max})</p>
        )}
      </div>

    </div>
  );
}

export default App;