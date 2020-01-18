import React from "react";
import "../style/SearchBar.css";

function SearchBar({
  handleSubmit,
  channelIdQuery,
  setChannelIdQuery,
  setSelectType
}) {

  const handleSelect = (e) => {
    setSelectType(e.target.value);
    console.log(e.target.value)
  }

  return (
    <form className="search-container" onSubmit={handleSubmit}>
      <select onChange={handleSelect}>
        <option value="channelId">Channel Id</option>
        <option value="username">Username</option>
      </select>
      <input
        className="input-bar"
        type="text"
        placeholder="Defaulted to PAQ's Channel Id, searching by username is too api quota intensive :("
        value={channelIdQuery}
        onChange={e => setChannelIdQuery(e.target.value)}
      />
      <i className="fas fa-search" onClick={handleSubmit}></i>
    </form>
  );
}

export default SearchBar;
