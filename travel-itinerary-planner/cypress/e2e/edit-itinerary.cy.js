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
    cy.get('input[name="name"]').clear().type("Updated-Trip");
    cy.get('input[name="destination"]').clear().type("Kolkata");
    cy.get('select[name="modeOfTransport"]').select("Car");
    cy.contains("Submit").click();
    //

    cy.get("tbody tr")
      .contains("Updated-Trip")
      .parent()
      .within(() => {
        cy.contains("Kolkata").should("exist");
        cy.contains("Car").should("exist");
      });
    // should("exist");
  });
});
