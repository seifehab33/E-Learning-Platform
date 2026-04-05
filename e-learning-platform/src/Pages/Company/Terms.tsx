import InfoPageLayout from "./InfoPageLayout";

function Terms() {
  return (
    <InfoPageLayout
      breadcrumbText="Terms & Conditions"
      title="Terms & Conditions"
      intro="These terms outline the expected use of the platform experience. They are written in a clear and approachable way to match the product style while still giving structure to how the service should be used."
      highlights={[
        "Users are expected to use the platform respectfully and responsibly.",
        "Course content and platform materials are intended for personal learning use.",
        "Demo functionality may change as the product evolves.",
        "Platform access and features can be updated to improve quality and performance.",
      ]}
      sections={[
        {
          title: "Use of the Platform",
          content: [
            "Users may browse courses, create demo accounts, and interact with the learning interface for personal educational use. Activity that harms the platform, misuses access, or disrupts the experience is not permitted.",
            "We reserve the right to improve, update, or reorganize platform features when needed to maintain a better learning experience.",
          ],
        },
        {
          title: "Content and Learning Materials",
          content: [
            "Course listings, descriptions, and related media are provided to support the educational experience and demonstrate how the product works. Content should not be copied, redistributed, or republished without permission where ownership applies.",
            "As the platform grows, course details and available experiences may be refined to improve quality, structure, and learner outcomes.",
          ],
        },
        {
          title: "Service Expectations",
          content: [
            "We aim to provide a smooth, reliable experience, but platform availability, features, and content can change over time. Demo environments may also include limited or simplified backend behavior.",
            "Continued use of the platform means accepting the current version of these terms and any future updates made to support the service more effectively.",
          ],
        },
      ]}
    />
  );
}

export default Terms;
