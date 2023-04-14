import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./db";
import { useParams } from "react-router-dom";
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

    const test = beitrag_id.text

    const text = preFormatText(beitrag_id.text);

    const text_formatted = text.split('|');
    return (
        <main>
            <div className="beitrag">

                <button className="download back_button"><a href="javascript:history.back()">Zurück</a></button>

                <h1 className="title">{beitrag_id.title}</h1>
                <button>Beitrag teilen</button>
                <button><a href={`/beitrag/${(beitrag_id.id)}/edit`}>Bearbeiten</a></button>
                <div className="content" >

                    {text_formatted.map((text) => (
                        <FormatText text={text}></FormatText>
                    ))}
                </div>
            </div>
        </main>
    )
}


/* Ersetzt HTML Tags in übergenene Text zur weiteren Verarbeitung*/
function preFormatText(text) {
    text = text.replaceAll('<blockquote><p>', '|blockquote ');
    text = text.replaceAll('<h2>', '|## ');
    text = text.replaceAll('<h3>', '|### ');
    text = text.replaceAll('<h4>', '|#### ');
    // text = text.replaceAll('<a href=', '|href ')
    text = text.replaceAll('<section', '|section ');
    text = text.replaceAll('<figure', '|figure ');
    // text = text.replaceAll('<u>', '*** ');
    // text = text.replaceAll('<i>', '** ');
    // text = text.replaceAll('<strong>', '* ');
    text = text.replaceAll('<ul>', '|ungeordnet_liste ');
    text = text.replaceAll('<ol>', '|geordnet_liste');
    text = text.replaceAll('</blockquote>', '');
    text = text.replaceAll('<p>', '|');
    text = text.replaceAll('<li>', 'listepunkt ');
    text = text.replaceAll('<tr>', 'row');
    text = text.replaceAll('<td>', 'column');
    text = text.replaceAll('<th>', '/header');

    text = text.replaceAll('</tr>', '');
    text = text.replaceAll('</td>', '');
    text = text.replaceAll('</th>', '');
    text = text.replaceAll('</ul>', '');
    text = text.replaceAll('</ol>', '');
    text = text.replaceAll('</h2>', '');
    text = text.replaceAll('</h3>', '');
    text = text.replaceAll('</h4>', '');
    // text = text.replaceAll('</a>', '|');
    // text = text.replaceAll('</u>', '');
    // text = text.replaceAll('</i>', '');
    // text = text.replaceAll('</strong>', '');
    text = text.replaceAll('</li>', '');
    text = text.replaceAll('</p>', '');
    text = text.replaceAll('</section>', '');
    text = text.replaceAll('&nbsp;', '');
    text = text.replaceAll('<table>', '');
    text = text.replaceAll('</table>', '');
    text = text.replaceAll('<tbody>', '');
    text = text.replaceAll('</tbody>', '');

    return text;
}

/* Text anhand von Tags in passendes HTML umwandeln*/
function FormatText({ text }) {
    text = text.replaceAll('|', '');

    if (text.includes('####')) {
        //Überschrift 3
        text = text.replaceAll('#', '');
        return (<h4>
            {text.split('<').map((element) => (
                <StilFormat text={element}></StilFormat>
            ))}
        </h4>)
    } else if (text.includes('###')) {
        //Überschrift 2
        text = text.replaceAll('#', '');
        return (<h3>
            {text.split('<').map((element) => (
                <StilFormat text={element}></StilFormat>
            ))}
        </h3>)
    } else if (text.includes('##')) {
        //Überschrift 1
        text = text.replaceAll('#', '');
        return (<h2>
            {text.split('<').map((element) => (
                <StilFormat text={element}></StilFormat>
            ))}
        </h2>)
    } else if (text.includes('blockquote')) {
        //Blockzitat
        text = text.replaceAll('blockquote', '');
        return (
            <blockquote> <p>
                {text.split('<').map((element) => (
                    <StilFormat text={element}></StilFormat>
                ))}
            </p></blockquote>
        )
    } else if (text.includes('ungeordnet_liste')) {
        //ungeordnete Liste
        text = text.replaceAll('ungeordnet_liste ', '');
        let text_liste = text.split('listepunkt');
        text_liste = text_liste.slice(1);
        return (
            <ul>{text_liste.map((text) => (
                <li>
                    {text.split('<').map((element) => (
                        <StilFormat text={element}></StilFormat>
                    ))}
                </li>
            ))}</ul>
        )
    } else if (text.includes('geordnet_liste')) {
        //ungeordnete Liste
        text = text.replaceAll('geordnet_liste', '');
        let text_liste = text.split('listepunkt');
        text_liste = text_liste.slice(1);
        return (
            <ol>{text_liste.map((text) => (
                <li>
                    {text.split('<').map((element) => (
                        <StilFormat text={element}></StilFormat>
                    ))}
                </li>
            ))}</ol>
        )
    } else if (text.includes('section')) {
        //Eingebundener Beitrag
        const text_section = text.split('"');
        const data_id = text_section[3];
        return (
            <section data_id={data_id}>
                <EingebundenerBeitrag id={data_id}></EingebundenerBeitrag>
            </section>)
    } else if (text.includes('figure')) {
        //Figure
        const text_section = text.split('"');
        const class_figure = text_section[1];

        if (class_figure === "image") {
            //Bild
            const image_data = text_section[3]
            return (
                <figure className={class_figure}>
                    <img src={image_data} width="100%"></img>
                </figure>
            )
        } else if (class_figure === "table") {
            //Tabelle

            text = text.replaceAll('figure  class=\"table\">', '');
            text = text.replaceAll('</figure>', '');
            let table_array = text.split('row');

            let table_header = [];


            if (table_array[1].includes('header')) {
                //Tabllen Header nur wenn vorhanden
                table_header = table_array[1];
                table_header = table_header.replaceAll('</thead>', '');

                table_array = table_array.slice(2)
                table_header = table_header.split('/');
            } else {
                table_array = table_array.slice(1);
            }


            return (
                <figure className={class_figure}>
                    <table>
                        <thead>
                            <tr>
                                {table_header?.slice(1).map((row) => (
                                    <TableFormat text={row}></TableFormat>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {table_array?.map((row) => (
                                <tr>
                                    {row.split('column').slice(1).map((column) => (
                                        <TableFormat text={column}></TableFormat>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </figure>


            )
        } else if (class_figure === "media") {

            let video_data = text_section[3]
            video_data = video_data.split('/');
            const link = "https://www.youtube.com/embed/" + video_data[3]
            //Video
            return (
                <iframe width="800px" height="500px" src={link} frameborder="0" allowfullscreen></iframe>
            )
        }
    } else {
        return (<p>
            {text.split('<').map((element) => (
                <StilFormat text={element}></StilFormat>
            ))}
        </p>)
    }
}

function StilFormat({ text }) {
    //Jeder Textpart wird auf Formatierungen wie kursiv, dick, unterstrichen oder Link geprüft
    //Separat von anderen Formatierungen, da diese Formatierung häufig in anderer verschachtelt ist 
    text = text.replaceAll('/strong>', '');
    text = text.replaceAll('/u>', '');
    text = text.replaceAll('/i>', '');
    text = text.replaceAll('/a>', '');

    if (text.includes('strong>')) {
        return (<strong>{text.replace('strong>', '')}</strong>)
    } else if (text.includes('i>')) {
        return (<i>{text.replace('i>', '')}</i>)
    } else if (text.includes('u>')) {
        return (<u>{text.replace('u>', '')}</u>)
    } else if (text.includes('a href')) {
        const text_link = text.split('">');
        console.log({ text_link })
        return (<a href={text_link[0].replace('a href="', '')}>{text_link[1]}</a>)
    } else {
        return (<>{text}</>)
    }
}

/*Gibt Tabellenspalte oder Tabellenheaderspalte zurück*/
function TableFormat({ text }) {
    if (text.includes('header')) {
        return (<th>{text.replace('header', '')}</th>)
    } else {
        return (<td>
            {text.split('<').map((element) => (
                <StilFormat text={element}></StilFormat>
            ))}
        </td>)
    }
}


//Text des eingebundenen Beitrags wird bei jedem öffnen neu aus DB geholt und erstellt, um Synchronität zu gewährleisen
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

    const titel = preFormatText('<h2>' + beitrag_id.title + '</h2>');
    const text = preFormatText(beitrag_id.text);
    const text_formatted = text.split('|');

    return (
        <div className="eingebundenerBeitrag">
            <FormatText text={titel}></FormatText>
            {text_formatted.map((text) => (
                <FormatText text={text}></FormatText>
            ))}
        </div>
    )

}