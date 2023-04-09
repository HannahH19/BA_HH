import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./db";
import { useParams } from "react-router-dom";
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import abteilunglist from "./Abteilung";
import { useState } from "react";
import Beitrag_form from "./beitrag_form";

export default function Beitragpage_edit() {

    const { id } = useParams();

    if (!id) {
        alert('Keine Beitrag gefunden');
    }

    const beitrag = useLiveQuery(
        async () => {
            const beitrag = await db.beitrag
                .where({id: parseInt(id)})
                .toArray();
            return beitrag;
        }
    );

    console.log(beitrag)
    if (!beitrag) {
        return
    }
    const beitrag_id = beitrag[0];

    if (!beitrag_id) {
        return
    }

    return (
        <main>
            <Beitrag_form beitrag={beitrag_id} action="edit"></Beitrag_form>
        </main>
    )
}




