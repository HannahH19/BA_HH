/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import {
	View,
	LabeledFieldView,
	createLabeledInputText,
	ButtonView,
	submitHandler,
	createLabeledDropdown
} from '@ckeditor/ckeditor5-ui';
import { icons } from '@ckeditor/ckeditor5-core';

export default class FormView extends View {
	constructor( locale ) {
		super( locale );

		this.abbrInputView = this._createInput( 'Add abbreviation' );
		this.saveButtonView = this._createButton( 'Save', icons.check, 'ck-button-save' );
		// Submit type of the button will trigger the submit event on entire form when clicked 
        // (see submitHandler() in render() below).
		this.saveButtonView.type = 'submit';

		this.cancelButtonView = this._createButton( 'Cancel', icons.cancel, 'ck-button-cancel' );

		// Delegate ButtonView#execute to FormView#cancel
		this.cancelButtonView.delegate( 'execute' ).to( this, 'cancel' );

		this.testButtonView = this._createButton('Beitrag 1', '' , '');
		this.testButtonView.type = 'submit';

		this.childViews = this.createCollection( [
			this.abbrInputView,
			this.saveButtonView,
			this.cancelButtonView,
			this.testButtonView
		] );

		this.setTemplate( {
			tag: 'dropdown',
			attributes: {
				class: [ 'ck', 'ck-abbr-form' ],
				tabindex: '-1'
			},
			children: this.childViews
		} );
	}

	render() {
		super.render();

		// Submit the form when the user clicked the save button or pressed enter in the input.
		submitHandler( {
			view: this
		} );
	}

	focus() {
		this.childViews.first.focus();
	}

	_createInput( label ) {
		const labeledInput = new LabeledFieldView( this.locale, createLabeledInputText );

		labeledInput.label = label;

		return labeledInput;
	}

	_createButton( label, icon, className ) {
		const button = new ButtonView();

		button.set( {
			label: label,
			withText: true,
			tooltip: true,
			class: className
		} );

		return button;
	}
}