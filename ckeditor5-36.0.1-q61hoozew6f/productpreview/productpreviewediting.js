// ckeditor/productpreviewediting.js

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { toWidget } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import InsertProductPreviewCommand from './insertproductpreviewcommand';

export default class ProductPreviewEditing extends Plugin {
    static get requires() {
        return [ Widget ];
    }

    init() {
        this._defineSchema();
        this._defineConverters();

        this.editor.commands.add( 'insertProduct', new InsertProductPreviewCommand( this.editor ) );
    }

    _defineSchema() {
        const schema = this.editor.model.schema;

        schema.register( 'beitragPreview', {
            isObject: true,
            allowWhere: '$block',
            allowAttributes: [ 'id' ]
        } );
    }

    _defineConverters() {
        const editor = this.editor;
        const conversion = editor.conversion;
        const renderProduct = editor.config.get( 'products' ).productRenderer;

        conversion.for( 'upcast' ).elementToElement( {
            view: {
                name: 'section',
                classes: 'beitrag'
            },
            model: ( viewElement, { writer: modelWriter } ) => {
                return modelWriter.createElement( 'beitragPreview', {
                    id: parseInt( viewElement.getAttribute( 'data-id' ) )
                } );
            }
        } );

        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'beitragPreview',
            view: ( modelElement, { writer: viewWriter } ) => {
                return viewWriter.createEmptyElement( 'section', {
                    class: 'beitrag',
                    'data-id': modelElement.getAttribute( 'id' )
                } );
            }
        } );

        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'beitragPreview',
            view: ( modelElement, { writer: viewWriter } ) => {
                const id = modelElement.getAttribute( 'id' );

                const section = viewWriter.createContainerElement( 'section', {
                    class: 'beitrag',
                    'data-id': id
                } );

                const reactWrapper = viewWriter.createRawElement( 'div', {
                    class: 'beitrag_react-wrapper'
                }, function( domElement ) {
                    renderProduct( id, domElement );
                } );

                viewWriter.insert( viewWriter.createPositionAt( section, 0 ), reactWrapper );

                return toWidget( section, viewWriter, { label: 'beitrag preview widget' } );
            }
        } );
    }
}
