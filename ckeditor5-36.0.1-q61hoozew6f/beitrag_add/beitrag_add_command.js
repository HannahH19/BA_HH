import Command from '@ckeditor/ckeditor5-core/src/command';

export default class Beitrag_add_command extends Command {
    execute() {
        this.editor.model.change( writer => {
            this.editor.model.insertObject( createBeitrag( writer ) );
        });
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'beitrag' );

        this.isEnabled = allowedIn !== null;
    }
}

function createBeitrag( writer) {
    const beitrag = writer.createElement( 'beitrag' );
    const beitragTitle = writer.createElement( 'beitragTitle' );
    const beitragText = writer.createElement( 'beitragText' );

    writer.append( beitragTitle, beitrag );
    writer.append( beitragText, beitrag );

    // There must be at least one paragraph for the description to be editable.
    // See https://github.com/ckeditor/ckeditor5/issues/1464.
    writer.appendElement( 'paragraph', beitragText );

    return beitrag;
}