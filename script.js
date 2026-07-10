let skills =
JSON.parse(localStorage.getItem("skills"))
|| [];

function saveSkills(){
    localStorage.setItem(
        "skills",
        JSON.stringify(skills)
    );
}

function updateDashboard(){

    const total = skills.length;

    const completed =
        skills.filter(
            skill => skill.completed
        ).length;

    document.getElementById("total")
        .textContent = total;

    document.getElementById("completed")
        .textContent = completed;

    document.getElementById("remaining")
        .textContent =
        total - completed;

    let progress =
        total === 0
        ? 0
        : (completed / total) * 100;

    document.getElementById(
        "progressBar"
    ).style.width =
        progress + "%";

    document.getElementById(
        "progressText"
    ).textContent =
        Math.round(progress)
        + "% Completed";
}

function renderSkills(){

    const skillList =
        document.getElementById(
            "skillList"
        );

    skillList.innerHTML = "";

    skills.forEach(skill => {

        const div =
            document.createElement("div");

        div.classList.add("skill");

        if(skill.completed){
            div.classList.add(
                "completed"
            );
        }

        div.innerHTML = `
            <h3>${skill.name}</h3>

            <p>
                Category:
                ${skill.category}
            </p>

            <button
                onclick="toggleSkill(${skill.id})">
                ${skill.completed
                ? "Undo"
                : "Complete"}
            </button>

            <button
                onclick="deleteSkill(${skill.id})">
                Delete
            </button>
        `;

        skillList.appendChild(div);
    });

    updateDashboard();
    saveSkills();
}

function addSkill(){

    const skillInput =
        document.getElementById(
            "skillInput"
        );

    const category =
        document.getElementById(
            "category"
        );

    if(
        skillInput.value.trim()
        === ""
    ) return;

    skills.push({
        id: Date.now(),
        name: skillInput.value,
        category: category.value,
        completed: false
    });

    skillInput.value = "";

    renderSkills();
}

function toggleSkill(id){

    const skill =
        skills.find(
            skill => skill.id === id
        );

    skill.completed =
        !skill.completed;

    renderSkills();
}

function deleteSkill(id){

    skills =
        skills.filter(
            skill => skill.id !== id
        );

    renderSkills();
}

renderSkills();