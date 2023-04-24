import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Top({ heading }) {
    const navigate = useNavigate();
    return (
        <div className="top">
            <h1>{heading}</h1>
            <p>Nutzen Sie die Suche, um passende Informationen zu finden</p>
            <div className="search">
                <input
                    type="text"
                    className="searchbar"
                    id="searchvalue"
                    onKeyUp={ev => checkInput(ev.target.value)}
                    onKeyDown={ev => { if (ev.key === 'Enter') {if (document.querySelector('#searchvalue').value.length >= 3) { navigate('/suche'); sessionStorage.setItem('suchbegriff', document.querySelector('#searchvalue').value); } else { toast.warn('Bitte geben Sie mindestens 3 Zeichen ein') }}}}></input>
                <button className="search_button" onClick={() => { if (document.querySelector('#searchvalue').value.length >= 3) { navigate('/suche'); sessionStorage.setItem('suchbegriff', document.querySelector('#searchvalue').value); } else { toast.warn('Bitte geben Sie mindestens 3 Zeichen ein') } }}>Suchen</button>
            </div>
        </div>
    );
}

export default Top;

export function checkInput(text) {
    if (text && text.length >= 3) {
        document.querySelector('.search_button')?.classList.add('open');
    } else {
        document.querySelector('.search_button')?.classList.remove('open');
    }
}