import React from 'react';
import BeitragPreview from './BeitragPreview';

export default class BeitragList extends React.Component {
    render() {
        return <div className="beitrag_list_editor" style={{ display: 'none' }}>
            <button onClick={() => document.querySelector('.beitrag_list_editor').style.display = 'none'}>Schließen</button>
            <div className="search_beitrag_list">
                <input type={'text'} className="searchbar" placeholder="Suchen Sie nach einem Beitrag"></input>
                <button className="search_button">Suchen</button>
            </div>
            <div className="beitrag_overview">
                {this.props.beitragList?.map(beitrag => {
                    return <div key={beitrag.id}>
                        <BeitragPreview
                            id={beitrag.id}
                            onClick={this.props.onClick}
                            {...beitrag}
                        />
                    </div>;
                })}
            </div>
            <p className="hinweis_form">Wählen Sie einen Beitrag. dessen Beitrag eingebunden werden soll. Beiträge die diesen bereits beinhalten oder bereits eingebunden wurden, können nicht eingebunden werden.</p>
        </div>;
    }
}
