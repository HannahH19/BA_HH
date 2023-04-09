import Dexie from "dexie";

export const db = new Dexie('intranet');
db.version(1).stores({
    beitrag: '++id, title, text, kurzbeschreibung, tags, sichtbarkeit, abteilung, autor, kontrolldatum,veroeffentlichungsdatum'
});


