import abteilunglist from "./Abteilung";
import { db } from "./db";
import TeaserList from "./Teaser";
import { useState } from "react";

export default function Suche() {
    const [suchbegriff, setSuchbegriff] = useState(sessionStorage.getItem('suchbegriff'));
    const [ergebnisse, setErgebnisse] = useState([]);

    if(sessionStorage.getItem('suchbegriff')){
        getBeitragSuchergebnisse(suchbegriff);
    }

    async function getBeitragSuchergebnisse(suchbegriff) {
        if (!suchbegriff) {return []}
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
        const beitragList = await db.beitrag.bulkGet(idListFiltered);

        setErgebnisse(beitragList);
    }

    return (
        <main>
            <div className="top">
                <h1>Suche</h1>
                <p>Nutzen Sie die Suche, um passende Informationen zu finden</p>
                <div className="search">
                    <input type={'text'} className="searchbar" id="searchvalue"></input>
                    <button className="search_button" onClick={() => { setSuchbegriff(document.querySelector('#searchvalue')?.value); getBeitragSuchergebnisse(document.querySelector('#searchvalue')?.value); sessionStorage.removeItem('suchbegriff'); }}>Suchen</button>
                </div>
            </div>
            <div className="content">
                <div className="container">
                    <Filterleiste></Filterleiste>
                </div>
                {suchbegriff && <Suchergebnisse beitragList={ergebnisse} suchbegriff={suchbegriff}></Suchergebnisse>}
            </div>
        </main>
    )
}


function Suchergebnisse({ beitragList, suchbegriff }) {
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

function Filterleiste() {
    return (
        <div>
            <p class="hinweis_form">Filtern Sie Ihre Suchergebnisse</p>

            <select style={{ float: 'right', width: '100px' }} className="sort">
                <option>Neueste</option>
                <option>Alphabetisch</option>
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
                        <option id={'abteilung_' + abteilung.id}>{abteilung.key}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}
