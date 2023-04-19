import Top from "./Top";
import TeaserList from "./Teaser";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./db";

function Startpage() {
  const beitragList = useLiveQuery(() => db.beitrag.toArray());
  //Rolle des Nutzers
  const editor = JSON.parse(sessionStorage.getItem('Nutzer')).editor;

  return (
    <main>
      <Top heading="Startseite"></Top>
      <div className="content">
        {editor && <KontrollBeitraege></KontrollBeitraege>}
        {!editor &&<ZuletzGeoeffnet beitraege={beitragList}></ZuletzGeoeffnet>}
      </div>
    </main>
  );
}


export default Startpage;

function ZuletzGeoeffnet({ beitraege }) {
  if (!beitraege) { return }
  const zuletztGeloeffnetList = JSON.parse(sessionStorage.getItem('Nutzer')).letzte_beitraege;
  beitraege = beitraege?.filter(beitrag => zuletztGeloeffnetList.includes(beitrag.id));

  return (
    <TeaserList beitraege={beitraege} heading="Zuletzt geöffnete Beiträge"></TeaserList>
  )
}

function KontrollBeitraege() {
  const nameNutzer = JSON.parse(sessionStorage.getItem('Nutzer')).name;
  const datum = new Date();
  const tag = String(datum.getDate()).padStart(2, '0');
  const monat = String(datum.getMonth() + 1).padStart(2, '0');
  const jahr = datum.getFullYear();
  //Datum von Heute für Prüfunf, welcher Beitrag sein Kontrolldatum überschritten hat
  const datumHeute = String(jahr) + '-' + String(monat) + '-' + String(tag);


  //Alle Beiträge mit Datum kleiner gleich Autor aus Datenbank holen und nach richtigem Autor filtern
  const beitragList = useLiveQuery(
    async () => {
      const beitrag = await db.beitrag
        .where('kontrolldatum')
        .belowOrEqual(datumHeute)
        .and(beitrag => beitrag.autor === nameNutzer)
        .toArray();
      return beitrag;
    }
  );

  return (
    <TeaserList beitraege={beitragList} heading="Zu prüfende Beiträge" kontrolldatum={true}></TeaserList>
  )

}