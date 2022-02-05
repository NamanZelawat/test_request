import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";

let BASE_URL = "http://3.108.225.220:5000";

function App() {
  //Search hooks
  let [stext, setStext] = useState("naman");
  let [info, setInfo] = useState([]);
  let [disable, setDisable] = useState(false);
  let [token, setToken] = useState("");

  //Adding value hooks
  let [vname, setVname] = useState("naman");
  let [ltp, setLtp] = useState(0);
  let [lcp, setLcp] = useState(0);
  let [disableAdd, setDisableAdd] = useState(false);

  useEffect(() => {
    fetch(`${BASE_URL}/api/user-access-token`).then((res) => {
      res.json().then((val) => {
        setToken(val.token);
      });
    });
  });

  //Search submit
  let handleSubmit = () => {
    setDisable(true);
    setTimeout(() => {
      setDisable(false);
    }, 3000);
    fetch(`${BASE_URL}/api/data?search_string=` + stext, {
      headers: {
        "user-access-token": token,
      },
    }).then((res) => {
      res.json().then((val) => {
        console.log(val);
        setInfo(val);
      });
    });
  };

  //Add submit
  let handleSubmitAdd = () => {
    setDisableAdd(true);
    setTimeout(() => {
      setDisableAdd(false);
    }, 3000);
    let body_obj = {
      name: vname,
      ltp: parseFloat(ltp),
      lcp: parseFloat(lcp),
    };
    let string_obj = JSON.stringify(body_obj);
    console.log(string_obj);
    fetch(`${BASE_URL}/api/data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "user-access-token": token,
      },
      body: string_obj,
    }).then((res) => {
      console.log(res);
    });
  };

  //Search bar
  let handleChange = (e) => {
    setStext(e.target.value);
  };

  //Adding value
  let handleChangeVname = (e) => {
    setVname(e.target.value);
  };
  let handleChangeLtp = (e) => {
    setLtp(e.target.value);
  };
  let handleChangeLcp = (e) => {
    setLcp(e.target.value);
  };

  return (
    <div className="App">
      <input type="text" value={stext} onChange={handleChange}></input>
      <button disabled={disable} onClick={handleSubmit}>
        Search
      </button>
      {info.map((val, idx) => {
        return <div key={idx}>{JSON.stringify(val)}</div>;
      })}
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <label>name : </label>
      <input type="text" value={vname} onChange={handleChangeVname}></input>
      <br></br>
      <label>ltp : </label>
      <input type="text" value={ltp} onChange={handleChangeLtp}></input>
      <br></br>
      <label>lcp : </label>
      <input type="text" value={lcp} onChange={handleChangeLcp}></input>
      <br></br>
      <button disabled={disableAdd} onClick={handleSubmitAdd}>
        Add
      </button>
    </div>
  );
}

export default App;
