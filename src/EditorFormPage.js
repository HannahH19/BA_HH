// app.js

// Imports necessary to run a React application.
import React from 'react';
import ReactDOM from 'react-dom';

// The official <CKEditor> component for React.
import { CKEditor } from '@ckeditor/ckeditor5-react';

// The official CKEditor 5 instance inspector. It helps understand the editor view and model.

// The base editor class and features required to run the editor.
import Editor from 'ckeditor5-custom-build/build/ckeditor';
// CKEditor plugin implementing a product widget to be used in the editor content.


// React components to render the list of products and the product preview.
import BeitragList from './beitragList';
import BeitragPreview from './beitragPreview';

// The React application class. It renders the editor and the product list.
export class EditorFormPage extends React.Component{
   
    constructor( props ) {
        super( props );
      
        this.editor = null;

        this.state = {
            editorData: `
            `,
        };

        // The configuration of the <CKEditor> instance.
        this.editorConfig = {
            // The configuration of the Products plugin. It specifies a function that will allow
            // the editor to render a React <ProductPreview> component inside a product widget.
            products: {
                productRenderer: ( id, domElement ) => {
                    const products=[
                        {
                            id: 1,
                            title: 'Colors of summer in Poland',
                            kurzbeschreibung: '123'
                        },
                        {
                            id: 2,
                            title: 'Mediterranean sun on Malta',
                            kurzbeschreibung: '123'
                        },
                        {
                            id: 3,
                            title: 'Tastes of Asia',
                            kurzbeschreibung: '123'
                        },
                        {
                            id: 4,
                            title: 'Exotic India',
                            kurzbeschreibung: '123'
                        }
                    ]
                    const product = products.find( product => product.id === id );

                    ReactDOM.render(
                        <BeitragPreview id={id} {...product} />,
                        domElement
                    );
                }
            }
        };

        this.handleEditorDataChange = this.handleEditorDataChange.bind( this );
        this.handleEditorReady = this.handleEditorReady.bind( this );
    }

    // A handler executed when the user types or modifies the editor content.
    // It updates the state of the application.
    handleEditorDataChange( evt, editor ) {
        this.setState( {
            editorData: editor.getData()
        } );
    }

    // A handler executed when the editor has been initialized and is ready.
    // It synchronizes the initial data state and saves the reference to the editor instance.
    handleEditorReady( editor ) {
        this.editor = editor;

        this.setState( {
            editorData: editor.getData()
        } );

        // CKEditor 5 inspector allows you to take a peek into the editor's model and view
        // data layers. Use it to debug the application and learn more about the editor.
    }

    render() {
        return [
            <main>
            <div className="app__offer-editor" key="offer-editor">
                <h3>Product offer editor</h3>
                <CKEditor
                    editor={Editor}
                    data={this.state.editorData}
                    config={this.editorConfig}
                    onChange={this.handleEditorDataChange}
                    onReady={this.handleEditorReady}
                />

                <h3>Editor data</h3>
                <textarea value={this.state.editorData} readOnly={true}></textarea>
            </div>,
            <BeitragList
                key="beitrag-list"
                products={[
                    {
                        id: 1,
                        title: 'Colors of summer in Poland',
                        kurzbeschreibung: '123'
                    },
                    {
                        id: 2,
                        title: 'Mediterranean sun on Malta',
                        kurzbeschreibung: '123'
                    },
                    {
                        id: 3,
                        title: 'Tastes of Asia',
                        kurzbeschreibung: '123'
                    },
                    {
                        id: 4,
                        title: 'Exotic India',
                        kurzbeschreibung: '123'
                    }
                ]}
                onClick={( id ) => {
                    this.editor.execute( 'insertProduct', id );
                    this.editor.editing.view.focus();
                }}
            />
            </main>
        ];
    }
}

