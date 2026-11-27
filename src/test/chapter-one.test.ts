import { describe, expect, it } from "vitest";

import { chapterSections, getPricingWalkthrough, learningSteps } from "@/data/chapter-one";

describe("chapter one study material", () => {
  it("keeps the checkout example's discount, tax, and expected totals consistent", () => {
    expect(getPricingWalkthrough()).toEqual({
      subtotal: 200,
      discountAmount: 20,
      taxableAmount: 180,
      vatAmount: 25.2,
      correctTotal: 205.2,
      incorrectVat: 28,
      incorrectTotal: 208,
    });
  });

  it("includes the six agreed study steps in order", () => {
    expect(learningSteps.map((step) => step.label)).toEqual([
      "الفقرة الأصلية",
      "المصطلحات",
      "التحليل",
      "مثال Java",
      "الرسوم",
      "تصدير PDF",
    ]);
  });

  it("gives every Java example a matching line-by-line note and a problem diagram", () => {
    const examples = chapterSections.flatMap((section) => section.examples);
    expect(examples).toHaveLength(5);

    for (const example of examples) {
      expect(example.language).toBe("Java");
      expect(example.lineNotes).toHaveLength(example.code.length);
      expect(example.diagram).toBeTruthy();
    }
  });
});