import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import EmailIcon from '@mui/icons-material/Email';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import "../css/about-me.css"
import SideBar from "./SideBar";

export default function AboutMe() {
    const letters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()_+-=[]{};':\",./<>?`~";
    const [name, setName] = useState<string>("");

    useEffect(() => {
        textLoad(10, "ETHAN KRUG", setName);
    }, []);

    const textLoad = (speed: number = 10, original: string = "ETHAN KRUG", setText: React.Dispatch<React.SetStateAction<string>>): void => {
        let finalName = "";
        let iterations = 0;

        const interval = setInterval(() => {
            let newLetter = letters[Math.floor(Math.random() * letters.length)];

            if (iterations % 10 === 0) {
                finalName += original.charAt(iterations / 10)
                setText(finalName);
            } else {
                setText(finalName + newLetter);
            }

            if (finalName === original) {
                clearInterval(interval);
            }

            iterations++;
        }, speed)
    }

    const nameHover = (): void => {
        let iterations = 0;
        const original = "ETHAN KRUG"

        const interval = setInterval(() => {
            let newText = name.split("")
                .map((_, index) => {
                    if (index < iterations || (original[index] === " " && window.innerWidth <= 496)) {
                        return original[index];
                    }

                    return letters[Math.floor(Math.random() * letters.length)]
                })
                .join("");

            setName(newText);

            if (iterations > original.length - 1) {
                clearInterval(interval);
            }

            iterations += ((1 + Math.sqrt(5)) / 2) - 1;
        }, 30);
    }

    return (
        <Grid container>
            <Grid item container className="about-me-header" direction="row">
                <Grid item xs> 
                    <SideBar blur={false} top={60} left={20}/>
                </Grid>
                <Grid item xs={8}>
                    <h1
                        className="about-me-name"
                        children={name}
                        onMouseEnter={() => {
                            if (name === "ETHAN KRUG") {
                                nameHover();
                            }
                        }}
                    />
                </Grid>
            </Grid>
            <Grid item container className="about-me-intro">
                <span>
                    Hello, I'm a computer scientist with a passion for building
                    clean and efficient software solutions. I have a Bachelor of
                    Science in Computer Science from Central Washington University
                    and a couple years of experience in the field,
                    working on projects mainly relating to web development
                    and data science.<br /><br />

                    Currently, I am not looking for employment. However, my expertise includes
                    proficiency in a variety of programming languages,
                    database technologies, and development frameworks.<br /><br />

                    I enjoy working in a challenging environment where I can openly
                    collaborate with other engineers to solve complex problems
                    and create software that delivers value to end-users. I am
                    committed to staying up-to-date with the latest industry trends
                    and technologies to ensure that the software I develop is always
                    cutting-edge and meets the highest standards of quality.<br /><br />

                    I am open to working on projects outside of my job. If you think
                    my abilities would be of use, feel free to contact me, as I would
                    love to delve in to a new project.<br /><br />
                </span>
            </Grid>
            <Grid item container className="about-me-skills">
                <h2 className="about-me-skills-header">Skills</h2>
                <span>
                    In regards to my language skills, I am proficient in Python,
                    Java, and JavaScript/TypeScript, C#, and SQL. I have experience using
                    C/C++, Google App Scripts, MATLAB, R, and Shell,
                    however I do not consider myself proficient in these languages.
                    Despite that, having used them previously, I would be able to
                    quickly pick them up again, if the need arose.<br /><br />
                </span>
            </Grid>
            <Grid item container className="about-me-react">
                <h3 className="about-me-react-header">Journey with React</h3>
                <span>
                    Other than languages, I have a few years of experience with React.<br /><br />

                    In 2019, I started using React when my friend asked if I wanted
                    to learn at the time. I didn't do much with it then since I was
                    in my freshman year of college and I had a lot going on class-wise.<br /><br />

                    Come late 2019, I picked React back up when I was invited to
                    work with a team creating an app using the React Native framework.
                    After a few months of development, in early 2020, the project
                    released an app called KiwiLink, which is a study-buddy
                    app specifically for University of Washington (UW) students. The
                    app was released on the Google Play Store and Apple App Store,
                    however, it is no longer maintained.<br /><br />

                    This is the time that COVID-19 started. I was in Seattle at the
                    time and my family lived on the East side of Washington, over
                    the Cascade Mountains that separated us. When the pandemic
                    started, I moved back home to be closer to family in case I
                    caught COVID. This also led to my transferring to
                    Central Washington University starting fall of 2020.<br /><br />

                    During this transition period for me, I felt stuck, being confined
                    to my house due to the lockdowns, and the fear of getting COVID.
                    It wasn't until early 2021 that I picked up React again.
                    I had a class that was a software development class, specifically
                    focused on the practical application of the Agile development method.
                    For this class, I was part of a team that created a Google Maps-like
                    React application for hiking trails in Washington State. This was
                    where I found enjoyment and a greater interest in React.<br /><br />

                    In the summer of 2021, I was reached out to, to see if I wanted
                    to remake a website for an organization called
                    Academics Are Cool. The main purpose of the organization
                    was in facilitating math competitions within Washington State
                    for elementary to high school students. I learned a lot while
                    creating this website; more in-depth knowledge of React,
                    database management, content management systems, user experience,
                    web design, site security, user testing,
                    client-contractor relations, and much more. I worked on this
                    website for the entire summer, where I finished most of the
                    website, with the exception of the administrator pages.<br /><br />

                    I started my senior year at Central Washington University and 
                    continued to work on the website when I had time: in between 
                    classes after I was done with labs or assignments. I wouldn't 
                    completely finish the website until the summer of 2022, where it 
                    remained undeployed.<br /><br />

                    Looking back at the code I wrote, and my development methods,
                    I would say it is not my best work, however, I learned a lot. 
                    When I started the project I was essentially a beginner with React, 
                    and didn't know design paradigms in React, or virtually anything 
                    about web development. The only recent applicable experience I had 
                    was from the hiking website project from earlier in 2021. This also
                    showed me how the need to stay updated with technologies is
                    important. The experience I had with React Native, was minimally
                    applicable due to the changes in React during the period of time
                    I wasn't actively using it.<br /><br />

                    Aside from the website for Academics Are Cool, in early 2022
                    I was part of a team that created a web application using
                    React that generated playlists based on user data (liked songs,
                    user playlists, etc.), and displayed user statistics like
                    most listened to artists, songs, genres, etc. I was able to
                    apply my experience with React here, however, the project taught
                    me a lesson in working with a team of varying skill levels. A few
                    people on the team were experienced with React or web development,
                    however, there were a number who weren't. The challenge came when
                    having to follow the Agile method, where around half the group
                    wasn't able to actively contribute to the project until at least
                    the second sprint. It meant we had to do more work in the later
                    sprints to make up for the lost amount of production in the
                    earlier sprints.<br /><br />

                    To add to that experience, a difference in coding style was
                    a hurdle. We didn't have a style guide to follow, so everyone
                    programmed in their own style, which made code readability
                    difficult at times, and slowed down production.<br /><br />

                    All in all, I think React is a framework that I feel strongly
                    for and my journey with it showcases my experience with working
                    with others and by myself, my ability to learn new
                    technologies and concepts, as well as my understanding of
                    software development.<br /><br />
                </span>
            </Grid>
            <Grid item container className="about-me-info" direction="column">
                <h2 className="about-me-info-header">Personal Information</h2>
                <span>
                    You can find my resume, GitHub, and contact information bellow.
                    I will respond to messages to my email quicker and more often
                    than to LinkedIn if you need to urgently contact me.<br /><br />

                    If you want to know more about me as a person, I think
                    my <Link to="/blog">Blog</Link> does
                    a better job capturing my voice and personality than I could
                    convey here. <br/><br/> 
                </span>
            </Grid>
            <Grid item container className="about-me-links" direction="column">
                <h2 className="about-me-links-header">Links</h2>
                <div className="about-me-links-container">
                    <Button href="resources/Resume.pdf" target="_blank" rel="noreferrer" startIcon={<FileDownloadIcon />}>Resume</Button>
                    <Button href="https://github.com/GurkNathe/" target="_blank" rel="noreferrer" startIcon={<GitHubIcon />}>Github</Button>
                    <Button href="https://www.linkedin.com/in/ethan-krug-5a3088171" target="_blank" rel="noreferrer" startIcon={<LinkedInIcon />}>LinkedIn</Button>
                    <Button href="mailto:ethan.c.krug@gmail.com" target="_blank" rel="noreferrer" startIcon={<EmailIcon />}>Email</Button>
                </div>
            </Grid>
        </Grid>
    )
}