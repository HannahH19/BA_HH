import { Plugin } from "@ckeditor/ckeditor5-core";
import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import Beitrag_add_command from "./beitrag_add_command";

export default class Beitrag_add_editing extends Plugin {
    static get requires() {
        return [Widget];
    }

    init() {
        this._defineSchema();
        this._defineConverters();
        this.editor.commands.add( 'insertBeitrag', new Beitrag_add_command( this.editor )); 
    }

    _defineSchema() {
        const schema = this.editor.model.schema;

        schema.register('beitrag', {
            inheritAllFrom: '$blockObject'
        });

        schema.register('beitragTitle', {
            isLimit: true,
            allowIn: 'beitrag',
            allowContentOf: '$block'
        });

        schema.register('beitragText', {
            isLimit: true,
            allowIn: 'beitrag',
            allowContentOf: '$root'
        });

        schema.addChildCheck( ( context, childDefinition ) => {
            if ( context.endsWith( 'beitragText' ) && childDefinition.name == 'beitrag' ) {
                return false;
            }
        } );
    }

    _defineConverters() {
        const conversion = this.editor.conversion;
        
        conversion.for( 'upcast' ).elementToElement( {
            model: 'beitrag',
            view: {
                name: 'section',
                classes: 'beitrag'
            }
        } );

        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'beitrag',
            view: {
                name: 'section',
                classes: 'beitrag'
            }
        } );

        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'beitrag',
            view: ( modelElement, { writer: viewWriter } ) => {
                const section = viewWriter.createContainerElement( 'section', { class: 'beitrag' } );

                return toWidget( section, viewWriter, { label: 'beitrag widget' } );
            }
        } );

        conversion.for( 'upcast' ).elementToElement( {
            model: 'beitragTitle',
            view: {
                name: 'h1',
                classes: 'title'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'beitragTitle',
            view: {
                name: 'h1',
                classes: 'title'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'beitragTitle',
            view: ( modelElement, { writer: viewWriter } ) => {
                // Note: You use a more specialized createEditableElement() method here.
                const h1 = viewWriter.createEditableElement( 'h1', { class: 'title' } );

                return toWidgetEditable( h1, viewWriter );
            }
        } );

        // <simpleBoxDescription> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'beitragText',
            view: {
                name: 'div',
                classes: 'content',
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'beitragText',
            view: {
                name: 'div',
                classes: 'content'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'beitragText',
            view: ( modelElement, { writer: viewWriter } ) => {
                // Note: You use a more specialized createEditableElement() method here.
                const div = viewWriter.createEditableElement( 'div', { class: 'content' } );

                return toWidgetEditable( div, viewWriter );
            }
        } );
    }
}

//Quelle: 