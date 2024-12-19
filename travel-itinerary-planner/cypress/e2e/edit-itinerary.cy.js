describe("Edit an existing Itinerary", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("edit and check the updated one", () => {
    cy.get("tbody tr")
      .contains("Trip to Paris")
      .parent()
      .within(() => {
        cy.contains("Edit").click();
      });
    cy.get('input[name="name"]').clear().type("Update-Trip");
    cy.get('input[name="destination"]').clear().type("Kolkata");

    cy.contains("Submit").click();

    cy.get("tbody tr").within(() => {
      cy.contains("Update-Trip").should("exist");
      cy.contains("Kolkata").should("exist");
    });
  });
});
