import BeitragPreview from "./beitragPreview";

export default function Beitrag_list({beitrag_list}) {
    return (
        <div className="app__beitrag-list">
            <h3>Beiträge</h3>
            <ul>
                {beitrag_list.map( beitrag => {
                    return <li key={beitrag.id}>
                        <BeitragPreview key={beitrag.id} beitrag={beitrag} ></BeitragPreview>
                    </li>;
                })}
            </ul>
        </div>
    )
}