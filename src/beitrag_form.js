import { useState } from "react";
import { db } from "./db";
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import abteilunglist from "./Abteilung";
import { toast } from "react-toastify";


export default function Beitrag_form({ beitrag = {}, action }) {
    const [title, setTitle] = useState(beitrag.title);
    const [text, setText] = useState(beitrag.text);
    const [kurzbeschreibung, setKurzbeschreibungs] = useState(beitrag.kurzbeschreibung);
    const [tags, setTags] = useState(beitrag.tags);
    const [abteilung, setAbteilung] = useState(beitrag.abteilung);
    const [sichtbarkeit, setSichtbarkeit] = useState(beitrag.sichtbarkeit);
    const [author, setAuthor] = useState(beitrag.author);
    const [kontrolldatum, setKontrolldatum] = useState(beitrag.kontrolldatum);
    const [veroeffentlichungsdatum, setVeroeffentlichungsdatum] = useState(beitrag.veroeffentlichungsdatum);


    const date_array = check_controll_date();
    async function addBeitrag() {
        if (!title || !text || !kurzbeschreibung || !tags || !abteilung || !sichtbarkeit || !author || !kontrolldatum || !veroeffentlichungsdatum) {
            alert('Bitte füllen Sie alle Felder aus');
            return
        }
        try {

            // Add the new friend!
            const id = await db.beitrag.add({
                title,
                text,
                kurzbeschreibung,
                tags,
                abteilung,
                sichtbarkeit,
                author,
                kontrolldatum,
                veroeffentlichungsdatum
            });
            console.log(id);
            window.open(`/`);
        } catch (error) {

        }
    }

    async function updateBeitrag(
        id,
        title,
        text,
        kurzbeschreibung,
        tags,
        abteilung,
        sichtbarkeit,
        author,
        kontrolldatum,
        veroeffentlichungsdatum) {
        if (!title ||
            !text ||
            !kurzbeschreibung ||
            !tags ||
            !abteilung ||
            !sichtbarkeit ||
            !author ||
            !kontrolldatum ||
            !veroeffentlichungsdatum) {
            alert('Kein Wert');
            return;

        }
        try {
            const result = await db.beitrag.update(id, {
                title: title,
                text: text,
                kurzbeschreibung: kurzbeschreibung,
                tags: tags,
                abteilung: abteilung,
                sichtbarkeit: sichtbarkeit,
                author: author,
                kontrolldatum: kontrolldatum,
                veroeffentlichungsdatum: veroeffentlichungsdatum
            });
            console.log(result);
            window.open(`/`);
        } catch (error) {

        }
    }

    async function deleteBeitrag(id) {
        try {
            const result = await db.beitrag.delete(id);
            console.log(result);
            window.open(`/`);
        } catch (error) {

        }
    }

    async function checkTitel(value) {
        try {
            const id = await db.beitrag.where({ title: value }).toArray()
            console.log(id)
            if (id.length != 0) {
                toast.warn('Es existiert bereits ein Beitrag mit dem gleichen Titel: ' + value + '.Bitte wählen Sie einen anderen Titel', {
                    autoClose: false,
                    progress: undefined,
                });
            }
        } catch (error) {

        }
    }

    return (
        <main className={action}>

            <div className="beitrag">
                <h2>Beitrag</h2>
                <div id="title">
                    <h3 class="form_label">Titel</h3>
                    <input
                        id='title_input'
                        onKeyUp={ev => { check_length(50, ev.target); checkTitel(ev.target.value) }}
                        className="title_input"
                        type="text"
                        value={title}
                        onChange={ev => setTitle(ev.target.value)}
                    />
                </div>
                <div className="content">
                    <CKEditor
                        editor={Editor}
                        data={text}
                        onReady={editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log('Editor is ready to use!', editor);
                            //this.editor = editor;
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setText(editor.getData());
                            console.log({ event, editor, data });
                        }}
                        onBlur={(event, editor) => {
                            console.log('Blur.', editor);
                        }}
                        onFocus={(event, editor) => {
                            console.log('Focus.', editor);
                        }}
                    />

                </div>
            </div>
            <div id="metadata" className="beitrag">
                <h2>Metadaten</h2>
                <div id="kurzbeschreibung">
                    <h3 className="form_label">Kurzbeschreibung</h3>
                    <textarea
                        type="text"
                        value={kurzbeschreibung}
                        onChange={ev => setKurzbeschreibungs(ev.target.value)} />
                    <p className="hinweis_form">Die Kurzbeschreibung soll das Thema des Beitrags in einer Frage beantworten. Sie
                        wird in der Vorschau für den Nutzer angezeigt. Bitte geben Sie maximal 150 Zeichen ein.</p>
                </div>
                <div id="schlagworte">
                    <h3 className="form_label">Schlagworte</h3>
                    <input
                        type="text"
                        placeholder="Mit welchen Schlagworten lässt sich das Thema des Beitrags beschreiben?"
                        value={tags}
                        onChange={ev => setTags(ev.target.value)} />
                    <button onClick={() => add_tag(tags,ev.target.value)}>Hinzufügen</button>
                    <p class="hinweis_form">Unter den gewählten Schlagworten kann der Beitrag später gefunden werden.</p>
                   <Tag_list tag_list={tags}></Tag_list>
                </div>
                <div id="abteilung">
                    <h3 className="form_label">Abteilung</h3>
                    <select
                        onChange={ev => setAbteilung(ev.target.value)}

                        value={abteilung}>
                        {abteilunglist().map((abteilung) => (
                            <option id={abteilung.id}>{abteilung.key}</option>
                        ))}
                    </select>
                    <p class="hinweis_form">Unter dieser Abteilung wird ihr Beitrag später zu finden sein.</p>
                </div>
                <div id="sichtbarkeit">
                    <h3 className="form_label">Sichtbarkeit</h3>
                    <select
                        onChange={ev => setSichtbarkeit(ev.target.value)}
                        value={sichtbarkeit}>
                        {abteilunglist().map((abteilung) => (
                            <option id={abteilung.id}>{abteilung.key}</option>
                        ))}
                    </select>
                    <p class="hinweis_form">Legen Sie fest, welche Abteilungen diesen Beitrag sehen können.</p>
                </div>
                <div id="pruefungsdatum">
                    <h3 className="form_label">Prüfungsdatum</h3>
                    <input
                        type="date"
                        min={date_array[0]}
                        max={date_array[1]}
                        value={kontrolldatum}
                        onChange={ev => setKontrolldatum(ev.target.value)}></input>
                    <p class="hinweis_form">Wählen Sie das Datum, an dem der Beitrag erneut auf Vollständigkeit und Richtigkeit geprüft werden soll.</p>
                </div>
                <div id="veroeffentlichungsdatum">
                    <h3 className="form_label">Veröffentlichungsdatum</h3>
                    <input
                        type="date"
                        min={date_array[0]}
                        max={date_array[1]}
                        value={veroeffentlichungsdatum}
                        onChange={ev => setVeroeffentlichungsdatum(ev.target.value)}></input>
                    <p class="hinweis_form">Wählen Sie das Datum, an dem der Beitrag veröffentlicht werden soll.</p>
                </div>
                <div>
                    <h3>Autor:</h3>
                    <input
                        type="text"
                        value={author}
                        onChange={ev => setAuthor(ev.target.value)}
                    />
                </div>


                <div className="edit">
                    <button className="open" onClick={() => updateBeitrag(
                        beitrag.id,
                        title,
                        text,
                        kurzbeschreibung,
                        tags,
                        abteilung,
                        sichtbarkeit,
                        author,
                        kontrolldatum,
                        veroeffentlichungsdatum)}>Änderungen speichern</button>
                    <button class="delete" onClick={() => deleteBeitrag(beitrag.id)}>Löschen</button>
                </div>

                <div className="add">
                    <button
                        className="open"
                        onClick={addBeitrag}>
                        Beitrag neuerstellen
                    </button>
                </div>
            </div>
        </main >
    )
}

function add_tag({tag_list, tag}){
    const tags = tag_list + ',' + tag;
    return tags;
}
function Tag_list({ tag_list }) {
    const tag_array = tag_list.split(',');
    return (
        <ul className="tag_list">
            {tag_array.map((tag) => (
                <i>{tag}</i>
            ))}
        </ul>
    )
}

function check_length(max_length, target) {
    if (!target.value) {
        return
    }
    const value = target.value;
    if (value.length >= max_length && !target.classList.contains('pflicht')) {

        toast.warn('Bitte geben Sie maximal ' + max_length + ' Zeichen ein', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        target.classList.add('pflicht');
    } else if (value.length < max_length) {
        target.classList.remove('pflicht');
    }
}


//Checken ob Datumn nicht weiter als ein Jahr und vor Heute ist
function check_controll_date() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const date_today = String(year) + '-' + String(month) + '-' + String(day);
    const date_one_year = String(year + 1) + '-' + String(month) + '-' + String(day);

    return [date_today, date_one_year];

}