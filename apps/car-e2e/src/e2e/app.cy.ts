import { getGreeting } from '../support/app.po';

describe('car-e2e', () => {
  beforeEach(() => cy.visit('/').waitForDesignSystem());

  it('should display welcome message', () => {
    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains(/car/);
  });
});
