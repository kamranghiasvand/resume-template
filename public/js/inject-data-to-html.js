data = data;

function load_data() {
    document.getElementById("photo-holder").setAttribute("src", data.photo_path);
    set_person_info();
    set_education();
    set_langs();
    set_summary();
}

function set_person_info() {
    let info = data.person_info;
    document.getElementById("person-name").innerText = info.first_name + " " + info.last_name;

    let telephone = document.getElementById("telephone");
    telephone.setAttribute("href", "tel:" + info.tel.value);
    document.getElementById("telephone").textContent = info.tel.showing_text;

    let email= document
        .getElementById("email");
        email.setAttribute("href", "mailto:" + info.email.value);
    document.getElementById("email").textContent = info.email.showing_text;

    document.getElementById("linkedin").setAttribute("href", info.linkedin.value);
    document.getElementById("linkedin").textContent = info.linkedin.showing_text;

    document.getElementById("skype").setAttribute("href", info.skype.value);
    document.getElementById("skype").textContent = info.skype.showing_text;
}

function set_education() {
    const education_body = document.querySelector(".education .section-body");
    for (let i in data.education) {
        const item = data.education[i];
        education_body.appendChild(create_education_element(item));
    }
}

function create_education_element(data) {
    const item = document.createElement("div");
    item.className = "section-item";

    const item_title = document.createElement("div");
    item_title.className = "item-title";
    item_title.innerText = data.title;
    item.appendChild(item_title);

    const item_body = document.createElement("div");
    item_body.className = "item-body";
    item_body.innerText = data.school + " | " + data.end_year;
    item.appendChild(item_body);

    return item;
}

function set_langs() {
    const language_body = document.querySelector(".language .section-body");
    for (let i in data.langs) {
        const lang = data.langs[i];
        language_body.appendChild(create_language_el(lang.name, lang.expertise));
    }
}

function create_language_el(name, expertise) {
    const item = document.createElement("div");
    item.className = "section-item";

    const title = document.createElement("div");
    title.className = "item-title";
    title.innerText = name;
    item.appendChild(title);

    const progress = document.createElement("progress");
    progress.max = 100;
    progress.value = expertise;
    item.appendChild(progress);

    return item;
}

function set_summary() {
    const summary_body = document.querySelector(".summary .section-body");
    const paragraph = document.createElement("p");
    paragraph.innerText = data.summary;
    summary_body.appendChild(paragraph);
}

load_data();
