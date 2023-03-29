import "./App.css";
import Top from "./top";
import TeaserList from "./Teaser";
async function get_beitrag_list() {}

function Startpage() {
  const teaser = {
    id: 1,
    title: "Titel",
    short_description: "Kurzbeschreibung",
    taglist: "Tag",
  };
  const teaser_list = [teaser];
  return (
    <main>
      <Top heading="Intranet"></Top>
      <div className="content">
        <div className="container">
          <h3>Einarbeitungsleitfaden</h3>
          <p>Alle wichtigen Informationen zur Einarbeitung finden Sie hier</p>
          <button className="open">Einarbeitungsleitfaden</button>
        </div>
        <TeaserList teasers={teaser_list} heading="Zuletzt geöffnete Beiträge"></TeaserList>
      </div>
    </main>
  );
}

export default Startpage;
