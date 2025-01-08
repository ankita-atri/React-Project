describe("Delete an Itinerary", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should delete and verify by count", () => {
    //counting rows
    cy.get("tbody tr").then(($rowsBefore) => {
      const count = $rowsBefore.length;

      //deleting
      cy.get("tbody tr")
        .contains("Trip to Paris")
        .parent()
        .within(() => {
          cy.contains("Delete").click();
        });
      // window pop up
      cy.contains("Confirm Deletion").should("be.visible");
      cy.get(".modal").contains("Delete").click();
      //again counting & verifying
      cy.get("tbody tr").should("have.length", count - 1);
      cy.get("tbody").should("not.contain", "Trip to Paris");
      // verify the added row info
    });
  });
});
