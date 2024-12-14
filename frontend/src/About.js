import React from "react";
import "./About.css"; 

const About = () => {
  return (
    <div className="about-container">
      <h3 className="about-header">About the Creators</h3>
      <div className="about-content">
        <p className="intro">
          Hi! Welcome to our movie management system built for COMS/SE 3190 at Iowa State University.
          Hope you have a great experience using the website.
        </p>

        <div className="course-info">
          <h4>Course Information</h4>
          <ul>
            <li><strong>Name of course:</strong> COMS/SE 3190 Fall 2024</li>
            <li><strong>Professor:</strong> Dr. Abraham N. Aldaco Gastelum</li>
            <li><strong>Professor email:</strong> <a href="mailto:aaldaco@iastate.edu"> aaldaco@iastate.edu</a></li>
            <li><strong>Date created:</strong> 12/12/2024</li>
          </ul>
        </div>

        <div className="students-info">
          <h4>Students:</h4>
          <ul>
            <li><strong>Student 1:</strong> Raghav Kaashyap</li>
            <li><strong>Student 1 email:</strong><a href="mailto:raghavk@iastate.edu"> raghavk@iastate.edu</a></li>
            <li><strong>Student 2:</strong> Caleb Iddings</li>
            <li><strong>Student 2 email:</strong> <a href="mailto:ciddings@iastate.edu"> ciddings@iastate.edu</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;