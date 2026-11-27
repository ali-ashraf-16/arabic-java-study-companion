import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDownToLine,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CircleAlert,
  Clock3,
  FileText,
  Layers3,
  Printer,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  chapterSections,
  chapterSource,
  getPricingWalkthrough,
  learningSteps,
  type CodeExample as CodeExampleData,
  type ChapterSection,
  type DiagramKind,
} from "@/data/chapter-one";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "الفصل الأول: أهمية فحص البرمجيات | دفتر الفحص" },
      {
        name: "description",
        content:
          "مذاكرة الفصل الأول في هندسة فحص البرمجيات: مصطلحات، تحليل بالعامية، أمثلة Java ورسوم توضيحية قابلة للطباعة PDF.",
      },
      { property: "og:title", content: "الفصل الأول: أهمية فحص البرمجيات | دفتر الفحص" },
      {
        property: "og:description",
        content: "شرح عملي بالعربي العامي مع أمثلة Java ورسوم توضيحية وتصدير PDF.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [activeStep, setActiveStep] = useState("original");
  const lesson = chapterSections[activeLessonIndex];

  if (!lesson) return null;

  const exportPdf = () => window.print();

  const chooseStep = (stepId: string) => {
    if (stepId === "pdf-export") {
      exportPdf();
      return;
    }
    setActiveStep(stepId);
    document.getElementById(`active-${stepId}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const chooseLesson = (index: number) => {
    setActiveLessonIndex(index);
    setActiveStep("original");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="study-app">
        <header className="topbar">
          <div className="topbar-inner">
            <a className="brand-lockup" href="#top" aria-label="دفتر الفحص، بداية الفصل">
              <span className="brand-mark"><BookOpen aria-hidden="true" /></span>
              <span className="brand-copy">
                <strong>دفتر الفحص</strong>
                <span>مذاكرة هندسة البرمجيات</span>
              </span>
            </a>
            <div className="topbar-actions">
              <span className="chapter-status"><span className="status-dot" /> الفصل الأول</span>
              <Button onClick={exportPdf} className="pdf-action">
                <Printer aria-hidden="true" />
                <span>تصدير PDF</span>
              </Button>
            </div>
          </div>
        </header>

        <div className="page-frame" id="top">
          <section className="chapter-banner" aria-labelledby="chapter-title">
            <div className="banner-copy">
              <p className="eyebrow"><span>كتاب مذاكرة</span><span className="eyebrow-divider" /> الفصل 01</p>
              <h1 id="chapter-title">أهمية فحص البرمجيات</h1>
              <p className="chapter-subtitle">The Importance of Software Testing</p>
              <div className="source-line">
                <BookOpen aria-hidden="true" />
                <span>{chapterSource.title}</span>
                <span className="source-author">{chapterSource.author}</span>
              </div>
            </div>
            <div className="banner-index" aria-hidden="true">
              <span>CHAPTER</span>
              <strong>01</strong>
              <span className="index-rule" />
              <span>SOFTWARE<br />TESTING</span>
            </div>
          </section>

          <nav className="method-rail" aria-label="خطوات المذاكرة الست">
            {learningSteps.map((step) => {
              const isExport = step.id === "pdf-export";
              return (
                <Button
                  key={step.id}
                  variant="ghost"
                  className={`method-step ${activeStep === step.id ? "is-active" : ""} ${isExport ? "method-step-export" : ""}`}
                  aria-pressed={activeStep === step.id}
                  onClick={() => chooseStep(step.id)}
                >
                  <span className="step-number">{step.number}</span>
                  <span className="step-label">{step.label}</span>
                  {isExport ? <ArrowDownToLine aria-hidden="true" /> : null}
                </Button>
              );
            })}
          </nav>

          <div className="reader-layout">
            <aside className="chapter-sidebar" aria-label="أقسام الفصل">
              <div className="sidebar-heading">
                <span className="sidebar-kicker">داخل الفصل</span>
                <span className="sidebar-count">04 موضوعات</span>
              </div>
              <nav className="lesson-nav">
                {chapterSections.map((item, index) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    className={`lesson-nav-item ${activeLessonIndex === index ? "is-selected" : ""}`}
                    aria-current={activeLessonIndex === index ? "page" : undefined}
                    onClick={() => chooseLesson(index)}
                  >
                    <span className="lesson-nav-number">{item.number}</span>
                    <span className="lesson-nav-title">{item.title}</span>
                    {activeLessonIndex === index ? <ArrowLeft className="lesson-nav-arrow" aria-hidden="true" /> : null}
                  </Button>
                ))}
              </nav>
              <div className="sidebar-note">
                <Clock3 aria-hidden="true" />
                <span>شرح عملي ومراجعة مركزة</span>
              </div>
            </aside>

            <main className="lesson-reader">
              <div className="lesson-heading">
                <div>
                  <p className="lesson-eyebrow">الموضوع {lesson.number} <span>من 04</span></p>
                  <h2>{lesson.title}</h2>
                  <p className="lesson-deck">{lesson.deck}</p>
                </div>
                <span className="lesson-stamp"><Layers3 aria-hidden="true" /> JAVA · QA</span>
              </div>

              <LessonMaterial lesson={lesson} prefix="active" />

              <div className="lesson-pagination">
                <Button
                  variant="outline"
                  onClick={() => chooseLesson(Math.max(0, activeLessonIndex - 1))}
                  disabled={activeLessonIndex === 0}
                >
                  <ArrowRight aria-hidden="true" /> السابق
                </Button>
                <span>{String(activeLessonIndex + 1).padStart(2, "0")} / 04</span>
                <Button
                  variant="outline"
                  onClick={() => chooseLesson(Math.min(chapterSections.length - 1, activeLessonIndex + 1))}
                  disabled={activeLessonIndex === chapterSections.length - 1}
                >
                  التالي <ArrowLeft aria-hidden="true" />
                </Button>
              </div>

              <section className="pdf-export-section" id="pdf-export" aria-labelledby="pdf-title">
                <div className="pdf-icon"><FileText aria-hidden="true" /></div>
                <div className="pdf-copy">
                  <p className="eyebrow">الخطوة 06</p>
                  <h3 id="pdf-title">الفصل كامل جاهز للطباعة</h3>
                  <p>افتح نافذة الطباعة، وبعدها اختار «حفظ كـ PDF» علشان تحتفظ بكل الموضوعات والرسوم.</p>
                </div>
                <Button onClick={exportPdf} className="pdf-action">
                  <ArrowDownToLine aria-hidden="true" />
                  <span>حفظ الفصل PDF</span>
                </Button>
              </section>
            </main>
          </div>
          <footer className="page-footer">
            <span>دفتر الفحص <span className="footer-separator">/</span> الفصل الأول</span>
            <span>النصوص والشرح مبنيين على المادة المرفوعة</span>
          </footer>
        </div>
      </div>
      <PrintBook />
    </>
  );
}

function LessonMaterial({ lesson, prefix }: { lesson: ChapterSection; prefix?: string }) {
  const stepId = (id: string) => (prefix ? `${prefix}-${id}` : undefined);

  return (
    <div className="lesson-material">
      <section className="content-block" id={stepId("original")} aria-labelledby={stepId("original-heading")}>
        <SectionHeading number="01" title="الفقرة الأصلية بالإنجليزية" english="Original Paragraph" />
        <blockquote className="original-quote" lang="en" dir="ltr">
          {lesson.original.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </blockquote>
        <p className="source-caption">النص الإنجليزي كما ورد في مادة الفصل.</p>
      </section>

      <section className="content-block" id={stepId("terminology")} aria-labelledby={stepId("terminology-heading")}>
        <SectionHeading number="02" title="جدول المصطلحات المفتاحية" english="Key Terminology" />
        <div className="table-scroll">
          <table className="glossary-table">
            <thead>
              <tr><th>المصطلح</th><th>المعنى بالبلدي</th><th>سياقه في شغل الفحص</th></tr>
            </thead>
            <tbody>
              {lesson.terms.map((term) => (
                <tr key={term.term}>
                  <td dir="ltr"><strong>{term.term}</strong></td>
                  <td>{term.translation}</td>
                  <td>{term.context}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="content-block" id={stepId("analysis")} aria-labelledby={stepId("analysis-heading")}>
        <SectionHeading number="03" title="الشرح والتحليل المفاهيمي" english="Conceptual Analysis" />
        <ol className="analysis-list">
          {lesson.analysis.map((item, index) => (
            <li key={item.title}>
              <span className="analysis-index">{String(index + 1).padStart(2, "0")}</span>
              <div><h4>{item.title}</h4><p>{item.body}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section className="content-block" id={stepId("examples")} aria-labelledby={stepId("examples-heading")}>
        <SectionHeading number="04" title="المثال العملي بلغة Java" english="Technical Example · Line by Line" />
        <div className="examples-stack">
          {lesson.examples.map((example, index) => (
            <CodeExample key={example.title} example={example} number={index + 1} />
          ))}
        </div>
      </section>

      <section className="content-block" id={stepId("visuals")} aria-labelledby={stepId("visuals-heading")}>
        <SectionHeading number="05" title="رسوم توضح المشكلة في كل مثال" english="Visual UI & Architecture" />
        <div className="visual-gallery">
          {lesson.examples.map((example, index) => (
            <article className="visual-entry" key={example.title}>
              <div className="visual-entry-heading">
                <span>المثال {String(index + 1).padStart(2, "0")}</span>
                <h4>{example.title}</h4>
              </div>
              <ProblemDiagram kind={example.diagram} />
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function SectionHeading({ number, title, english }: { number: string; title: string; english: string }) {
  return (
    <div className="content-heading">
      <span className="content-index">{number}</span>
      <div><h3>{title}</h3><span>{english}</span></div>
    </div>
  );
}

function CodeExample({ example, number }: { example: CodeExampleData; number: number }) {
  return (
    <article className="code-example">
      <div className="example-title-row">
        <div><span className="example-kicker">مثال {String(number).padStart(2, "0")} · {example.language}</span><h4>{example.title}</h4></div>
        <span className="line-total">{example.code.length} سطر</span>
      </div>
      <p className="example-purpose">{example.purpose}</p>
      <div className="example-columns">
        <div className="code-window" dir="ltr" aria-label="كود Java">
          <div className="code-window-bar"><span>JAVA</span><span>JUnit / RestAssured</span></div>
          <ol className="code-lines">
            {example.code.map((line, index) => (
              <li key={`${index}-${line}`}><span className="code-line-number">{String(index + 1).padStart(2, "0")}</span><code>{line || " "}</code></li>
            ))}
          </ol>
        </div>
        <div className="line-notes-wrap">
          <div className="line-notes-heading"><span>سطر بسطر</span><span>نفس الترقيم</span></div>
          <ol className="line-notes">
            {example.lineNotes.map((note, index) => (
              <li key={`${index}-${note}`}>
                <span className="note-number">{String(index + 1).padStart(2, "0")}</span>
                <p>{note || "سطر فاضي للفصل بين أجزاء الكود."}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </article>
  );
}

function ProblemDiagram({ kind }: { kind: DiagramKind }) {
  if (kind === "pricing") {
    const pricing = getPricingWalkthrough();
    return (
      <figure className="diagram diagram-pricing">
        <figcaption><span className="diagram-label">واجهة Checkout</span><span className="diagram-state is-failing"><CircleAlert aria-hidden="true" /> فرق في الإجمالي</span></figcaption>
        <div className="checkout-screen">
          <div className="checkout-top"><span className="checkout-bag">02</span><span>ملخص الطلب</span><span className="checkout-method">SAVE10</span></div>
          <div className="checkout-row"><span>المنتجات (قطعتين)</span><strong>{pricing.subtotal.toFixed(2)} ج.م</strong></div>
          <div className="checkout-row discount-row"><span>الخصم</span><strong>−{pricing.discountAmount.toFixed(2)} ج.م</strong></div>
          <div className="checkout-row problem-row"><span>الضريبة اتحسبت على المبلغ الغلط</span><strong>{pricing.incorrectVat.toFixed(2)} ج.م</strong></div>
          <div className="checkout-total"><span>المطلوب من العميل</span><strong>{pricing.incorrectTotal.toFixed(2)} ج.م</strong></div>
          <div className="correct-total"><Check aria-hidden="true" /><span>الإجمالي الصح بعد الخصم والضريبة</span><strong>{pricing.correctTotal.toFixed(2)} ج.م</strong></div>
        </div>
        <p className="diagram-caption">الضريبة المفروض تتحسب على {pricing.taxableAmount.toFixed(2)} بعد الخصم، مش على {pricing.subtotal.toFixed(2)} قبله.</p>
      </figure>
    );
  }

  if (kind === "race-condition") {
    return (
      <figure className="diagram diagram-race">
        <figcaption><span className="diagram-label">مساران في نفس اللحظة</span><span className="diagram-state is-failing"><CircleAlert aria-hidden="true" /> سحب مزدوج محتمل</span></figcaption>
        <div className="race-balance"><span>رصيد البداية</span><strong>100 ج.م</strong></div>
        <div className="race-lanes">
          <div className="race-lane"><span className="lane-name">تطبيق الموبايل</span><span>قرأ: 100 ج.م</span><span className="lane-action">سحب 100 ج.م</span></div>
          <div className="race-lane"><span className="lane-name">ماكينة ATM</span><span>قرأ: 100 ج.م</span><span className="lane-action">سحب 100 ج.م</span></div>
        </div>
        <div className="race-result"><span>لو العمليتين عدّوا من غير حماية</span><strong>−100 ج.م</strong></div>
        <p className="diagram-caption">ده ترتيب تنفيذ ممكن، مش نتيجة مضمونة في كل تشغيل؛ الاختبار المتزامن البسيط ممكن يفوّت المشكلة.</p>
      </figure>
    );
  }

  if (kind === "white-box") {
    return (
      <figure className="diagram diagram-mobile">
        <figcaption><span className="diagram-label">تجربة مسار إدخال غير صالح</span><span className="diagram-state is-failing"><CircleAlert aria-hidden="true" /> NullPointerException</span></figcaption>
        <div className="phone-frame">
          <div className="phone-bar"><span>9:41</span><span>● ● ●</span></div>
          <div className="phone-title">تسجيل الدخول</div>
          <label>البريد الإلكتروني <span className="fake-input">null</span></label>
          <div className="crash-dialog"><CircleAlert aria-hidden="true" /><strong>التطبيق وقف فجأة</strong><code>java.lang.NullPointerException</code><span>التحقق من null ناقص</span></div>
          <div className="phone-button">إغلاق التطبيق</div>
        </div>
        <p className="diagram-caption">فحص قيمة null يكشف المسار اللي ممكن يوقع التطبيق بدل ما يرفض الإدخال بهدوء.</p>
      </figure>
    );
  }

  if (kind === "gray-box") {
    return (
      <figure className="diagram diagram-api">
        <figcaption><span className="diagram-label">فحص عقد تسجيل الدخول</span><span className="diagram-state is-failing"><CircleAlert aria-hidden="true" /> الاستجابة ناقصة</span></figcaption>
        <div className="api-flow">
          <div className="api-node"><span>01 · طلب</span><strong>POST /v1/auth/login</strong><small>بريد وكلمة مرور تجريبية</small></div>
          <ArrowLeft className="flow-arrow" aria-hidden="true" />
          <div className="api-node response-node"><span>02 · رد السيرفر</span><strong>200 OK</strong><small>token: null</small></div>
          <ArrowLeft className="flow-arrow" aria-hidden="true" />
          <div className="api-node assertion-node"><span>03 · فحص العقد</span><strong>يفشل</strong><small>التوكن مطلوب</small></div>
        </div>
        <p className="diagram-caption">كود النجاح لوحده مش كفاية؛ الفاحص بيتأكد كمان إن البيانات المتوقعة موجودة.</p>
      </figure>
    );
  }

  return (
    <figure className="diagram diagram-maintenance">
      <figcaption><span className="diagram-label">مراقبة بوابة الدفع بعد الإطلاق</span><span className="diagram-state is-failing"><CircleAlert aria-hidden="true" /> إنذار صيانة</span></figcaption>
      <div className="health-summary"><div><span>حالة السيرفر</span><strong className="healthy-value">UP</strong></div><div><span>زمن الاستجابة</span><strong className="slow-value">أعلى من 1500ms</strong></div><div><span>فحص الشهادة</span><strong className="failed-value">محتاج مراجعة</strong></div></div>
      <div className="incident-ticket"><span className="ticket-tag">بلاغ إنتاج</span><strong>بوابة الدفع بتعمل Timeout</strong><p>الاختبار الدوري يلاحظ البطء أو فشل الخدمة قبل ما المشكلة تكبر.</p></div>
      <p className="diagram-caption">مثال بصري توضيحي؛ بيانات القياس الحقيقية بتطلع من خدمة المراقبة.</p>
    </figure>
  );
}

function PrintBook() {
  return (
    <div className="print-document" aria-hidden="true">
      <header className="print-cover">
        <p className="print-brand">دفتر الفحص <span>·</span> كتاب مذاكرة</p>
        <span className="print-chapter-number">01</span>
        <h1>أهمية فحص البرمجيات</h1>
        <p className="print-english-title">The Importance of Software Testing</p>
        <p className="print-source">{chapterSource.title}<br />{chapterSource.author}</p>
        <div className="print-method-list">
          {learningSteps.map((step) => <span key={step.id}><b>{step.number}</b>{step.label}</span>)}
        </div>
      </header>
      {chapterSections.map((lesson, index) => (
        <article className={`print-lesson ${index === 0 ? "first-print-lesson" : ""}`} key={lesson.id}>
          <header className="print-lesson-heading"><span>الموضوع {lesson.number} من 04</span><h2>{lesson.title}</h2><p>{lesson.deck}</p></header>
          <LessonMaterial lesson={lesson} />
        </article>
      ))}
      <footer className="print-closing">
        <ShieldCheck aria-hidden="true" />
        <div><strong>مراجعة الفصل الأول</strong><span>النصوص والشرح مبنيين على المادة المرفوعة · دفتر الفحص</span></div>
      </footer>
    </div>
  );
}
