// react/productlist.js

import React from 'react';
import BeitragPreview from './beitragPreview';
export default class BeitragList extends React.Component {
    render() {
        return <div className="beitrag_list">
            <h3>Products</h3>
            <ul>
                {this.props.products?.map( product => {
                    return <li key={product.id}>
                        <BeitragPreview
                            id={product.id}
                            onClick={this.props.onClick}
                            {...product}
                        />
                    </li>;
                })}
            </ul>
            <p><b>Tip</b>: Clicking the product will add it to the editor.</p>
        </div>;
    }
}