describe("The Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should render the itinerary table", () => {
    cy.get("thead").within(() => {
      cy.contains("ID");
      cy.contains("Name");
      cy.contains("Destination");
    });
  });
});
