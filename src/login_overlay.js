import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./db";
import { useState } from "react";

export default function LoginOverlay() {
    const [name, setName] = useState('');
    const [passwort, setPasswort] = useState('');
    
    const nutzer = useLiveQuery(
        async () => {
            const benutzer = await db.benutzer.where({ name: name }).first();
            return benutzer;
        }
    );

    const nutzer123 = useLiveQuery(
        async () => {
            const benutzer = await db.benutzer
                .toArray();
            return benutzer;
        }
    );


    console.log({ nutzer123 });
    console.log({ nutzer })



    return (
        <div className="login_overlay">
            <div className="login_form">
                <label>Name</label>
                <input type="text" id="nutzername"></input>
                <label>Passwort</label>
                <input type="password" id="passwort"></input>
                <button className="open" onClick={() => { setName(document.querySelector('#nutzername').value); setPasswort(document.querySelector('#passwort').value) }}>Anmelden</button>
            </div>
        </div>
    )

}

