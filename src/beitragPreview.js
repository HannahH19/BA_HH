import React from 'react';

export default class BeitragPreview extends React.Component {
    render() {
        return <div className="beitrag_preview" teaser={this.props} key={this.props.id}>
            <h4 className="beitrag_titel"><a href={`/beitrag/${(this.props.id)}`} target="_blank" rel="noopener noreferrer">{this.props.title}</a></h4>
            <p>{this.props.kurzbeschreibung}</p>
            <button
                className="product-preview__add open"
                onClick={() => { this.props.onClick(this.props.id) }}
                title="Add to the offer"
            >
                <span>Beitrag einbinden</span>
            </button>
            <p></p>
        </div>
    }
}