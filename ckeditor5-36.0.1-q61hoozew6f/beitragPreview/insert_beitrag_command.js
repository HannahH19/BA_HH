import Command from '@ckeditor/ckeditor5-core/src/command';

export default class InsertBeitragCommand extends Command {
    execute( id ) {
        this.editor.model.change( writer => {
            this.editor.model.insertContent( writer.createElement( 'beitragPreview', { id } ) );
            document.querySelector('.beitrag_list_editor').style.display = 'none';
        } );
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'beitragPreview' );

        this.isEnabled = allowedIn !== null;
    }
}
