
function Teaser({ teaser }) {
  return (
    <div className="teaser" teaser={teaser} key={teaser.id}>
      <h4>
        <a>{teaser.title}</a>
      </h4>
      <p>{teaser.short_description}</p>
      <ul className="taglist">
        <li>{teaser.taglist}</li>
      </ul>
      <button className="open">Öffnen</button>
    </div>
  );
}

function TeaserList({ teasers, heading }) {
  return (
    <div className="container">
      <h3>{heading}</h3>
      <div className="beitrag_list">
        {teasers.map((teaser) => (
          <Teaser key={teaser.id} teaser={teaser} />
        ))}
      </div>
    </div>
  );
}

export default TeaserList;
