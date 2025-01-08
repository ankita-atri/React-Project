describe("Add an Itinerary", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should add and verify by count", () => {
    cy.get("tbody tr").then(($rowsBefore) => {
      const count = $rowsBefore.length;

      cy.contains("Add Itinerary").click();

      cy.get('input[name="name"]').type("Test-Trip");
      cy.get('input[name="destination"]').type("London");
      cy.get('input[name="startDate"]').type("2024-12-01");
      cy.get('input[name="endDate"]').type("2024-12-31");
      cy.get('select[name="status"]').select("Planned");
      cy.get('select[name="modeOfTransport"]').select("Flight");
      cy.get('input[name="budget"]').type("2400");

      cy.contains("Submit").click();

      cy.get("tbody tr").should("have.length", count + 1);
      // verifying the added row info
      cy.get("tbody tr")
        .last()
        .within(() => {
          cy.contains("Test-Trip").should("exist");
          cy.contains("London").should("exist");
          cy.contains("2024-12-01").should("exist");
          cy.contains("2024-12-31").should("exist");
          cy.contains("Planned").should("exist");
          cy.contains("Flight").should("exist");
          cy.contains("2400").should("exist");
        });
    });
  });
});
