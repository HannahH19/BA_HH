import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./db";
import { useParams } from "react-router-dom";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import 'react-toastify/dist/ReactToastify.css';

export default function Beitragpage() {
    const { id } = useParams();

    if (!id) {
        alert('Keine Beitrag gefunden');
    }

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


    var text = beitrag_id.text;


    return (
        <main>
            <div className="beitrag">

                <button className="download"><a href="javascript:history.back()">Zurück</a></button>
                <button><a href={`/beitrag/${(beitrag_id.id)}/edit`}>Bearbeiten</a></button>
                <h1 className="title">{beitrag_id.title}</h1>
                <div className="content">
                    {/* {text.map((element) => (
                        <div>{element}</div>
                    ))} */}
                    <ReactMarkdown>{text}</ReactMarkdown>

                </div>
            </div>
        </main>
    )
}

