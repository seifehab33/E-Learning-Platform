import InfoPageLayout from "./InfoPageLayout";

function AboutUs() {
  return (
    <InfoPageLayout
      breadcrumbText="About Us"
      title="About Dreams LMS"
      intro="Dreams LMS is designed to make online learning feel structured, modern, and approachable. We focus on creating a learning experience where students can explore courses, follow instructors, and track their progress in a clean environment that feels both practical and inspiring."
      highlights={[
        "Built to help learners discover high-quality courses with less friction.",
        "Designed with a balanced interface that keeps content readable and engaging.",
        "Structured so students can move from discovery to enrollment with confidence.",
        "Created as a modern education platform demo with scalable product thinking.",
      ]}
      sections={[
        {
          title: "Our Mission",
          content: [
            "Our goal is to make digital learning experiences feel clear and motivating. We want students to spend less time figuring out the platform and more time focusing on what they want to learn.",
            "Every page in Dreams LMS is designed to support that mission through thoughtful layout, strong visual hierarchy, and an interface that keeps the learner journey easy to understand.",
          ],
        },
        {
          title: "What We Value",
          content: [
            "We care about usability, consistency, and trust. That means clear navigation, course information that is easy to scan, and interaction patterns that feel familiar from page to page.",
            "We also value growth. The platform is built to communicate progress and momentum, helping learners feel encouraged as they explore new skills and complete courses.",
          ],
        },
        {
          title: "Who This Platform Is For",
          content: [
            "Dreams LMS is for learners who want a focused online education experience, whether they are exploring technology, design, development, or creative skills.",
            "It is also designed to showcase how an education product can combine frontend design, API-driven content, and user-centered UX in one cohesive experience.",
          ],
        },
      ]}
    />
  );
}

export default AboutUs;
