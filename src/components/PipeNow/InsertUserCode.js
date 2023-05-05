import React from "react";

import { PipeContext } from "../../PipeContext";

import "./InsertUserCode.css";

function InsertUserCode() {
  const {
    saveUserCode,
    loadingIsUserCodeValid,
    isUserCodeValid,
    setDisplayInsertUserCode,
  } = React.useContext(PipeContext);

  const [wasUserCodeInserted, setWasUserCodeInserted] = React.useState(false);

  function changeInput(e) {
    if (e.target.value.length === 4) {
      saveUserCode(e.target.value);
      setWasUserCodeInserted(true);
    } else {
      setWasUserCodeInserted(false);
    }
  }

  return (
    <div className="InsertUserCode">
      <div className="InsertUserCode__form">
        <button
          className="InsertUserCode__form__X"
          onClick={() => {
            setDisplayInsertUserCode(false);
          }}
        >
          X
        </button>
        <label className="InsertUserCode__form__title">
          Ingresa el código de 4 dígitos para modificar los procesos
        </label>
        <input
          type="text"
          name="User Code"
          maxLength={4}
          placeholder="0000"
          className="InsertUserCode__form__input"
          onChange={changeInput}
        />
        {wasUserCodeInserted && !loadingIsUserCodeValid && !isUserCodeValid && (
          <p className="InsertUserCode__form__wasValid">
            ❌ Código no válido, ingrésalo de nuevo
          </p>
        )}
        {wasUserCodeInserted && !loadingIsUserCodeValid && isUserCodeValid && (
          <p className="InsertUserCode__form__wasValid">✅ Código válido</p>
        )}
      </div>
    </div>
  );
}

export { InsertUserCode };
