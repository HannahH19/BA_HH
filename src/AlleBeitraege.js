import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./db";
import Top from "./Top";

/*Übersicht aller Beiträge*/
export default function AlleBeitraege() {
    // Liste aller Beiträge mit Abteilung Abteilungsübergreifen
    const listAbteilungsuebergreifend = useLiveQuery(
        async () => {
            const beitrag = await db.beitrag
                .where({ abteilung: 'Abteilungsübergreifend' })
                .toArray();
            return beitrag;
        }
    );

    // Liste aller Beiträge mit Abteilung Einkauf & Reklamation 
    const listEinkauf = useLiveQuery(
        async () => {
            const beitrag = await db.beitrag
                .where({ abteilung: 'Einkauf & Reklamation' })
                .toArray();
            return beitrag;
        }
    );

    // Liste aller Beiträge mit Abteilung EDV & IT
    const listEdv = useLiveQuery(
        async () => {
            const beitrag = await db.beitrag
                .where({ abteilung: 'EDV & IT' })
                .toArray();
            return beitrag;
        }
    );

    // Liste aller Beiträge mit Abteilung Kontaktvermtittlung
    const listKontaktvermittlung = useLiveQuery(
        async () => {
            const beitrag = await db.beitrag
                .where({ abteilung: 'Kontaktvermittlung' })
                .toArray();
            return beitrag;
        }
    );

    // Liste aller Beiträge mit Abteilung Marketing
    const listMarketing = useLiveQuery(
        async () => {
            const beitrag = await db.beitrag
                .where({ abteilung: 'Marketing' })
                .toArray();
            return beitrag;
        }
    );

    // Liste aller Beiträge mit Abteilung Rechnungswesen
    const listRechnungswesen = useLiveQuery(
        async () => {
            const beitrag = await db.beitrag
                .where({ abteilung: 'Rechungswesen' })
                .toArray();
            return beitrag;
        }
    );

    // Liste aller Beiträge mit Abteilung Versand
    const listVersand = useLiveQuery(
        async () => {
            const beitrag = await db.beitrag
                .where({ abteilung: 'Versand' })
                .toArray();
            return beitrag;
        }
    );

    // Liste aller Beiträge mit Abteilung Vertrieb
    const listVertrieb = useLiveQuery(
        async () => {
            const beitrag = await db.beitrag
                .where({ abteilung: 'Vertrieb' })
                .toArray();
            return beitrag;
        }
    );

    return (
        <div>
            <Top heading="Alle Beiträge"></Top>
            <div className="container">
                <ListAbteilung abteilung='Abteilungsübergreifend' beitragList={listAbteilungsuebergreifend}></ListAbteilung>
                <ListAbteilung abteilung='EDV & IT' beitragList={listEdv}></ListAbteilung>
                <ListAbteilung abteilung='Einkauf & Reklamation' beitragList={listEinkauf}></ListAbteilung>
                <ListAbteilung abteilung='Kontaktvermittlung' beitragList={listKontaktvermittlung}></ListAbteilung>
                <ListAbteilung abteilung='Marketing' beitragList={listMarketing}></ListAbteilung>
                <ListAbteilung abteilung='Rechungswesen' beitragList={listRechnungswesen}></ListAbteilung>
                <ListAbteilung abteilung='Versand' beitragList={listVersand}></ListAbteilung>
                <ListAbteilung abteilung='Vertrieb' beitragList={listVertrieb}></ListAbteilung>
            </div>
        </div>
    )
}

// Gibt Abteilung als Liste mit Titel der zugehörigen Beiträge aus 
function ListAbteilung({ abteilung, beitragList }) {
    return (
        <div>
            <h2>{abteilung}</h2>
            <ul>
                {beitragList?.map((beitrag) => (
                    <li><a href={`/beitrag/${(beitrag.id)}`}>{beitrag.title}</a></li>
                ))}
            </ul>
        </div>
    )

}