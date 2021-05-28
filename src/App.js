import "./App.css";
import React from "react";
import COUNTRY_CODES from "./constants";

const DropDown = ({ filterOut, onSelect, value }) => {
  return (
    <select value={value} onSelect={onSelect} onChange={onSelect}>
      {COUNTRY_CODES.map(
        (lan) =>
          lan[1] !== filterOut && <option value={lan[1]}>{lan[0]}</option>
      )}
    </select>
  );
};

const App = () => {
  const input = React.useRef();
  const [result, setResult] = React.useState("");
  const [langs, setLangs] = React.useState({ source: "en", target: "hi" });

  const translateReq = React.useCallback(async () => {
    const res = await fetchTranslation(input.current.value, langs);
    setResult(res);
  }, [input.current, langs]);

  return (
    //Interface
    <div className="App">
      <h1>From</h1>

      <DropDown
        filterOut={langs.target}
        onSelect={(ev) => {
          setLangs({ ...langs, source: ev.target.value });
        }}
        value={langs.source}
      />

      <input
        type="text"
        name="text1"
        placeholder="Type here"
        className="input"
        ref={input}
      />

      <h1>To</h1>

      <DropDown
        filterOut={langs.source}
        onSelect={(ev) => {
          setLangs({ ...langs, target: ev.target.value });
        }}
        value={langs.target}
      />

      <input
        type="text"
        name="text2"
        disabled="true"
        placeholder="Result"
        className="input"
        value={result}
      />

      <button className="button" onClick={translateReq}>
        Translate
      </button>
    </div>
  );
};

//HTTP request
const fetchTranslation = async (text, langs) => {
  return (
    await (
      await fetch("http://localhost:8000/translate", {
        method: "POST",
        body: JSON.stringify({ text, langs }),
        headers: { "Content-Type": "application/json" }
      })
    ).json()
  ).data;
};

export default App;
