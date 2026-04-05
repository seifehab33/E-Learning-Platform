import InfoPageLayout from "./InfoPageLayout";

function Privacy() {
  return (
    <InfoPageLayout
      breadcrumbText="Privacy"
      title="Privacy Policy"
      intro="We respect the importance of privacy and transparency. This page explains, in a simple way, what information may be used inside the platform demo and how that information supports the user experience."
      highlights={[
        "We aim to collect only the information needed to support the learning flow.",
        "Demo user data is handled locally for product demonstration purposes.",
        "We prioritize clarity so users can understand how their information is used.",
        "This policy can evolve as platform functionality becomes more advanced.",
      ]}
      sections={[
        {
          title: "Information We Use",
          content: [
            "In the current platform experience, basic account information such as name, email, and selected course activity may be used to support sign-in, cart behavior, and dashboard progress.",
            "For demo functionality, some of this information may be stored locally in the browser to preserve the user journey between pages and refreshes.",
          ],
        },
        {
          title: "How Information Supports the Experience",
          content: [
            "We use account and course-related information to personalize the interface, show purchased or enrolled courses, and improve continuity across the learning journey.",
            "This helps the platform display relevant content such as dashboard progress, cart details, and recently accessed learning material.",
          ],
        },
        {
          title: "Your Control",
          content: [
            "Users should always be able to understand what information is being used and why. In a production-ready version of the platform, we would continue improving transparency, retention rules, and user controls.",
            "If this project evolves into a live product, privacy practices would be expanded to include stronger data controls, security handling, and account management options.",
          ],
        },
      ]}
    />
  );
}

export default Privacy;
