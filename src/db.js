import Dexie from "dexie";
export const db = new Dexie('intranet');

db.version(3).stores({
    beitrag: '++id, title, text, kurzbeschreibung, tags, sichtbarkeit, abteilung, autor, kontrolldatum, veroeffentlichungsdatum, linkedBeitraege',
    benutzer: '++id, name, letzte_beitraege, editor, passwort, abteilung',
    leitfaden: '++id, abteilung, teil, text'
});

db.open();

db.leitfaden.add({
    id: 1,
    abteilung: 'Abteilungsübergreifend',
    teil: 1,
    text: 'Leitfaden Teil 1'
});

db.leitfaden.add({
    id: 2,
    abteilung: 'Abteilungsübergreifend',
    teil: 2,
    text: 'Leitfaden Teil 2'
});

db.leitfaden.add({
    id: 3,
    abteilung: 'Abteilungsübergreifend',
    teil: 2,
    text: 'Leitfaden Teil 3'
});

db.leitfaden.add({
    id: 4,
    abteilung: 'Vertrieb',
    teil: 1,
    text: 'Vertrieb Leitfaden Teil 1'
});

db.leitfaden.add({
    id: 5,
    abteilung: 'Vertrieb',
    teil: 2,
    text: 'Vertrieb Leitfaden Teil 2'
});

db.leitfaden.add({
    id: 6,
    abteilung: 'Vertrieb',
    teil: 2,
    text: 'Vertrieb Leitfaden Teil 3'
});

const title = 'Parkplatzplan';
const text = '123'
const kurzbeschreibung = 'Wo können Mitarbeiter parken?';
const tags = ["Parkplatz", "Parken", "Mitarbeiter"];
const sichtbarkeit = ['Abteilungsübergreifend'];
const abteilung = 'Abteilungsübergreifend';
const autor = 'Testeditor';
const kontrolldatum = '2024-04-01';
const veroeffentlichungsdatum = '2023-04-01';
const linkedBeitraege = [1301]

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
    veroeffentlichungsdatum,
    linkedBeitraege
});

//db.benutzer.clear();

db.benutzer.add({
    id: 1,
    name: "Testeditor",
    letzte_beitraege: [1300, 1298, 1301],
    editor: true,
    passwort: '123',
    abteilung: 'Vertrieb'
});

db.benutzer.add({
    id: 2,
    name: "Testnutzer",
    letzte_beitraege: [1300, 1298, 1301],
    editor: false,
    passwort: '234',
    abteilung: 'Vertrieb'
});
