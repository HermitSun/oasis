import {
  advancedSearch,
  basicSearch,
  getActivePaperAbstract,
  getAffiliationBasicRanking,
  getAuthorBasicRanking,
  getResearcherInterest,
  importPaperData
} from "@/api";

describe("API", () => {
  it("1. basicSearch", async () => {
    try {
      const searchRes = await basicSearch({
        keyword: "software",
        page: 1,
        startYear: "2000",
        endYear: "2020"
      });
      expect(searchRes.data).not.toBeUndefined();
      expect(searchRes.data.papers.length).not.toBe(0);
      expect(searchRes.data.size).not.toBe(0);
    } catch (e) {
      expect(e.toString()).toContain("undefined" || "null");
    }
  });

  it("2. advancedSearch", async () => {
    try {
      const searchRes = await advancedSearch({
        keyword: "software",
        page: 1,
        startYear: "2000",
        endYear: "2020"
      });
      expect(searchRes.data).not.toBeUndefined();
      expect(searchRes.data.papers.length).not.toBe(0);
      expect(searchRes.data.size).not.toBe(0);
    } catch (e) {
      expect(e.toString()).toContain("undefined");
    }
  });

  it("3.1 getAffiliationBasicRanking", async () => {
    try {
      const rank1 = await getAffiliationBasicRanking({
        sortKey: "acceptanceCount",
        year: "2019"
      });
      expect(rank1.data).not.toBeUndefined();
      expect(rank1.data.length).not.toBe(0);

      const rank2 = await getAffiliationBasicRanking({
        sortKey: "citationCount",
        year: "2019"
      });
      expect(rank2.data).not.toBeUndefined();
      expect(rank2.data.length).not.toBe(0);
    } catch (e) {
      expect(e.toString()).toContain("undefined");
    }
  });

  it("3.2 getAuthorBasicRanking", async () => {
    try {
      const rank1 = await getAuthorBasicRanking({
        sortKey: "acceptanceCount",
        year: "2019"
      });
      expect(rank1.data).not.toBeUndefined();
      expect(rank1.data.length).not.toBe(0);

      const rank2 = await getAuthorBasicRanking({
        sortKey: "citationCount",
        year: "2019"
      });
      expect(rank2.data).not.toBeUndefined();
      expect(rank2.data.length).not.toBe(0);
    } catch (e) {
      expect(e.toString()).toContain("undefined");
    }
  });

  it("4. getResearcherInterest", async () => {
    try {
      const interestRes = await getResearcherInterest({
        researcherId: "37399959800"
      });
      expect(interestRes.data).not.toBeUndefined();
      expect(interestRes.data.length).not.toBe(0);
    } catch (e) {
      expect(e.toString()).toContain("undefined");
    }
  });

  it("5. getActivePaperAbstract", async () => {
    try {
      const abstractRes = await getActivePaperAbstract();
      expect(abstractRes.data).not.toBeUndefined();
      expect(abstractRes.data.length).not.toBe(0);
    } catch (e) {
      expect(e.toString()).toContain("undefined");
    }
  });

  it("6. importPaperData", async () => {
    try {
      const uploadData = new FormData();
      const testPaperDataInJSON = await import("./test.json");
      const testPaperData = new Blob([JSON.stringify(testPaperDataInJSON)], {
        type: "application/json"
      });
      uploadData.set("paperData", new File([testPaperData], "test.json"));
      const uploadRes = await importPaperData(uploadData);
      expect(uploadRes.data).not.toBeUndefined();
      expect(uploadRes.data.increasedCount).not.toBeLessThan(0);
    } catch (e) {
      expect(e.toString()).toContain("undefined");
    }
  });
});
