import Button from "../Button/Button";

interface ResuableHeadProps {
  title: string;
  subtitle: string;
  description: string;
  buttonText?: string;
}
function ResuableHead({
  title,
  subtitle,
  description,
  buttonText,
}: ResuableHeadProps) {
  return (
    <>
      <div className="flex items-center justify-between w-full flex-col lg:flex-row my-5">
        <div className="left-side flex-1 gap-3 flex flex-col mb-20">
          <h1 className="text-xl text-[var(--peach-color)] font-bold">
            {title}
          </h1>
          <h1 className="text-4xl text-[var(--text-color)] font-bold">
            {subtitle}
          </h1>
          <p className="text-[var(--text-color)] max-w-3xl text-justify">
            {description}
          </p>
        </div>
        {buttonText && (
          <div className="right-side">
            <Button buttonText={buttonText} />
          </div>
        )}
      </div>
    </>
  );
}

export default ResuableHead;
