import React from "react";
import styles from "./instructor.module.scss";
import InstructorItem from "./InstructorItem";
import team1 from "assets/instructor/team-1.jpg";
import team2 from "assets/instructor/team-2.jpg";
import team3 from "assets/instructor/team-3.jpg";
import team4 from "assets/instructor/team-4.jpg";

const mapInstructor = [
  {
    id: 1,
    name: "Leigh Jaynie May",
    imgSrc: team1,
    description: "Expert Front-end Developer",
  },

  {
    id: 2,
    name: "Darby Sharron Stacey",
    imgSrc: team2,
    description: "Expert Web Design",
  },

  {
    id: 3,
    name: "Tatum Janna Shine",
    imgSrc: team3,
    description: "Expert Back-end Developer",
  },

  {
    id: 4,
    name: "Trix Lilah Quickley",
    imgSrc: team4,
    description: "Professional Algorithm",
  },
];

function Instructor() {
  return (
    <section className={`${styles.instructor}`}>
      <section className="container mx-auto">
        <div className="grid grid-cols-12 gap-4">
          {mapInstructor.map(({ id, name, description, imgSrc }) => (
            <div key={id} className="lg:col-span-3 md:col-span-6 col-span-12">
              <InstructorItem
                name={name}
                imgSrc={imgSrc}
                description={description}
              />
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}

export default Instructor;
