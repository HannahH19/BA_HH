import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./db";
import { useParams } from "react-router-dom";
import Beitrag_form from "./BeitragForm";

export default function Beitragpage_edit() {

    const { id } = useParams();

    if (!id) {
        alert('Keine Beitrag gefunden');
    }

    //Beitrag zum editieren aus Datenbank holen 
    const beitrag = useLiveQuery(
        async () => {
            const beitrag = await db.beitrag
                .where({ id: parseInt(id) })
                .toArray();
            return beitrag;
        }
    );

    if (!beitrag) {
        return
    }
    const beitrag_id = beitrag[0];

    if (!beitrag_id) {
        return
    }

    //Beitrag Form für das Editieren von Beitrag ausgeben
    return (
        <main>
            <Beitrag_form beitrag={beitrag_id} action="edit"></Beitrag_form>
        </main>
    )
}




