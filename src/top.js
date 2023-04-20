import { useNavigate } from "react-router-dom";

function Top({ heading }) {
    const navigate = useNavigate();
    return (
        <div className="top">
            <h1>{heading}</h1>
            <p>Nutzen Sie die Suche, um passende Informationen zu finden</p>
            <div className="search">
                <input type={'text'} className="searchbar" id="searchvalue"></input>
                <button className="search_button" onClick={() => {navigate('/suche'); sessionStorage.setItem('suchbegriff', document.querySelector('#searchvalue').value); sessionStorage.setItem('suche', false)}}>Suchen</button>
            </div>
        </div>
    );
}

export default Top;

