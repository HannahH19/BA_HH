import { toast } from "react-toastify";
import abteilunglist from "./Abteilung";
import { db } from "./db";
import TeaserList from "./Teaser";
import { useState } from "react";
import { checkInput } from "./Top";

export default function Suche() {
    const [suchbegriff, setSuchbegriff] = useState(sessionStorage.getItem('suchbegriff'));
    const [ergebnisse, setErgebnisse] = useState([]);
    const [sortierung, setSortierung] = useState('title');

    //Bei Aufruf der Suche über Suchleiste aus anderem Fenster Suchergebnisse bereits setzen
    if (sessionStorage.getItem('suchbegriff')) {
        getBeitragSuchergebnisse(suchbegriff);
    }

    async function getBeitragSuchergebnisse(suchbegriff) {
        if (!suchbegriff) { return [] }

        const suchbegriffRegExp = new RegExp(suchbegriff, "i");
        //Beitrag Ids finden, die Bedingung erfüllen
        const idList = await Promise.all([
            db.beitrag.filter(beitrag => beitrag.title.match(suchbegriffRegExp)).primaryKeys(),
            db.beitrag.filter(beitrag => beitrag.text.match(suchbegriffRegExp)).primaryKeys(),
            db.beitrag.filter(beitrag => beitrag.kurzbeschreibung.match(suchbegriffRegExp)).primaryKeys(),
            db.beitrag.filter(beitrag => beitrag.autor?.match(suchbegriffRegExp)).primaryKeys(),
            db.beitrag.filter(beitrag => beitrag.tag?.foreach(element => element?.match(suchbegriffRegExp))).primaryKeys()
        ]);
        const resultGesamt = [];
        //Beitrag IDs in einem Array sammeln
        idList?.forEach(element => { element?.forEach(teil => resultGesamt.push(teil)) });
        //Neues Array ohne doppelte IDs
        const idListFiltered = [... new Set(resultGesamt)];
        //Beiträge über ID Array aus Datenbank holen
        let beitragList = await db.beitrag.bulkGet(idListFiltered);

        setErgebnisse(beitragList);
    }

    return (
        <main>
            <div className="top">
                <h1>Suche</h1>
                <p>Nutzen Sie die Suche, um passende Informationen zu finden</p>
                <div className="search">
                    <input type={'text'} 
                    className="searchbar" 
                    id="searchvalue" 
                    onKeyUp={ev => checkInput(ev.target.value)}
                    onKeyDown={ev => { if (ev.key === 'Enter') { if (document.querySelector('#searchvalue').value.length >= 3) { setSuchbegriff(document.querySelector('#searchvalue')?.value); getBeitragSuchergebnisse(document.querySelector('#searchvalue')?.value); sessionStorage.removeItem('suchbegriff'); } else { toast.warn('Bitte geben Sie mindestens 3 Zeichen ein') }}}}></input>
                    <button className="search_button" onClick={() => { if (document.querySelector('#searchvalue').value.length >= 3) { setSuchbegriff(document.querySelector('#searchvalue')?.value); getBeitragSuchergebnisse(document.querySelector('#searchvalue')?.value); sessionStorage.removeItem('suchbegriff'); } else { toast.warn('Bitte geben Sie mindestens 3 Zeichen ein') } }}>Suchen</button>
                </div>
            </div>
            <div className="content">
                <div className="container">
                    <div>
                        <p class="hinweis_form">Filtern Sie Ihre Suchergebnisse</p>

                        <select style={{ float: 'right', width: '100px' }} className="sort" onChange={ev => setSortierung(ev.target.id)}>
                            <option id="veroeffentlichungsdatum">Neueste</option>
                            <option id="title">Alphabetisch</option>
                        </select>
                        <div class="filter">
                            <button className="filter active" id="alle">Alle Anzeigen</button>
                            <button className="filter" id="titel">Titel</button>
                            <button className="filter" id="kurzbeschreibung">Kurzbeschreibung</button>
                            <button className="filter" id="schlagworte">Schlagworte</button>
                            <button className="filter" id="inhalt">Inhalt</button>
                            <button className="filter" id="autor">Autor</button>
                            <select class="sort">
                                <option>Alle Abteilungen</option>
                                {abteilunglist().map((abteilung) => (
                                    <option id={abteilung.key}>{abteilung.key}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                {suchbegriff && suchbegriff.length >= 3 && <Suchergebnisse beitragList={ergebnisse} suchbegriff={suchbegriff} sortierung={sortierung}></Suchergebnisse>}
            </div>
        </main>
    )
}

//Ausgabe der Suchergebnisse
function Suchergebnisse({ beitragList, suchbegriff, sortierung }) {
    //Sortierung standardmäßig alphabetisch
    //Weitere Sortierungen bisher ohne Funktionalität
    if (sortierung === 'title') {
        beitragList = beitragList.sort((a, b) => {
            let title_a = a.title.toLowerCase();
            let title_b = b.title.toLowerCase();

            if (title_a < title_b) {
                return -1;
            } else if (title_a > title_b) {
                return 1;
            }
            return 0;
        });
    } 

    //Wenn Array leer, Keine Suchergebnisse
    if (!beitragList || !Array.isArray(beitragList) || beitragList.length === 0) {
        return (
            <div className="container">
                <h2 className="ergebnis">Keine Suchergebnisse für "{suchbegriff}"</h2>
            </div>
        )
    } else {
        //Ausgabe der Suchergebnisse als Teaserlist mit Anzahl der Ergebnisse und Suchbegriff
        return (
            <div>
                <div className="container">
                    <h2 className="ergebnis">{beitragList.length} Ergebnisse  für "{suchbegriff}"</h2>
                </div>
                <TeaserList beitraege={beitragList} heading=""></TeaserList>
            </div>
        )
    }
}
