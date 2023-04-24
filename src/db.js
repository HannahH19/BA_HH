import Dexie from "dexie";
export const db = new Dexie('intranet');

db.version(3).stores({
    beitrag: '++id, title, text, kurzbeschreibung, tags, sichtbarkeit, abteilung, autor, kontrolldatum, veroeffentlichungsdatum, linkedBeitraege',
    benutzer: '++id, name, letzte_beitraege, editor, passwort, abteilung'
});

db.open();

db.beitrag.clear();

//Artikel EDV & IT
db.beitrag.add({
    id: 1,
    title: 'Hintergründe zur Webentwicklung',
    text: '<h2>Webentwicklung</h2><h3>Frontend Entwicklung</h3><p>Die Frontend Entwicklung bezieht sich auf die <strong>Gestaltung und Entwicklung der Benutzeroberfläche </strong>von Websites und Webanwendungen. Ein Frontend-Entwickler ist dafür verantwortlich, dass die Website oder App optisch ansprechend und benutzerfreundlich ist.&nbsp;</p><p>Zum programmieren werden die Sprachen &nbsp;<i>HTML, CSS</i> und <i>JavaScript </i>benutzt, um eine ansprechende und interaktive Benutzeroberfläche zu entwickeln. Eine ansprechende Benutzeroberfläche sorgt für eine <u>gute Nutzererfahrung</u>.</p><figure class="table"><table><thead><tr><th>Sprache</th><th>Funktion</th></tr></thead><tbody><tr><td>HTML</td><td>Elemente der Seite</td></tr><tr><td>CSS</td><td>Gestaltung der Seite</td></tr><tr><td>JavaScript</td><td>Funktion der Elemente</td></tr></tbody></table></figure><h3>Backend Entwicklung</h3><p>Die Backend-Entwicklung ist die Entwicklung der Serverseite einer Website oder Anwendung. Ein Backend-Entwickler ist dafür verantwortlich, dass die Anwendung oder Website reibungslos funktioniert und Daten effektiv verarbeitet werden.&nbsp;</p><p>Dazu gehören die Verwendung von Datenbanken wie MySQL oder MongoDB, um Daten zu speichern und zu verwalten. Ein Backend-Entwickler muss auch über Kenntnisse in der Serververwaltung und Sicherheit verfügen, um sicherzustellen, dass die Anwendung oder Website sicher und geschützt ist.</p>',
    kurzbeschreibung: 'Was bedeutet Webentwicklung?',
    tags: ["Webentwicklung", "Frontend", "Backend"],
    sichtbarkeit: ['Abteilungsübergreifend'],
    abteilung: 'EDV & IT',
    autor: 'Testeditor',
    kontrolldatum: '2023-04-21',
    veroeffentlichungsdatum: '2023-04-01',
    linkedBeitraege: []
});

//Artikel Abteilungsübergreifen
db.beitrag.add({
    id: 2,
    title: 'Energie am Arbeitsplatz sparen',
    text: '<p>In diesem Text finden Sie einige Ideen zum sparen von Energie am Arbeitsplatz. Bitte bemühen Sie sich, den Energieverbrauch so niedrig wie möglich zu halten. Das ist ein wichtiger Beitrag zum Umweltschutz und zur Reduzierung von Betriebskosten.</p><ul><li>Halten Sie Türen zwischen Räumen geschlossen, um die warme Luft im Raum zu halten</li><li>Schalten Sie nach Feierabend die Lampem am Arbeitsplatz aus. Nutzen Sie, sofern möglich, natürliche Lichtquellen um Energie zu sparen</li><li>Beim Öffnen von Fenstern stellen Sie die Heizung aus</li><li>Stellen Sie die Büroheizung <u>maximal auf Stufe 3</u></li><li>Bei starker Hitze schließen sie die Jalousien oder Vorhänge, sowie die Fenster, um die warme Luft nicht in den Raum zu lassen.</li></ul><p>Bei weiteren Ideen oder Anregungen wenden Sie sich an die Geschäftsleitung. Durch die Umsetzung dieser Maßnahmen kann jeder Mitarbeiter dazu beitragen, den Energieverbrauch am Arbeitsplatz zu senken und somit einen wichtigen Beitrag zum Umweltschutz und zur Kosteneinsparung leisten.</p><h2>Weitere Tipps</h2><p>Hier finden Sie weitere Tipps wie sie Energie sparen und die Umwelt schonen können. Nutzen Sie das Fahrrad oder öffentliche Verkehrsmittel, um zur Arbeit zu gelangen. Auf dem Firmengelände gibt es überdachte Fahrradstellplätze.</p><figure class="image"><img src="https://images.unsplash.com/photo-1541584285245-c83a93cce0e8?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1000&amp;q=80" alt="비포장도로 옆에 주차된 파란색과 흰색 산악 자전거"></figure><p>Bildquelle: <a href="https://unsplash.com/de/fotos/giFeTshEYYQ">Foto zum Thema 비포장도로 옆에 주차된 파란색과 흰색 산악 자전거 – Kostenloses Bild zu Michałowice auf Unsplash</a> (Urheber: <strong>Jacek Dylag)</strong></p><p><strong>Textquelle:</strong> Eigene Anfertigung</p>',
    kurzbeschreibung: 'Was können Mitarbeiter tun, um am Arbeitsplatz Energie zu sparen?',
    tags: ['Arbeitsplatz', 'Energiesparen'],
    sichtbarkeit: ['Abteilungsübergreifend'],
    abteilung: 'Abteilungsübergreifend',
    autor: 'Testeditor',
    kontrolldatum: '2023-04-31',
    veroeffentlichungsdatum: '2023-04-21',
    linkedBeitraege: []
});

/*
db.beitrag.add({
    id: 3,
    title: '',
    text: '',
    kurzbeschreibung: '',
    tags: [],
    sichtbarkeit: ['Abteilungsübergreifend'],
    abteilung:'',
    autor: '',
    kontrolldatum: '',
     veroeffentlichungsdatum: '2023-04-21',
    linkedBeitraege: []
});

db.beitrag.add({
    id: 4,
    title: '',
    text: '',
    kurzbeschreibung: '',
    tags: [],
    sichtbarkeit: ['Abteilungsübergreifend'],
    abteilung:'',
    autor: '',
    kontrolldatum: '',
     veroeffentlichungsdatum: '2023-04-21',
    linkedBeitraege: []
});

db.beitrag.add({
    id: 5,
    title: '',
    text: '',
    kurzbeschreibung: '',
    tags: [],
    sichtbarkeit: ['Abteilungsübergreifend'],
    abteilung:'',
    autor: '',
    kontrolldatum: '',
     veroeffentlichungsdatum: '2023-04-21',
    linkedBeitraege: []
});

db.beitrag.add({
    id: 6,
    title: '',
    text: '',
    kurzbeschreibung: '',
    tags: [],
    sichtbarkeit: ['Abteilungsübergreifend'],
    abteilung:'',
    autor: '',
    kontrolldatum: '',
     veroeffentlichungsdatum: '2023-04-21',
    linkedBeitraege: []
});

db.beitrag.add({
    id: 7,
    title: '',
    text: '',
    kurzbeschreibung: '',
    tags: [],
    sichtbarkeit: ['Abteilungsübergreifend'],
    abteilung:'',
    autor: '',
    kontrolldatum: '',
     veroeffentlichungsdatum: '2023-04-21',
    linkedBeitraege: []
});
*/

//Artikel Marketing

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
