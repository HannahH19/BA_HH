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


    text = mark_down_text(text);
    text = text.replaceAll('</p>')
    const text_132 = text.split('<p>');

    console.log(text_132)


    text = text.split("section");
    console.log(text)
    return (
        <main>
            <div className="beitrag">

                <button className="download"><a href="javascript:history.back()">Zurück</a></button>
                <button><a href={`/beitrag/${(beitrag_id.id)}/edit`}>Bearbeiten</a></button>
                <h1 className="title">{beitrag_id.title}</h1>
                <div className="content" >
                    {/* {beitrag_id.text} */}
                    {/* <ReactMarkdown>{text.toString()}</ReactMarkdown> 
                    <EingebundenerBeitrag id={1}></EingebundenerBeitrag> */}
                    {text_132.map((text) => (
                        () => {
                            if (text !== '123') {
                                return <p>'</p>
                            }
                            return null
                        }
                    ))}
                </div>
            </div>
        </main>
    )
}

function EingebundenerBeitrag({ id }) {
    const beitrag = useLiveQuery(
        async () => {
            const beitrag = await db.beitrag
                .where({ id: parseInt(id) })
                .toArray();
            return beitrag;
        }
    );

    if (!beitrag) { return }
    const beitrag_id = beitrag[0];

    return (
        <div className="eingebundenerBeitrag">
            <h2>EingebundenerBeitrag Test</h2>
            <h2>{beitrag_id.name}</h2>
            <p>{beitrag_id.text}</p>
        </div>
    )

}

function mark_down_text(text) {
    //Blockqoute - <blockqoute>
    //>
    text = text.replaceAll('<blockquote><p>', '> ');
    text = text.replaceAll('</p></blockquote>', '\n');

    //filter text
    //
    // text = text.replaceAll('<p>', '\n');
    // text = text.replaceAll('</p>', '\n');

    //filter Überschrift1 
    //#
    text = text.replaceAll('<h2>', ' # ');
    text = text.replaceAll('</h2>', '\n');

    //filter Überschrift2
    //##
    text = text.replaceAll('<h3>', ' ## ');
    text = text.replaceAll('</h3>', '\n');

    //filter Überschrift3
    //###
    text = text.replaceAll('<h4>', ' ### ');
    text = text.replaceAll('</h4>', '\n');

    //img
    //[![]()]
    // text = text.replaceAll('<figure class="image">','');
    // text = text.replaceAll('</figure>','');
    // text = text.replaceAll('<img', '![alt_text]');
    // text = text.replaceAll('src="', '(');
    // text = text.replaceAll('">', ')');

    //dick
    //**Text**
    text = text.replaceAll('<strong>', ' **');
    text = text.replaceAll('</strong>', '** ');

    //unterstrichen
    //__

    //kursiv
    //*Text*
    text = text.replaceAll('<i>', ' *');
    text = text.replaceAll('</i>', '* ');

    //figure
    //|

    //table
    //
    // text = text.replaceAll('<td>', ' | ');
    // text = text.replaceAll('</td>', ' | ');

    //ul - unnummeriert Liste
    //-
    text = text.replaceAll('<ul>', '');
    text = text.replaceAll('</ul>', '\n');
    text = text.replaceAll('<li>', '* ');
    text = text.replaceAll('</li>', '\n');

    //ol - nummerierte Liste
    //1.
    text = text.replaceAll('<ol>', '1.');
    text = text.replaceAll('</ol>', '');

    //Link <a>
    //[link]()
    // text = text.replaceAll('<a', '[link]');
    // text = text.replaceAll('href="', '(/')
    // text = text.replaceAll('">', ')');
    // text = text.replaceAll('</a>', '\n');

    return text;
}