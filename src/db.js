import Dexie from "dexie";
export const db = new Dexie('intranet');

db.version(3).stores({
    beitrag: '++id, title, text, kurzbeschreibung, tags, sichtbarkeit, abteilung, autor, kontrolldatum, veroeffentlichungsdatum, linkedBeitraege',
    benutzer: '++id, name, letzte_beitraege, editor, passwort, abteilung'
});

db.open();

db.beitrag.clear();

//Für jede Abteilung wird ein Beispielartikel erstellt

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

//Artikel Vertrieb
db.beitrag.add({
    id: 3,
    title: 'Wichtige Begriffe',
    text: '<p>In diesem Text werden wichtige Begriffe erklärt.</p><h2>Intranet</h2><p>Ein Intranet ist eine digitale Plattform innerhalb eines Unternehmens, die zum Austausch von unternehmensrelevanten Informationen &amp; zur Interaktion von Mitarbeitern untereinander genutzt wird. Im Gegensatz zum Internet ist das Intranet ein geschlossenes Netzwerk, auf das nur innerhalb einer Organisation zugegriffen werden kann.</p><p>Unternehmenswissen wird so <strong>sicher, konsistent und zentral </strong>zur Verfügung gestellt, wodurch Mitarbeiter effizienter und schneller arbeiten. Als soziales Netzwerk kann ein Intranet zur internen Kommunikation genutzt werden.</p><section class="beitrag" data-id="4"></section>',
    kurzbeschreibung: 'Welche Begriffe muss ein Mitarbeiter verstehen?',
    tags: ['Begriffe', 'Wissen'],
    sichtbarkeit: ['Abteilungsübergreifend'],
    abteilung: 'Vertrieb',
    autor: 'Testeditor',
    kontrolldatum: '2023-05-15',
    veroeffentlichungsdatum: '2023-04-21',
    linkedBeitraege: [4]
});

//Artikel Einkauf & Reklamation 
db.beitrag.add({
    id: 4,
    title: 'Qualitätsmanagement',
    text: '<p>Um den Begriff des Qualitätsmanagements zu verstehen, wird hier zunächst die Bedeutung von Qualität erläutert. Qualität bezeichnet das Maß, in dem die Anforderungen an ein Produkt oder eine Dienstleistung umgesetzt wurden.</p><p>Das Qualitätsmanagement setzt Ziele und definiert die notwendigen Prozesse, um möglichst viele Anforderungen umzusetzen, um so eine hohe Qualität zu erreichen.</p>',
    kurzbeschreibung: 'Einkauf & Reklamation',
    tags: ['Qualitätsmanagement', 'Begriffe'],
    sichtbarkeit: ['Abteilungsübergreifend'],
    abteilung: 'Einkauf & Reklamation',
    autor: 'Testeditor',
    kontrolldatum: '2023-05-20',
    veroeffentlichungsdatum: '2023-04-21',
    linkedBeitraege: []
});

//Artikel Marketing
db.beitrag.add({
    id: 5,
    title: 'Gestaltung',
    text: '<p>Die Gestaltung des Intranets wurde in Absprache mit dem Unternehmen gewählt. Zunächst wurden drei Gestaltungsoptionen erstellt aus denen anschließend die finale Gestaltung entworfen wurde. Das Ziel ist eine klare Gestaltung, die den Nutzer führt, nicht von der Informationsaufnahme ablenkt. Die Gestaltung soll nicht aktuelle Entwicklungen des Webdesign abbilden, sondern, ein zeitloses Aussehen bieten, dass von geübten und ungeübten Nutzern, im Umgang mit Webseiten, verstanden wird.</p><p>Die Anordnung von Inhalten erfolgt in einem klassischen Gestaltungsmuster. Inhalte werden linear untereinander aufgeführt. Auf die Suche wird dabei ein besonderer Fokus gelegt, auf den Übersichtsseiten, wird sie immer an oberster Stelle aufgeführt. Auf den Seiten von Beitrag und Leitfaden taucht sie nicht auf, hier liegt der Fokus auf den Informationen. Die Farbauswahl orientiert sich an den Farben, die bereits auf der Webseite des Unternehmens verwendet werden.</p><figure class="image"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA3cAAACgCAMAAACYPmUuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACoUExURdra2tfX19fX19nZ2dnZ2dnZ2dra2tnZ2dnZ2dnZ2Rg0Wh04XB45XihFcS5HaTJThzNUiUdkkUhdeUxge0xhfFRqi1hrhVt0m1x1nWyBo9PY39TY3dnZ2eiHNuiMNuiONumSNuuzfe1sAO5zAO51AO7IX+7u7u7v8O7x9O97APGnX/Pz8/S+NvXCNvXENvX19fb29vb3+Pb6/fz8/P62AP+7AP+9AP///6TM4jgAAAAKdFJOUzBAYHivt7/X3/dorhOJAAAACXBIWXMAABcRAAAXEQHKJvM/AAAEZ0lEQVR4Xu3T2zaVYQBA0b8DbUVUUtjl0IFoKwrv/2YaIw+wrv7xXcx5tV5gTdPzdWBOa0+mtSUwrxfT+vLbaixXP48/Hw3m08n52ffRXP4azuHe293BvHv/8cNg9peLf9+tbsdy9/fHl6+DOb24uf49mj/3wzl4/XJzMK+2drYH88Z3ke8a3xW+q3zX+K7wXeW7xneF7yrfNb4rfFf5rvFd4bvKd43vCt9Vvmt8V/iu8l3ju8J3le8a3xW+q3zX+K7wXeW7xneF7yrfNb4rfFf5rvFd4bvKd43vCt9Vvmt8V/iu8l3ju8J3le8a3xW+q3zX+K7wXeW7xneF7yrfNb4rfFf5rvFd4bvKd43vCt9Vvmt8V/iu8l3ju8J3le8a3xW+q3zX+K7wXeW7xneF7yrfNb4rfFf5rvFd4bvKd43vCt9Vvmt8V/iu8l3ju8J3le8a3xW+q3zX+K7wXeW7xneF7yrfNb4rfFf5rvFd4bvKd43vCt9Vvmt8V/iu8l3ju8J3le8a3xW+q3zX+K7wXeW7xneF7yrfNb4rfFf5rvFd4bvKd43vCt9Vvmt8V/iu8l3ju8J3le8a3xW+q3zX+K7wXeW7xneF7yrfNb4rfFf5rvFd4bvKd43vCt9Vvmt8V/iu8l3ju8J3le8a3xW+q3zX+K7wXeW7xneF7yrfNb4rfFf5rvFd4bvKd43vCt9Vvmt8V/iu8l3ju8J3le8a3xW+q3zX+K7wXeW7xneF7yrfNb4rfFf5rvFd4bvKd43vCt9Vvmt8V/iu8l3ju8J3le8a3xW+q3zX+K7wXeW7xneF7yrfNb4rfFf5rvFd4bvKd43vCt9Vvmt8V/iu8l3ju8J3le8a3xW+q3zX+K7wXeW7xneF7yrfNb4rfFf5rvFd4bvKd43vCt9Vvmt8V/iu8l3ju8J3le8a3xW+q3zX+K7wXeW7xneF7yrfNb4rfFf5rvFd4bvKd43vCt9Vvmt8V/iu8l3ju8J3le8a3xW+q3zX+K7wXeW7xneF7yrfNb4rfFf5rvFd4bvKd43vCt9Vvmt8V/iu8l3ju8J3le8a3xW+q3zX+K7wXeW7xneF7yrfNb4rfFf5rvFd4bvKd43vCt9Vvmt8V/iu8l3ju8J3le8a3xW+q3zX+K7wXeW7xneF7yrfNb4rfFf5rvFd4bvKd43vCt9Vvmt8V/iu8l3ju8J3le8a3xW+q3zX+K7wXeW7xneF7yrfNb4rfFf5rvFd4bvKd43vCt9Vvmt8V/iu8l3ju8J3le8a3xW+q3zX+K7wXeW7xneF7yrfNb4rfFf5rvFd4bvKd43vCt9Vvmt8V/iu8l3ju8J3le8a3xW+q3zX+K7wXeW7xneF7yrfNb4rfFf5rvFd4bvKd43vCt9Vvmt8V/iu8l3ju8J3le8a3xW+q3zX+K7wXeW7xneF7yrfNb4rfFf5rvFd4bvKd43vCt9Vvmt8V/iu8l3ju8J3le8a3xW+q3zX+K74/x0wr8X0dOMxgXksnz0A4TUEQtDw9L4AAAAASUVORK5CYII="></figure><p>(Quelle: Eigene Anfertigung)</p><p>Alle Farben außer <i>Orange</i> wurden in der Gestaltung berücksichtigt. Durch die gewohnte Farbumgebung sind die Nutzer in der Lage auf bereits bekannte Regeln, in Bezug auf die Bedeutung von Farben zurückzugreifen. Beispiel die Buttons mit weiterführenden, bzw. Zielführenden Funktionen, sind gelb, wie auf der Seite des Unternehmens. So erkennt der Nutzer, wie er vorankommt. &nbsp;Als Hauptfarbe werden <i>Whitesmoke </i>und <i>White&nbsp;</i>verwendet.&nbsp;</p><p>Als Schriftart wird Arial verwendet. Diese serifenlose Schriftart bietet eine gute Lesbarkeit auf unterschiedlichen Bildschirmgrößen.</p><p>Mit dieser Gestaltung erhält der Nutzer eine Oberfläche, die ihn durch klare Farbgebung leitet und im Aufbau verständlich ist. Die Gestaltung wird Responsive umgesetzt.</p>',
    kurzbeschreibung: 'Wie wurde die Gestaltung festgelegt?',
    tags: ['Gestaltung', 'Intranet', 'Farben'],
    sichtbarkeit: ['Abteilungsübergreifend'],
    abteilung: 'Marketing',
    autor: 'Testeditor',
    kontrolldatum: '2024-04-01',
    veroeffentlichungsdatum: '2023-04-21',
    linkedBeitraege: []
});

//Artikel Kontaktvermittlung
db.beitrag.add({
    id: 6,
    title: 'Anforderungen',
    text: '<h2>Anforderungen</h2><p>Die notwendigen Kernfunktionen umfassen die Funktionalitäten, ohne die das Intranet nicht den Funktionsumfang bietet, der für das Unternehmen essenziell ist. Sämtliche dieser Funktionen müssen enthalten sein.&nbsp;</p><h3><strong>Kernfunktion&nbsp;</strong></h3><h4>Die notwendigen Kernfunktionen umfassen die Funktionalitäten, ohne die das Intranet nicht den Funktionsumfang bietet, der für das Unternehmen essenziell ist. Sämtliche dieser Funktionen müssen enthalten sein.&nbsp;</h4><h4><strong>Mehrfachbezüge</strong></h4><p>Diese Funktionalität hat die höchste Priorität unter allen Kernfunktionen. Durch Mehrfachbezüge sollen Inhalte an mehreren Stellen im Intranet aufrufbar sein und nur an einer Stelle bearbeitet werden müssen.</p><p>Durch diese Funktionalität soll es ermöglicht werden, effizienter zu arbeiten und den Pflegeaufwand von Inhalten zu reduzieren. Zudem wird so garantiert, dass überall die gleichen Informationen hinterlegt sind. So bleiben die Informationen konsistent.&nbsp;</p><p>Von dieser Funktion profitieren sowohl Leser als auch die Ersteller von Inhalten.</p><h4><strong>Mehrfachbezüge</strong></h4><p>Diese Funktionalität hat die höchste Priorität unter allen Kernfunktionen. Durch Mehrfachbezüge sollen Inhalte an mehreren Stellen im Intranet aufrufbar sein und nur an einer Stelle bearbeitet werden müssen.</p><p>Durch diese Funktionalität soll es ermöglicht werden, effizienter zu arbeiten und den Pflegeaufwand von Inhalten zu reduzieren. Zudem wird so garantiert, dass überall die gleichen Informationen hinterlegt sind. So bleiben die Informationen konsistent.&nbsp;</p><p>Von dieser Funktion profitieren sowohl Leser als auch die Ersteller von Inhalten.</p><h2>Zusatzfunktionen</h2><p>Die folgenden Funktionalitäten sind nicht notwendig für das Intranet, sondern optionale Zusatzfunktionen. Ihre Einbindung sorgt für ein verbessertes Nutzererlebnis und nicht essenziell für das Funktionieren der Anwendung.</p><h4><strong>Automatisierte Vorschläge</strong></h4><p>Durch vorgeschlagene Beiträge unterhalb eines Beitrags, wird der Nutzer zu weiteren Informationen geleitet. Diese Vorschläge passen thematisch zum bereits gelesenen Artikel.</p><p>Dadurch kann der Nutzer weiterführende Informationen finden, sein Wissen vertiefen, oder über thematisch ähnliche Beiträge eine gesuchte Information finden.</p><h4><strong>Erinnerung an Prüfung von Inhalten</strong></h4><p>Um die Richtigkeit und Aktualität von Informationen zu gewährleisten, müssen Beiträge in regelmäßigen Abständen überprüft und aktualisiert werden. Dafür wird ein Überprüfungsdatum festgelegt, dass den Ersteller des Beitrags durch eine Nachricht darauf hinweist, einen Beitrag zu prüfen.</p>',
    kurzbeschreibung: 'Was sind die Anfoderungen?',
    tags: ['Anforderungen', 'Intranet'],
    sichtbarkeit: ['Abteilungsübergreifend'],
    abteilung: 'Kontaktvermittlung',
    autor: 'Testeditor',
    kontrolldatum: '2024-04-01',
    veroeffentlichungsdatum: '2023-04-21',
    linkedBeitraege: []
});


db.beitrag.add({
    id: 7,
    title: 'Microsoft SharePoint',
    text: '<p>SharePoint Online ist eine webbasierte Plattform des Unternehmen Microsoft, die Organisationen eine zentrale Plattform bietet, um durch bessere Organisation und Zusammenarbeit die Effizienz zu verbessern. Diese Software wurde für den Vergleich der Umsetzungen gewählt, da sie Teil der Microsoft Produkte ist, die bereits vom Unternehmen verwendet werden.&nbsp;</p><p>Weitere Informationen zu SharePoint finden sie hier: <a href="https://www.microsoft.com/de-de/microsoft-365/sharepoint/collaboration">Mobiles Intranet für die Zusammenarbeit im Team | SharePoint (microsoft.com)</a></p><p>SharePoint enthält Funktionen, die sich mit der Zusammenarbeit von Mitarbeitern und dem Verwalten von Dokumenten befassen. Dazu enthält es Funktionen, mit denen die Plattform angepasst und verwaltet werden kann. Die Plattform ist Teil von Microsoft 365 Verwendet ein Unternehmen dieses Produkt bereits, entstehen durch SharePoint keine Mehrkosten und SharePoint kann in andere Office-Anwendungen integriert werde.</p><p>Inhalte können mehrfach eingebunden werden, ohne mehrfach gespeichert werden zu müssen, z.B. über die Verlinkung von Dokumenten.&nbsp;</p><p>SharePoint kann für den Einarbeitungsleitfaden verwendet werden, es bietet sich die Möglichkeit die bestehenden Dokumente zu verlinken oder auf einer SharePoint Seite zu integrieren.&nbsp;</p><p>Die gebotene Suchfunktion von SharePoint durchsucht den Titel und Attribute von Dokumenten. Um den Inhalt in die Suche miteinzubeziehen, muss ein Dokument indexiert sein und in einem Format gespeichert sein, das SharePoint unterstützt. Die Suche beschränkt sich auf für den Nutzer freigegebene Dateien.</p><p>Die Formatierung von Inhalten lässt sich in SharePoint durch Format Vorlagen einschränken. Beim Erstellen von SharePoint Seiten sind die Gestaltungsmöglichkeiten auch mit einer Vorlage vielfältig. Der Seiten Editor ist kein reiner Text Editor, er ermöglicht die Gestaltung der gesamten Seite und entspricht eher einem Content Management System.&nbsp;</p><p>Die Einbindung von Dateien in unterschiedlichen Formaten ist simpel. Durch die Integration in Office können bereits genutzte Formate wie Word oder PowerPoint gewohnt weiterverwendet werden.</p><p>SharePoint Online bietet keine Funktion für themenbasierte Vorschläge. Diese Funktion ist nicht in SharePoint Online enthalten, es wird SharePoint 2019 benötigt, welches nicht Teil von Microsoft 365 ist.</p><p>Eine Funktion zur Erinnerung an die Überprüfung von Inhalten nach einem bestimmten Zeitraum ist in SharePoint enthalten. SharePoint benachrichtigt den Nutzer per E-Mail, sobald eine Prüfung von Inhalten fällig ist.&nbsp;</p><p>Die Struktur einer SharePoint Seite und die dort gespeicherten Dateien, ist dem Nutzer frei überlassen. Es gibt keine Vorgabe was Benennung oder Speicherort angeht.&nbsp;</p><p>Die Freigabe zur Bearbeitung oder der Sichtbarkeit von Dokumenten kann in SharePoint eingeschränkt werden.</p>',
    kurzbeschreibung: 'Wie funktioniert SharePoint?',
    tags: ['Programm', 'SharePoint', 'Anleitung'],
    sichtbarkeit: ['Abteilungsübergreifend'],
    abteilung: 'Versand',
    autor: 'Testeditor',
    kontrolldatum: '2023-05-11',
    veroeffentlichungsdatum: '2023-04-21',
    linkedBeitraege: []
});

db.beitrag.add({
    id: 8,
    title: 'WordPress',
    text: '<p>WordPress ist ein Content-Management-System, das zur Erstellung und Verwaltung von Webseiten genutzt wird. Wichtig ist die Unterscheidung zwischen WordPress.org und WordPress.com, beim Ersterem handelt es sich um den Code Content-Management-Systems, das Zweite ist ein Onlinedienst, der Webseiten hostet. Im Folgenden wird nur Bezug auf Wordpress.org genommen. WordPress wurden für den Optionsvergleich gewählt, da es von 63,5% Prozent der Webseiten weltweit im Februar 2023 verwendet wurde. Es ist Open Source, kann modifiziert und erweitert werden. WordPress ist kostenlos, Nebenkosten für das Betreiben der Seite (Domain, Erweiterungen, etc.) muss das Unternehmen tragen.<br>&nbsp;</p><p>Mehrfachnutzung von Seiten ist in WordPress nicht möglich, Beiträge, bzw. Blöcke können auf mehreren Seiten eingebunden werden.&nbsp;</p><p>Die Suchtfunktion von WordPress durchsucht den Inhalt von Beiträgen und Schlagwörter, die den Suchbergriff beinhalten.</p><p>Beiträge werden in WordPress über einen Texteditor erstellt. Die Seitenerstellung erfolgt über den Seiteneditor und bietet viele Gestaltungsmöglichkeiten. Die Grundgestaltung, wie z.B. Farbauswahl oder Layout, kann über Templates eingeschränkt werden.&nbsp;</p><p>Die Einbindung von Video- und Bilddateien ist möglich. Dateien aus Microsoft Office Anwendungen, wie Word-Dateien, können standardmäßig nicht integriert werden. Dafür wird ein Plugin benötigt oder ein Einbettungslink von OneDrive. Alternativ kann eine Textdatei als PDF exportiert werden, dieses Format kann in WordPress genutzt werden.</p><p>In Standardumfang von WordPress gibt es keine Funktionalität, um den Nutzer an das Überprüfen von Inhalten zu erinnern. Über Plugins kann diese Funktion hinzugefügt werden.</p><p>Die Struktur der Seiten ist Nutzerabhängig, sie wird nicht automatisch generiert, sondern kann frei bestimmt werden.</p><p>WordPress bietet unterschiedliche Schreibrechte, bzw. Rollen, für Nutzer der Seit. Der Editiermodus für Texte ist schnell zu erreichen und simpel zu bedienen. Das Erstellen von Seiten und Unterseiten kann über das Admin Menü vollzogen werden.</p>',
    kurzbeschreibung: 'Wie funktioniert WordPress?',
    tags: ['Programm', 'WordPress', 'Anleitung'],
    sichtbarkeit: ['Abteilungsübergreifend'],
    abteilung: 'Rechungswesen',
    autor: 'Testeditor',
    kontrolldatum: '2023-05-31',
    veroeffentlichungsdatum: '2023-04-21',
    linkedBeitraege: []
});


//Artikel Marketing

// db.benutzer.clear();

db.benutzer.add({
    id: 1,
    name: "Testeditor",
    letzte_beitraege: [1, 2, 3],
    editor: true,
    passwort: '123',
    abteilung: 'Vertrieb'
});

db.benutzer.add({
    id: 2,
    name: "Testnutzer",
    letzte_beitraege: [1, 2, 3],
    editor: false,
    passwort: '234',
    abteilung: 'Vertrieb'
});
