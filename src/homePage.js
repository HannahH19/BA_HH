import Top from "./Top";
import TeaserList from "./Teaser";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./db";

function Startpage() {
  const beitragList = useLiveQuery(() => db.beitrag.toArray());

  return (
    <main>
      <Top heading="Startseite"></Top>
      <div className="content">
        <KontrollBeitraege></KontrollBeitraege>
        <ZuletzGeoeffnet beitraege={beitragList}></ZuletzGeoeffnet>
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
  const autor = JSON.parse(sessionStorage.getItem('Nutzer')).name;
  console.log(autor)

  const beitragList = useLiveQuery(
    async () => {
      const beitrag = await db.beitrag
        .orderBy('kontrolldatum')
        .toArray();
      return beitrag;
    }
  );


  return (
    <div></div>
  )
  console.log({ beitragList })
}