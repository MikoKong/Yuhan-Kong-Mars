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

const messageForm = document.forms.leave_message;
messageForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = event.target.usersName.value;
    const email = event.target.usersEmail.value;
    const message = event.target.usersMessage.value;

    console.log(name, email, message);

    const messageSection = document.querySelector("#messages");
    const messageList = messageSection.querySelector("ul");

    const newMessage = document.createElement("li");
    newMessage.innerHTML = `
        <a href="mailto:${email}">${name}</a> 
        <span>${message}</span>`;
    
    const removeButton = document.createElement("button");
    removeButton.innerHTML = "remove";
    removeButton.type = "button";
    removeButton.addEventListener("click", (event) => {
        const entry = event.target.parentNode;
        entry.remove();
    });

    newMessage.appendChild(removeButton);
    messageList.appendChild(newMessage);
    event.target.reset();
});

fetch("https://api.github.com/users/MikoKong/repos")
    .then(response => {
        if(!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    })
    .then(repositories => {
        console.log(repositories);

        const projectSection = document.querySelector("#Projects");
        const projectList = projectSection.querySelector("ul");

        for(let i = 0; i < repositories.length; i++) {
            const project = document.createElement("li");
            project.innerText = repositories[i].name;
            projectList.appendChild(project);
        }

    })
    .catch(error => {
        console.error(error);
    });