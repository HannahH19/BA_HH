import React from "react";

export default function BeitragPreview({ beitrag}) {
    return (
        <div className="beitragPreview" key={beitrag.id} id={beitrag.id}>
            <h3 className="beitrag-preview__name">{beitrag.title}</h3>
            <p className="beitrag-preview__price">ID: {beitrag.id}</p>
            <button className="beitrag-preview__add">
                Beitrag einbinden
            </button>
        </div>
    )
}