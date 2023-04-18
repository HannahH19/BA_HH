import { Plugin } from "@ckeditor/ckeditor5-core";
import { ButtonView } from "@ckeditor/ckeditor5-ui";

export default class BeitragUi extends Plugin{
    init(){
        const editor = this.editor;

        editor.ui.componentFactory.add( 'beitragAdd', () => {
            const button = new ButtonView();

            button.set( {
                label: 'Beitrag einbinden',
                withText: true
            } );

            button.on( 'execute', () => {
              document.querySelector('.beitrag_list_editor').style.display = 'flex';
            } );

            return button;
        } );
    }
}