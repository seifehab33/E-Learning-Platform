import PageHeader from "../../components/BreadCrumbHeader/BreadCrumbHeader";

interface Section {
  title: string;
  content: string[];
}

interface InfoPageLayoutProps {
  breadcrumbText: string;
  title: string;
  intro: string;
  highlights: string[];
  sections: Section[];
}

function InfoPageLayout({
  breadcrumbText,
  title,
  intro,
  highlights,
  sections,
}: InfoPageLayoutProps) {
  return (
    <div className="text-[var(--text-color)]">
      <PageHeader text={breadcrumbText} title={title} />

      <section className="max-w-[1280px] mx-auto px-5 py-16">
        <div className="grid gap-8 lg:grid-cols-[1.35fr_0.85fr]">
          <div className="bg-[var(--nav-color)] border border-gray-800 rounded-2xl p-8 shadow-lg shadow-black/20">
            <span className="inline-flex items-center rounded-full bg-[var(--main-color)] px-4 py-1 text-sm font-semibold text-[var(--peach-color)]">
              Dreams LMS
            </span>
            <h1 className="mt-5 text-3xl lg:text-4xl font-bold leading-tight">
              {title}
            </h1>
            <p className="mt-5 text-base leading-8 text-gray-300">{intro}</p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-gray-700 bg-[var(--main-color)] p-5"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[var(--peach-color)]" />
                    <p className="text-sm leading-7 text-gray-200">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="bg-[var(--nav-color)] border border-gray-800 rounded-2xl p-8 shadow-lg shadow-black/20">
            <h2 className="text-2xl font-bold">Quick Notes</h2>
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl bg-[var(--main-color)] p-5 border border-gray-700">
                <p className="text-sm uppercase tracking-[0.2em] text-[var(--peach-color)]">
                  Clear
                </p>
                <p className="mt-2 text-sm leading-7 text-gray-300">
                  Each page is written in simple language so learners can
                  understand how the platform works before they sign up.
                </p>
              </div>
              <div className="rounded-2xl bg-[var(--main-color)] p-5 border border-gray-700">
                <p className="text-sm uppercase tracking-[0.2em] text-[var(--peach-color)]">
                  Consistent
                </p>
                <p className="mt-2 text-sm leading-7 text-gray-300">
                  These sections follow the same visual rhythm, spacing, and
                  color palette used across the current product.
                </p>
              </div>
              <div className="rounded-2xl bg-[var(--main-color)] p-5 border border-gray-700">
                <p className="text-sm uppercase tracking-[0.2em] text-[var(--peach-color)]">
                  Friendly
                </p>
                <p className="mt-2 text-sm leading-7 text-gray-300">
                  The content is structured to feel reassuring and readable, not
                  overly legal or visually heavy.
                </p>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-10 grid gap-6">
          {sections.map((section) => (
            <article
              key={section.title}
              className="rounded-2xl border border-gray-800 bg-[var(--nav-color)] p-8 shadow-lg shadow-black/10"
            >
              <h2 className="text-2xl font-bold">{section.title}</h2>
              <div className="mt-5 space-y-4 text-gray-300">
                {section.content.map((paragraph) => (
                  <p key={paragraph} className="leading-8">
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default InfoPageLayout;
