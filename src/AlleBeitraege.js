import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./db";
import Top from "./Top";

/*Übersicht aller Beiträge*/
export default function AlleBeitraege() {
    const listAbteilungsuebergreifend = useLiveQuery(
        async () => {
            const beitrag = await db.beitrag
                .where({ abteilung: 'Abteilungsübergreifend' })
                .toArray();
            return beitrag;
        }
    );

    const listEinkauf = useLiveQuery(
        async () => {
            const beitrag = await db.beitrag
                .where({ abteilung: 'Einkauf & Reklamation' })
                .toArray();
            return beitrag;
        }
    );

    const listEdv = useLiveQuery(
        async () => {
            const beitrag = await db.beitrag
                .where({ abteilung: 'EDV & IT' })
                .toArray();
            return beitrag;
        }
    );

    const listKontaktvermittlung = useLiveQuery(
        async () => {
            const beitrag = await db.beitrag
                .where({ abteilung: 'Kontaktvermittlung' })
                .toArray();
            return beitrag;
        }
    );

    const listMarketing = useLiveQuery(
        async () => {
            const beitrag = await db.beitrag
                .where({ abteilung: 'Marketing' })
                .toArray();
            return beitrag;
        }
    );

    const listRechnungswesen = useLiveQuery(
        async () => {
            const beitrag = await db.beitrag
                .where({ abteilung: 'Rechungswesen' })
                .toArray();
            return beitrag;
        }
    );

    const listVersand = useLiveQuery(
        async () => {
            const beitrag = await db.beitrag
                .where({ abteilung: 'Versand' })
                .toArray();
            return beitrag;
        }
    );

    const listVertrieb = useLiveQuery(
        async () => {
            const beitrag = await db.beitrag
                .where({ abteilung: 'Vertrieb' })
                .toArray();
            return beitrag;
        }
    );

    // console.log({beitraege})
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