import { getGreeting } from '../support/app.po';

describe('rxjs-dos', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to rxjs-dos!');
  });
});
