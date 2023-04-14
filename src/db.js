import Dexie from "dexie";
export const db = new Dexie('intranet');

db.version(1).stores({
    beitrag: '++id, title, text, kurzbeschreibung, tags, sichtbarkeit, abteilung, autor, kontrolldatum,veroeffentlichungsdatum'
});


db.open();

const title = 'Parkplatzplan';
const text = 'Beispieltext'
const kurzbeschreibung = 'Wo können Mitarbeiter parken?';
const tags = ["Parkplatz", "Parken", "Mitarbeiter"];
const sichtbarkeit = ['Abteilungsübergreifend'];
const abteilung = 'Abteilungsübergreifend';
const autor = 'Max Mustermann';
const kontrolldatum = '2024-04-01';
const veroeffentlichungsdatum = '2023-04-01';

db.beitrag.add({
    id: 1,
    title,
    text,
    kurzbeschreibung,
    tags,
    sichtbarkeit,
    abteilung,
    autor,
    kontrolldatum,
    veroeffentlichungsdatum
});

