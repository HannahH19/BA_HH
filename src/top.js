function Top({ heading }) {
    return (
        <div className="top">
            <h1>{heading}</h1>
            <p>Nutzen Sie die Suche, um passende Informationen zu finden</p>
            <div className="search">
                <input type={'text'} className="searchbar"></input>
                <button className="search_button">Suchen</button>
            </div>
        </div>
    );
  }

export default Top;