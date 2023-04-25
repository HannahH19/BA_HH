import { useState } from "react";
import { db } from "./db";
import abteilunglist from "./Abteilung";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useLiveQuery } from "dexie-react-hooks";
import BeitragList from "./BeitragList";
import { useRef } from "react";
import { createRoot } from "react-dom/client";
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';

export default function Beitrag_form({ beitrag = {}, action }) {
    const [id] = useState(beitrag.id);
    const [title, setTitle] = useState(beitrag.title);
    const [text, setText] = useState(beitrag.text);
    const [kurzbeschreibung, setKurzbeschreibungs] = useState(beitrag.kurzbeschreibung);
    const [tags, setTags] = useState(beitrag.tags);
    const [abteilung, setAbteilung] = useState(beitrag.abteilung);
    const [sichtbarkeit, setSichtbarkeit] = useState(beitrag.sichtbarkeit);
    const [autor, setAutor] = useState(JSON.parse(sessionStorage.getItem('Nutzer')).name);
    const [kontrolldatum, setKontrolldatum] = useState(beitrag.kontrolldatum);
    const [veroeffentlichungsdatum, setVeroeffentlichungsdatum] = useState(beitrag.veroeffentlichungsdatum);
    const [linkedBeitraege, setLinkedBeitraege] = useState(beitrag.linkedBeitraege);
    const date_array = check_controll_date();
    const [tag, setTag] = useState('');
    const [sichtbarkeitOption, setSichtbarkeitOption] = useState('');

    const navigate = useNavigate();

    let beitragList = [];
    let beitragListAll = useLiveQuery(() => db.beitrag.toArray());

    if (!linkedBeitraege) {
        setLinkedBeitraege([]);
    }

    if (action === 'edit') {
        //Liste einbindbarer Beiträge festlegen
        beitragList = checkEinbindbareBeitraege(beitragListAll, beitrag.id, linkedBeitraege);
    }

    //Beitrag einbinden Fenster Position
    async function addBeitrag() {
        if (!title || !text || !kurzbeschreibung || !tags || !abteilung || !sichtbarkeit || !autor || !kontrolldatum || !veroeffentlichungsdatum) {
            toast.info('Bitte füllen Sie alle Felder aus');
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
                autor,
                kontrolldatum,
                veroeffentlichungsdatum,
                linkedBeitraege
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
        autor,
        kontrolldatum,
        veroeffentlichungsdatum,
        linkedBeitraege) {
        if (!title ||
            !text ||
            !kurzbeschreibung ||
            !tags ||
            !abteilung ||
            !sichtbarkeit ||
            !autor ||
            !kontrolldatum ||
            !veroeffentlichungsdatum) {
            toast.info('Bitte füllen Sie alle Felder aus');
            return;
        }
        try {
            console.log(linkedBeitraege);
            const result = await db.beitrag.update(id, {
                title: title,
                text: text,
                kurzbeschreibung: kurzbeschreibung,
                tags: tags,
                abteilung: abteilung,
                sichtbarkeit: sichtbarkeit,
                autor: autor,
                kontrolldatum: kontrolldatum,
                veroeffentlichungsdatum: veroeffentlichungsdatum,
                linkedBeitraege: linkedBeitraege
            });
            console.log(result);
            navigate(`/`);
        } catch (error) {

        }
    }

    //Beitrag löschen
    async function deleteBeitrag(id) {
        try {
            const result = await db.beitrag.delete(id);
            navigate(`/`);
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

    function addTag(tagList, tag) {
        let tag_correct = true;
        let tag_array = [];
        if (!tag) {
            toast.warn('Bitte geben Sie ein Schlagwort ein');
            return tagList
        }
        if (tagList) {
            tag_array = tagList;
            tagList?.forEach(element => {
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

    //Ids der eingebundenen Beiträge aus Inhalt herausfiltern
    function addLinkedBeitrag(data) {
        const idList = [];
        let text_array = data.match(/data-id="[0-9]+/g);
        text_array?.forEach(element => {
            idList.push(parseInt(element.replaceAll('data-id="', '')));

        })

        return idList;
    }

    function deleteTag(tagList, tagIndex) {
        tagList.splice(tagIndex, 1);
        document.getElementById('tag_' + tagIndex).style.display = 'none';
        return tagList;
    }

    //Abteilung zur Sichtbarkeitsliste hinzufügen
    //Vorher: Prüfung, ob Wert übergeben oder Wert bereits in Liste vorhanden
    function add_abteilung_sichtbar(sichtbarkeitList, sichtbarkeit) {
        let option_correct = true;
        let sichtbarkeit_array = [];
        if (!sichtbarkeit) {
            toast.warn('Bitte wählen Sie eine Abteilung aus');
            return sichtbarkeitList
        }

        //Entweder Abteilungsübergreifend freigeben oder für bestimmte Abteilungen, nicht beides parralel
        if (sichtbarkeit === 'Abteilungsübergreifend') {
            sichtbarkeit_array = [sichtbarkeit]
            return sichtbarkeit_array;
        } else {
            sichtbarkeitList = sichtbarkeitList?.filter(el => el !== 'Abteilungsübergreifend');
        }

        if (sichtbarkeitList) {
            sichtbarkeit_array = sichtbarkeitList;
            sichtbarkeitList?.forEach(element => {
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
    function delete_abteilung_sichtbar(sichtbarkeitList, index) {
        sichtbarkeitList.splice(index, 1);
        document.getElementById('sichtbarkeit_' + index).style.display = 'none';
        return sichtbarkeitList;
    }

    let ckeditor = useRef(null);
    let beitragListView = useRef(null);
    let beitragAlle = useRef(null);
    beitragAlle.current = beitragListAll;
    beitragListView.current = beitragList;

    //Titel der eingebundenen Beiträge laden
    if (beitragAlle.current) {
        getTitelLinkedBeitraege(beitragAlle.current, linkedBeitraege)
    }

    return (
        <div className={action}>
            <div className="beitrag">
                <button className="download back_button" onClick={() => navigate(-1)}>Zurück</button>
                <h2>Beitrag</h2>
                <div id="title">
                    <h3 className="form_label">Titel</h3>
                    <input
                        id='title_input'
                        onKeyUp={ev => { check_length(50, ev.target); checkTitel(ev.target.value) }}
                        className="title_input"
                        type="text"
                        value={title}
                        onChange={ev => setTitle(ev.target.value)}
                    />
                    <p className="hinweis_form">Bitte Geben Sie hier den Titel ihres Beitrags ein. Dieser Titel wird in der Vorschau des Beitrags
                        angezeigt.
                    </p>
                </div>
                <div className="content">
                    <h3 className="form_label">Inhalt</h3>
                    <p className="hinweis_form">Bitte Geben Sie hier den Inhalt ihres Beitrags ein.</p>
                    <CKEditor
                        editor={Editor}
                        data={text}
                        config={{
                            beitrag_list: {
                                beitragRenderer: (id, domElement) => {
                                    const root = createRoot(domElement);
                                    const beitrag = beitragListView.current?.find(beitrag => beitrag.id === id)
                                    root.render(
                                        <div className="beitrag_einbinden" id={id}>
                                            <h2 className="linked_beitrag">{beitrag?.title}</h2>
                                            <p className="hinweis_linked_beitrag">Der Inhalt dieses Beitrages erscheint in der Nutzernansicht an dieser Stelle</p>
                                        </div>
                                    )
                                }
                            }
                        }}

                        onReady={editor => {
                            console.log('Editor is ready to use!', editor);
                            ckeditor.current = editor;
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setText(data);
                            //Bei Veränderungen im Text Liste mit eingebundenen Beiträgen aktualisieren
                            setLinkedBeitraege(addLinkedBeitrag(data));
                            console.log({ event, editor, data });
                            console.log({ event });
                        }}
                        onBlur={(event, editor) => {
                            console.log('Blur.', editor);
                        }}
                        onFocus={(event, editor) => {
                            console.log(beitragAlle.current);
                        }}
                    />
                    <BeitragList
                        key="beitrag-list"
                        //List jedes Mal mit linkedBeitraege Array filtern, um eingebundene Beiträge auszublenden
                        beitragList={checkEinbindbareBeitraege(beitragList, id, linkedBeitraege)}
                        onClick={(id) => {
                            //Zweite Prüfung, ob geöffnerter Beitrag sich selbst beinhalten soll, als Absicherung
                            if (id !== beitrag?.id || !linkedBeitraege.includes(id)) {
                                ckeditor.current.execute('inserBeitrag', id)
                                toast.success('Beitrag eingebunden')
                            } else {
                                toast.warn('Dieser Beitrag kann sich nicht selbst einbinden, bitte wählen Sie einen anderen')
                            }
                        }}></BeitragList>
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
                        className="with_button"
                        placeholder="Mit welchen Schlagworten lässt sich das Thema des Beitrags beschreiben?"
                        value={tag}
                        onChange={ev => { setTag(ev.target.value) }}
                        onKeyDown={ev => { if (ev.key === 'Enter') { setTags(addTag(tags, tag)) } }}
                    />
                    <button onClick={() => setTags(addTag(tags, tag))} className="add_input">Hinzufügen</button>
                    <p className="hinweis_form">Unter den gewählten Schlagworten kann der Beitrag später gefunden werden.</p>
                    <ul className="tagList_editor">
                        {tags?.map((tag, index) => (
                            <li id={'tag_' + index}>
                                {tag}
                                <button onClick={() => setTags(deleteTag(tags, index))} className="delete_tag">X
                                    <p className="tooltipp">Schlagwort löschen</p>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div id="abteilung">
                    <h3 className="form_label">Abteilung</h3>
                    <select
                        onChange={ev => setAbteilung(ev.target.value)}
                        value={abteilung}>
                        <option></option>
                        {abteilunglist().map((abteilung) => (
                            <option id={'abteilung_' + abteilung.id}>{abteilung.key}</option>
                        ))}
                    </select>
                    <p className="hinweis_form">Unter dieser Abteilung wird ihr Beitrag später zu finden sein.</p>
                </div>
                <div id="sichtbarkeit">
                    <h3 className="form_label">Sichtbarkeit</h3>
                    <select className="with_button" onChange={ev => { setSichtbarkeitOption(ev.target.value) }}>
                        <option id="empty"></option>
                        {abteilunglist().map((abteilung) => (
                            <option>{abteilung.key}</option>
                        ))}
                    </select>
                    <button onClick={() => setSichtbarkeit(add_abteilung_sichtbar(sichtbarkeit, sichtbarkeitOption))} className="add_input">Hinzufügen</button>
                    <p className="hinweis_form">Legen Sie fest, welche Abteilungen diesen Beitrag sehen können.</p>
                    <ul className="tagList_editor">
                        {sichtbarkeit?.map((abteilung, index) => (
                            <li id={'sichtbarkeit_' + index}>
                                {abteilung}
                                <button onClick={() => setSichtbarkeit(delete_abteilung_sichtbar(sichtbarkeit, index))} className="delete_tag">X
                                    <p className="tooltipp">Abteilung entfernen</p>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div id="pruefungsdatum">
                    <h3 className="form_label">Prüfungsdatum</h3>
                    <input
                        type="date"
                        min={date_array[0]}
                        max={date_array[1]}
                        value={kontrolldatum}
                        onChange={ev => setKontrolldatum(ev.target.value)}></input>
                    <p className="hinweis_form">Wählen Sie das Datum, an dem der Beitrag erneut auf Vollständigkeit und Richtigkeit geprüft werden soll.</p>
                </div>
                <div id="veroeffentlichungsdatum">
                    <h3 className="form_label">Veröffentlichungsdatum</h3>
                    <input
                        type="date"
                        min={date_array[0]}
                        max={kontrolldatum}
                        value={veroeffentlichungsdatum}
                        onChange={ev => setVeroeffentlichungsdatum(ev.target.value)}></input>
                    <p className="hinweis_form">Wählen Sie das Datum, an dem der Beitrag veröffentlicht werden soll.</p>
                </div>
                <div>
                    <h3 className="form_label">Autor:</h3>
                    <input
                        type="text"
                        value={autor}
                        onChange={ev => setAutor(ev.target.value)}
                    />
                </div>


                <div className="edit submit_button">
                    <button className="open" onClick={() => updateBeitrag(
                        beitrag.id,
                        title,
                        text,
                        kurzbeschreibung,
                        tags,
                        abteilung,
                        sichtbarkeit,
                        autor,
                        kontrolldatum,
                        veroeffentlichungsdatum,
                        linkedBeitraege)}>Änderungen speichern</button>
                    <button className="delete" onClick={() => deleteBeitrag(beitrag.id)}>Löschen</button>
                </div>

                <div className="add submit_button">
                    <button
                        className="open"
                        onClick={addBeitrag}>
                        Beitrag erstellen
                    </button>
                </div>
            </div>
        </div >
    )
}

//Funktion prüft, ob Zielobjekt maximale Länge überschreitet
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
    const datum = new Date();
    const tag = String(datum.getDate()).padStart(2, '0');
    const monat = String(datum.getMonth() + 1).padStart(2, '0');
    const jahr = datum.getFullYear();

    const datumHeute = String(jahr) + '-' + String(monat) + '-' + String(tag);
    const dateEinJahr = String(jahr + 1) + '-' + String(monat) + '-' + String(tag);

    return [datumHeute, dateEinJahr];

}


//Titel der eingebundenen Beiträge erhalten
function getTitelLinkedBeitraege(beitragListAll, linkedBeitraege) {
    if (!beitragListAll || !linkedBeitraege) {
        return
    }
    linkedBeitraege.forEach(id => {
        const element = document.querySelector('[data-id="' + id + '"] h2');
        if (!element) { return }
        const result = beitragListAll.filter(beitrag => beitrag.id === id);
        if (!result) {
            element.remove();
            toast.warn('Der Beitrag ' + id + ' existiert nicht mehr und kann nicht mehr eingebunden werden');
        } else {
            const titel = result[0].title;
            element.innerHTML = titel;
        }
    })
}

//Prüfen, welche Beiträge in diesen eingebunden werden können
//Beiträge die diesen einbinden können nicht eingebunden werden
//Das gilt auch für weitere Abstufungen 
function checkEinbindbareBeitraege(beitragList, beitragId, linkedBeitraege) {
    if (!beitragList || !linkedBeitraege ) { return }
    let filteredList = [];
    let includesBeitragList = [];
    //Geöffnenten Beitrag aus Liste filtern 
    beitragList = beitragList?.filter(element => element.id !== beitragId);
    //Beiträge die den geöffneten Einbinden beinhalten und bereits eingebundene Beiträge aus Liste filtern
    beitragList.forEach(beitrag => {
        if (beitrag.linkedBeitraege?.includes(beitragId) || linkedBeitraege?.includes(beitrag.id)) {
            includesBeitragList.push(beitrag.id);
        } else {
            filteredList.push(beitrag);
        }
    });

    //Beiträge die Beiträge einbinden, die den geöffneten Einbinden aus Liste filtern
    filteredList.forEach((beitrag, index) => {
        beitrag?.linkedBeitraege?.forEach(element => {
            if (includesBeitragList.includes(element)) {
                includesBeitragList.push(beitrag.id);
                filteredList.splice(index, 1);
            }
        })
    });

    return filteredList;

}