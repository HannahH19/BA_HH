import { useState } from "react";
import { db } from "./db";
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import abteilunglist from "./Abteilung";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
    const [tag, setTag] = useState('');
    const [sichtbarkeit_option, setSichtbarkeitOption] = useState('');
    const navigate = useNavigate();

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
            navigate(`/`);
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
            navigate(`/`);
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

    function addTag(tag_list, tag) {
        let tag_correct = true;
        let tag_array = [];
        if (!tag) {
            toast.warn('Bitte geben Sie ein Schlagwort ein');
            return tag_list
        }
        if (tag_list) {
            tag_array = tag_list;
            tag_list?.forEach(element => {
                if (element == tag) {
                    toast.warn('Das Schlagwort ' + tag + ' existiert bereits, bitte geben Sie ein anderes Wort ein');
                    tag_correct = false;
                }
            });
            if (tag_correct) {
                console.log()
                tag_array.push(tag);

            }
        } else {
            tag_array[0] = (tag);
        }
        setTag('')
        return tag_array;
    }

    function deleteTag(tag_list, tag_index) {
        tag_list.splice(tag_index, 1);

        return tag_list;
    }

    //Abteilung zur Sichtbarkeitsliste hinzufügen
    //Vorher: Prüfung, ob Wert übergeben oder Wert bereits in Liste vorhanden
    function add_abteilung_sichtbar(sichtbarkeit_list, sichtbarkeit) {
        console.log({ sichtbarkeit })
        console.log({ sichtbarkeit_list })
        let option_correct = true;
        let sichtbarkeit_array = [];
        if (!sichtbarkeit) {
            toast.warn('Bitte wählen Sie eine Abteilung aus');
            return sichtbarkeit_list
        }
       

        //Entweder Abteilungsübergreifend freigeben oder für bestimmte Abteilungen, nicht beides parralel
        if(sichtbarkeit === 'Abteilungsübergreifend'){
            sichtbarkeit_array = [sichtbarkeit]
            return sichtbarkeit_array;
        } else {
            sichtbarkeit_list = sichtbarkeit_list?.filter(el => el !== 'Abteilungsübergreifend');
        }

        if (sichtbarkeit_list) {
            sichtbarkeit_array = sichtbarkeit_list;
            sichtbarkeit_list?.forEach(element => {
                if (element == sichtbarkeit) {
                    toast.warn('Die Abteilung ' + sichtbarkeit + ' wurde bereits zur Liste der Abteilungen mit Zugang zu diesem Beitrag hinzugefügt');
                    option_correct = false;
                }
            });
            if (option_correct) {
                console.log()
                sichtbarkeit_array.push(sichtbarkeit);

            }
        } else {
            sichtbarkeit_array[0] = (sichtbarkeit);
        }
        setSichtbarkeitOption('');
        document.querySelector('#empty').selected = true;
        return sichtbarkeit_array;
    }

    //Abteilung aus Sichtbarkeitsliste löschen und Element ausblenden
    function delete_abteilung_sichtbar(sichtbarkeit_list, index) {
        sichtbarkeit_list.splice(index, 1);
        document.getElementById('sichtbarkeit_' + index).style.display = 'none';
        return sichtbarkeit_list;
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
                        placeholder="Mit welchen Schlagworten lässt sich das Thema des Beitrags beschreiben?"
                        value={tag}
                        onChange={ev => { setTag(ev.target.value); console.log(tags) }}
                        onKeyDown={ev => { if (ev.key === 'Enter') { setTags(addTag(tags, tag)) } }}
                    />
                    <button onClick={() => setTags(addTag(tags, tag))}>Hinzufügen</button>
                    <p class="hinweis_form">Unter den gewählten Schlagworten kann der Beitrag später gefunden werden.</p>
                    <ul className="tag_list_editor">
                        {tags?.map((tag, index) => (
                            <li>
                                {tag}
                                <button onClick={() => setTags(deleteTag(tags, index))} className="delete_tag">Schlagwort löschen</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div id="abteilung">
                    <h3 className="form_label">Abteilung</h3>
                    <select
                        onChange={ev => setAbteilung(ev.target.value)}

                        value={abteilung}>
                        {abteilunglist().map((abteilung) => (
                            <option id={'abteilung_' + abteilung.id}>{abteilung.key}</option>
                        ))}
                    </select>
                    <p class="hinweis_form">Unter dieser Abteilung wird ihr Beitrag später zu finden sein.</p>
                </div>
                <div id="sichtbarkeit">
                    <h3 className="form_label">Sichtbarkeit</h3>
                    <select onChange={ev => { setSichtbarkeitOption(ev.target.value); console.log(sichtbarkeit_option) }}>
                        <option id="empty"></option>
                        {abteilunglist().map((abteilung) => (
                            <option>{abteilung.key}</option>
                        ))}
                    </select>
                    <button onClick={() => setSichtbarkeit(add_abteilung_sichtbar(sichtbarkeit, sichtbarkeit_option))}>Hinzufügen</button>
                    <ul className="tag_list_editor">
                        {sichtbarkeit?.map((abteilung, index) => (
                            <li id={'sichtbarkeit_' +index}>
                                {abteilung}
                                <button onClick={() => setSichtbarkeit(delete_abteilung_sichtbar(sichtbarkeit, index))} className="delete_tag">Abteilung löschen</button>
                            </li>
                        ))}
                    </ul>
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
                        max={kontrolldatum}
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

/*
Funktion prüft, ob Zielobjekt maximale Länge überschreitet
*/
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