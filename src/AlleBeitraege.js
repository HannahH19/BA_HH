import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./db";
import TeaserList from "./Teaser";
import Top from "./Top";

/*Übersicht aller Beiträge*/
export default function AlleBeitraege() {
    const beitrag_list = useLiveQuery(() => db.beitrag.orderBy('title').toArray());
    return (
        <div>
            <Top heading="Alle Beiträge"></Top>
            <TeaserList beitraege={beitrag_list} heading=""></TeaserList>
        </div>
    )
}