import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginOverlay({ }) {
    const [authenticated, setAuthenticated] = useEffect();
    const [username, setUsername] = useEffect();
    const [passwort, setPasswort] = useEffect();
    let navigate = useNavigate();

    return (
        <div className="login_form">
            <label>Name</label>
            <input type="text"></input>
            <label>Passwort</label>
            <input type="passwort"></input>
            <button>Einloggen</button>
        </div>
    )

}