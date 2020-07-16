data = data;

function load_data() {
    document.getElementById('photo-holder').setAttribute('src', data.photo_path);
    set_person_info();
    set_education();

}

function set_person_info() {
    info = data.person_info;
    document.getElementById('person_name').innerText = info.name;

    document.getElementById('telephone').setAttribute('href', 'tel:' + info.tel.value);
    document.getElementById('telephone').textContent = info.tel.showing_text;

    document.getElementById('email').setAttribute('href', 'mailto:' + info.email.value);
    document.getElementById('email').textContent = info.email.showing_text;

    document.getElementById('linkedin').setAttribute('href', info.linkedin.value);
    document.getElementById('linkedin').textContent = info.linkedin.showing_text;

    document.getElementById('skype').setAttribute('href', info.skype.value);
    document.getElementById('skype').textContent = info.skype.showing_text;
}

function set_education() {
    education_body = document.querySelector('.education .section-body');
    for (var i in data.education) {
        var item=data.education[i];
        education_body.appendChild(create_education_element(item.title,item.body));
    }
}

function create_education_element(title, body) {
    var item = document.createElement('div');
    item.className='section-item';

    var item_title = document.createElement('div');
    item_title.className='item-title';
    item_title.innerText = title;
    item.appendChild(item_title);

    var item_body = document.createElement('div');
    item_body.className='item-body';
    item_body.innerText = body;
    item.appendChild(item_body);

    return item;
}


load_data();