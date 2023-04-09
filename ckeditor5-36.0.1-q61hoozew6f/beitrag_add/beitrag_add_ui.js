import {
    ButtonView,
    createLabeledDropdown,
    LabeledFieldView,
    View,
    ContextualBalloon,
    clickOutsideHandler
} from '@ckeditor/ckeditor5-ui';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class Dropdown_beitrag_add extends Plugin {
    static get requires() {
        return [ContextualBalloon];
    }
    init() {
        const editor = this.editor;

        this.formView = this._createFormView();

        editor.ui.componentFactory.add('beitrag_add', locale => {
            const button = new ButtonView();

            button.label = 'Beitrag';
            button.tooltip = true;
            button.withText = true;

            this.listenTo(button, 'execute', () => {
                const title = 'Test';
                const abbr = 'WYSIWYG';

                editor.model.change(writer => {
                    editor.model.insertContent(
                        writer.createText(abbr),
                        { 'beitrag_add': title }
                    );

                });
            });
            return button;
        });
    }

    _createFormView() {
        const editor = this.editor;
        const formView = new FormView(editor.locale);

        return formView;
    }

    _showUI() {
        this._balloon.add({
            view: this.formView,
            position: this._getBalloonPositionData()
        });

        this.formView.focus();
    }

    _hideUI() {
        // Clear the input field values and reset the form.
        this.formView.abbrInputView.fieldView.value = '';
        this.formView.titleInputView.fieldView.value = '';
        this.formView.element.reset();

        this._balloon.remove(this.formView);

        // Focus the editing view after inserting the abbreviation so the user can start typing the content
        // right away and keep the editor focused.
        this.editor.editing.view.focus();
    }

    _getBalloonPositionData() {
        const view = this.editor.editing.view;
        const viewDocument = view.document;
        let target = null;

        // Set a target position by converting view selection range to DOM
        target = () => view.domConverter.viewRangeToDom(viewDocument.selection.getFirstRange());

        return {
            target
        };
    }
}

class FormView extends View {
    constructor(locale) {
        this.abbrInputView = this._createInput('1');
        this.titleInputView = this._createInput('2');


        this.saveButtonView = this._createButton('save', 'ck-button-save');
        this.saveButtonView.type = 'submit';
        this.cancelButtonView = this._createButton('cancel', 'ck-button-cancel');
        this.cancelButtonView.delegate('execute').to(this, 'cancel');
        super(locale);

        this.setTemplate({
            tag: 'form',
            attributes: {
                class: ['ck', 'ck-abbr-form'],
                tabindex: '-1'
            }
        })
    }

    render() {
        super.render();

        // Submit the form when the user clicked the save button or pressed enter in the input.
        submitHandler({
            view: this
        });
    }

    focus() {
        this.childViews.first.focus();
    }

    createInput(label) {
        const labeledInput = new LabeledFieldView(this.locale, createLabeledDropdown);
        labeledInput.label = label

        return labeledInput
    }

    createButton(label, className) {
        const button = new ButtonView();
        button.set({
            label,
            tooltip: true,
            class: className
        });

        return button
    }
}