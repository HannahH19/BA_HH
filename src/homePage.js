import Top from "./top";
import TeaserList from "./teaser";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./db";
function Startpage() {

  const beitrag_list = useLiveQuery(() => db.beitrag.toArray());

  return (
    <main>
      <Top heading="Startseite"></Top>
      <div className="content">
        <TeaserList beitraege={beitrag_list} heading="Zuletzt geöffnete Beiträge"></TeaserList>
      </div>
    </main>
  );
}


export default Startpage;


