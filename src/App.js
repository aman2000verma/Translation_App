import "./App.css";
import React from "react";
import COUNTRY_CODES from "./constants";

const DropDown = ({ value, onSelect, filterOut }) => {
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

  return (
    //Interface
    <div className="App">
      <h1>From</h1>

      <DropDown
        filterOut={langs.target} //Remove the target language code from the dropdown
        onSelect={(ev) => {
          setLangs({ ...langs, source: ev.target.value }); //Update the dropdown menu
        }}
        value={langs.source} //Set the initial value
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
        filterOut={langs.source} //Remove the target language code from the dropdown
        onSelect={(ev) => {
          setLangs({ ...langs, source: ev.target.value }); //Update the dropdown menu
        }}
        value={langs.target} //Set the initial value
      />

      <input
        type="text"
        name="text2"
        disabled="true"
        placeholder="Result"
        className="input"
        value={result}
      />

      <button className="button" onClick={translate}>
        Translate
      </button>
    </div>
  );
};

//Methods
const translate = () => {
  alert("Clicked");
};

export default App;
