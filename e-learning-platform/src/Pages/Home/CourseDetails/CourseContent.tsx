import {
  Collapse,
  Button,
  Card,
  Typography,
  CardBody,
} from "@material-tailwind/react";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { AiOutlinePlayCircle } from "react-icons/ai";

function CourseContent() {
  const [open, setOpen] = useState<number | null>(null);

  const toggleOpen = (section: number) =>
    setOpen((current) => (current === section ? null : section));

  const sections = [
    {
      id: 1,
      title: "Introduction to User Experience",
      lectures: [
        "Lecture1.1 Introduction to the User Experience Course",
        "Lecture1.2 Exercise: Your first design challenge",
        "Lecture1.3 How to solve the previous exercise",
        "Lecture1.4 How to use text layers effectively",
        "Lecture1.5 Effective use of design principles",
      ],
    },
    {
      id: 2,
      title: "Advanced Design Principles",
      lectures: [
        "Lecture2.1 Understanding user needs",
        "Lecture2.2 Advanced use of text layers",
        "Lecture2.3 Using grids for consistent layouts",
        "Lecture2.4 How to use alignment effectively",
        "Lecture2.5 Design critique techniques",
      ],
    },
    {
      id: 3,
      title: "Prototyping and Testing",
      lectures: [
        "Lecture3.1 Basics of prototyping tools",
        "Lecture3.2 Exercise: Creating a prototype",
        "Lecture3.3 Testing your prototype",
        "Lecture3.4 Analyzing user feedback",
        "Lecture3.5 Iterating on designs",
      ],
    },
  ];

  return (
    <section className="course-content mx-auto max-w-[1280px] my-4">
      <div className="bg-[var(--nav-color)] px-3 py-4 max-w-3xl rounded-md text-[var(--text-color)] border-solid border border-gray-800 drop-shadow-lg shadow shadow-gray-900">
        <h1>Course Content</h1>
        <div className="collapsed-content flex flex-col gap-3">
          {sections.map((section) => (
            <div key={section.id}>
              <Button
                onClick={() => toggleOpen(section.id)}
                className="w-full flex bg-[#3a3b50] justify-between items-center"
                {...({} as React.ComponentProps<typeof Button>)}
              >
                <p>{section.title}</p>
                <FaAngleDown size={20} />
              </Button>
              <Collapse open={open === section.id}>
                <Card
                  className="my-2 bg-transparent text-gray-400"
                  {...({} as React.ComponentProps<typeof Card>)}
                >
                  <CardBody
                    className="p-2 flex flex-col gap-2 bg-transparent"
                    {...({} as React.ComponentProps<typeof CardBody>)}
                  >
                    {section.lectures.map((lecture, index) => (
                      <div key={index}>
                        <Typography
                          as="div"
                          className="py-3 px-0 flex items-center gap-2 text-sm justify-between"
                          {...({} as React.ComponentProps<typeof Typography>)}
                        >
                          <div className="flex items-center gap-2">
                            <AiOutlinePlayCircle
                              size={20}
                              className="text-[var(--yellow-color)]"
                            />
                            {lecture}
                          </div>
                          <div className="flex gap-4">
                            <h1 className="underline">Preview</h1>
                            <p className="text-black font-bold">2:40</p>
                          </div>
                        </Typography>
                        <hr />
                      </div>
                    ))}
                  </CardBody>
                </Card>
              </Collapse>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CourseContent;
