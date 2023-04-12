import React from 'react';

export default class BeitragPreview extends React.Component {
    render() {
        return <div className="beitrag-preview teaser" teaser={this.props} key={this.props.id}>
                <h2><a href={`/beitrag/${(this.props.id)}`} target="_blank"  rel="noopener noreferrer">{this.props.title}</a></h2>
                <p>{this.props.kurzbeschreibung}</p>
                <button
                    className="product-preview__add"
                    onClick={() => this.props.onClick( this.props.id )}
                    title="Add to the offer"
                >
                    <span>Beitrag einbinden</span>
                </button>
                <p></p>
            </div>
    }
}