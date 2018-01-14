const _URL = 'http://localhost:4000/#/test_searchbox',
	  _SEARCHBOX = '.is-field.is-searchbox',
	  _BUTTON = '.is-button.is-search-button',
	  _HITS = '.is-score.is-hits';

describe('Test SearchBox with basic submit button', () => {
	beforeEach(function() {
		cy.visit(_URL);
		cy.server();
	});

	it('Field is focused by default' , function() {
		cy.focused().should('have.class','is-searchbox').and('have.class', 'is-field');
	});

	it('Empty field returns 1000 hits' , function() {
		cy.get(_BUTTON).click();
		cy.get(_HITS).contains('1000 results found');
	});

	it('Hits results for : s', function() {
		cy.get(_SEARCHBOX).type('s');
		cy.wait(150).get(_HITS).contains('73 results found');
	});

	it('Hits results for : mia', function() {
		cy.get(_SEARCHBOX).type('mia');
		cy.wait(150).get(_HITS).contains('1 result found');
	});

	it('Hits results for : alford', function() {
		cy.get(_SEARCHBOX).type('alford');
		cy.wait(150).get(_HITS).contains('1 result found');
	});

	it('No case sensitive', function() {
		cy.get(_SEARCHBOX).type('MiA');
		cy.wait(150).get(_HITS).contains('1 result found');
	});
});