function Teaser({ teaser }) {
  return (
    <div className="teaser" teaser={teaser}>
      <h4>
        <a href={`/beitrag/${(teaser.id)}`}>{teaser.title}</a>
      </h4>
      <p>{teaser.kurzbeschreibung}</p>
      <ul className="taglist">
        {teaser.tags?.map((tag) => (
          <a>{tag}</a>
        ))}
      </ul>
    </div>
  );
}

function TeaserList({ beitraege, heading }) {
  if (!beitraege) {
    return
  }
  return (
    <div className="container">
      <h3>{heading}</h3>
      <div className="beitrag_list">
        {beitraege.map((beitrag) => (
          <Teaser key={beitrag.id} teaser={beitrag} />
        ))}
      </div>
    </div>
  );
}

export default TeaserList;
