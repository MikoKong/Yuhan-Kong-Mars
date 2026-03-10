const body = document.querySelector("body");
const footer = document.createElement("footer");
body.appendChild(footer);

const today = new Date();
const thisYear = today.getFullYear();

const copyright = document.createElement("p");
copyright.innerHTML = `© Yuhan Kong ${thisYear}`
footer.appendChild(copyright);

const skills = [
    "JavaScript",
    "HTML",
    "CSS",
    "Python"];
const skillsSection = document.querySelector("#Skills");
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
    removeButton.innerHTML = "Remove";
    removeButton.type = "button";
    removeButton.addEventListener("click", (event) => {
        const entry = event.target.parentNode;
        entry.remove();
    });

    const editButton = document.createElement("button");
    editButton.innerHTML = "Edit";
    editButton.type = "button";
    editButton.addEventListener("click", (event) => {
        const entry = event.target.parentNode;
        const messageSpan = entry.querySelector("span");

        if(messageSpan.isContentEditable) {
            messageSpan.contentEditable = "false";
            event.target.textContent = "Edit";
        } else {
            messageSpan.contentEditable = "true";
            messageSpan.focus();
            event.target.textContent = "Save";
        }
    });

    newMessage.appendChild(removeButton);
    newMessage.appendChild(editButton);
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
            const link = document.createElement("a");

            link.href = repositories[i].html_url;
            link.target = "_blank";
            link.textContent = repositories[i].name;

            project.appendChild(link);
            projectList.appendChild(project);
        }

    })
    .catch(error => {
        console.error(error);
    });