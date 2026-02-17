const body = document.querySelector("body");
const footer = document.createElement("footer");

body.appendChild(footer);

const tody = new Date();
const thisYear = tody.getFullYear();

const copyright = document.createElement("p");
copyright.innerHTML = `© Yuhan Kong ${thisYear}`
footer.appendChild(copyright);

const skills = [
    "JavaScript",
    "HTML",
    "CSS",
    "Python"];
const skillsSection = document.querySelector("#skills");
const skillsList = skillsSection.querySelector("ul");
for (let i = 0; i < skills.length; i++) {
    const skill = document.createElement("li");
    skill.innerText = skills[i];
    skillsList.appendChild(skill);
}