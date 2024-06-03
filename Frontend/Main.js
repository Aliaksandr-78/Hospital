function toggleMenu() {
    let menuOverlay = document.getElementById("menu-overlay")
    if (menuOverlay.style.left === "0px") {
        menuOverlay.style.left = "-200px"
    } else {
        menuOverlay.style.left = "0px"
    }
}

// Для открытия панели где кнопки Войти ...
function toggleAccountPanel() {
    let accountPanel = document.getElementById("account-panel")
    if (accountPanel.style.display === "block") {
        accountPanel.style.display = "none"
    } else {
        accountPanel.style.display = "block"
    }
    let loginButton = document.getElementById("loginButtonMain")
    let infoUser = document.getElementById("infoUser")
    let logoutButton = document.getElementById("logoutButton")
    const userId = localStorage.getItem('userId')
    if (userId) {
        loginButton.style.display = "none"
        infoUser.style.display = "block"
        logoutButton.style.display = "block"
    } else {
        loginButton.style.display = "block"
        infoUser.style.display = "none"
        logoutButton.style.display = "none"
    }
}

function openMain() {
    document.getElementById('maimMain').style.display = 'block'
    document.getElementById('doctorMain').style.display = 'none'
    document.getElementById('adminWindow').style.display = 'none'
    document.getElementById('doctorMainWindow').style.display = 'none'
    document.getElementById('userVisit').style.display = 'none'
    document.getElementById('userAccount').style.display = 'none'
}

function doctorMain() {
    document.getElementById('doctorMain').style.display = 'block'
    document.getElementById('maimMain').style.display = 'none'
    document.getElementById('adminWindow').style.display = 'none'
    document.getElementById('doctorMainWindow').style.display = 'none'
    document.getElementById('userAccount').style.display = 'none'
    document.getElementById('userVisit').style.display = 'none'
}

function adminMain() {
    document.getElementById('adminWindow').style.display = 'block'
    document.getElementById('maimMain').style.display = 'none'
    document.getElementById('doctorMain').style.display = 'none'
    document.getElementById('doctorMainWindow').style.display = 'none'
    document.getElementById('userAccount').style.display = 'none'
    document.getElementById('userVisit').style.display = 'none'
    document.getElementById('doctors').style.display = 'block'
}

function mainDoctor(){
    document.getElementById('doctorMainWindow').style.display = 'block'
    document.getElementById('adminWindow').style.display = 'none'
    document.getElementById('maimMain').style.display = 'none'
    document.getElementById('doctorMain').style.display = 'none'
    document.getElementById('userAccount').style.display = 'none'
    document.getElementById('userVisit').style.display = 'none'
}

//Окно регистрации
function openModal() {
    let accountPanel = document.getElementById("account-panel")
    accountPanel.style.display = "none"
    // Открываем модальное окно
    document.getElementById("myModal").style.display = "block"
}

function closeModal() {
    // Закрываем модальное окно
    document.getElementById("myModal").style.display = "none"
}

// Закрыть модальное окно
window.onclick = function (event) {
    if (event.target == document.getElementById("myModal")) {
        document.getElementById("myModal").style.display = "none"
    }
    if (event.target == document.getElementById("doctorCreate")) {
        document.getElementById("doctorCreate").style.display = "none"
    }
    if (event.target == document.getElementById("userModal")) {
        document.getElementById("userModal").style.display = "none"
    }
    if (event.target == document.getElementById('patientCreate')) {
        document.getElementById('patientCreate').style.display = "none"
    }
    if (event.target == document.getElementById("doctorChange")) {
        document.getElementById('doctorChange').style.display = 'none'
    }
    if (event.target == document.getElementById('specializationChange')) {
        document.getElementById('specializationChange').style.display = 'none'
    }
    if (event.target == document.getElementById('personalDov')){
        document.getElementById('personalDov').style.display = 'none'
    }
    if(event.target == document.getElementById('patientModalVisit')) {
        document.getElementById('patientModalVisit').style.display = 'none'
    }
    if(event.target == document.getElementById('visitInfo')) {
        document.getElementById('visitInfo').style.display = 'none'
    }
}
const signUpButton = document.getElementById('Up')
const signInButton = document.getElementById('In')
const container = document.getElementById('container-Sign')
signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active")
})
signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active")
})
// Конец окна регистрации

// Для регистрации обращения к серверу
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registrationForm')
    const registerButton = document.getElementById('registerButton')

    registerButton.addEventListener('click', async function (event) {
        event.preventDefault()

        const login = form.elements['login'].value
        const password = form.elements['password'].value
        const phoneNumber = form.elements['phoneNumber'].value
        const email = form.elements['email'].value

        // Проверка, что все поля заполнены
        if (!login || !password || !phoneNumber || !email) {
            alert('Пожалуйста, заполните все поля формы.')
            return
        }

        // Проверка формата email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailPattern.test(email)) {
            alert('Пожалуйста, введите корректный email.')
            return
        }

        // Проверка формата номера телефона (простая проверка на длину)
        if (phoneNumber.length !== 13 || phoneNumber.length !== 10) {
            alert('Пожалуйста, введите корректный номер телефона (10 или 13 цифр).')
            return
        }

        const userData = {
            login: login,
            user_password: password,
            phone_number: phoneNumber,
            email: email
        }

        const response = await fetch('/api/user-create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })

        if (response.ok) {
            alert('Пользователь успешно зарегистрирован')
        } else {
            console.error('Ошибка регистрации')
        }
        form.reset()
    })
})

// Для входа обращение к серверу
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm')
    const loginButton = document.getElementById('loginButton')

    loginButton.addEventListener('click', async function (event) {
        event.preventDefault()

        const email = document.getElementById('email').value
        const password = document.getElementById('password').value

        // Проверка, что email и пароль введены
        if (!email || !password) {
            alert('Пожалуйста, введите email и пароль.')
            return
        }

        const userData = {
            email: email,
            password: password
        }

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })

            if (response.ok) {
                const data = await response.json()
                localStorage.setItem('userId', data.userID)
                localStorage.setItem('isAdmin', data.isAdmin)
                localStorage.setItem('isDoctor', data.isDoctor)
                window.location.href = '/'
                alert("Вы вошли в аккаунт!")
                await updateUI()
                await checkIsDoctor()
            } else {
                console.error('Ошибка входа')
            }
        } catch (error) {
            console.error('Ошибка:', error)
        }
    })
})


// Для выхода из аккаунта
const logoutButton = document.getElementById('logoutButton')
logoutButton.addEventListener('click', function () {
    let accountPanel = document.getElementById("account-panel")
    accountPanel.style.display = "none"
    localStorage.removeItem('userId')
    localStorage.removeItem('isAdmin')
    localStorage.removeItem('isDoctor')
    window.location.href = '/'
    alert('Вы вышли из аккаунта')
})


//Для входа в Информаю об аккаунте
const infoUser = document.getElementById('infoUser')
const userAccount = document.getElementById('userAccount')
userAccount.style.display = "none"
infoUser.addEventListener('click', function () {
    document.getElementById("account-panel").style.display = "none"
    document.getElementById('adminWindow').style.display = 'none'
    document.getElementById('maimMain').style.display = 'none'
    document.getElementById('doctorMain').style.display = 'none'
    document.getElementById('doctorMainWindow').style.display = 'none'
    document.getElementById('userVisit').style.display = 'none'
    document.getElementById('userAccount').style.display = "block"
})


// Кнопки админа
document.addEventListener("DOMContentLoaded", function () {
    let doctorsButton = document.getElementById("doctor-Full")
    let usersButton = document.getElementById("users-Full")
    let specButton = document.getElementById("spec-Full")
    let regionButton = document.getElementById("region-Full")
    let doctorsContent = document.getElementById("doctors")
    let usersContent = document.getElementById("users")
    let specContent = document.getElementById("specializations")
    let regionsContent = document.getElementById("regions")

    doctorsButton.addEventListener("click", function () {
        doctorsContent.style.display = "block"
        usersContent.style.display = "none"
        specContent.style.display = "none"
        regionsContent.style.display = "none"
    })
    usersButton.addEventListener("click", function () {
        usersContent.style.display = "block"
        doctorsContent.style.display = "none"
        specContent.style.display = "none"
        regionsContent.style.display = "none"
    })
    specButton.addEventListener("click", function () {
        specContent.style.display = "block"
        usersContent.style.display = "none"
        doctorsContent.style.display = "none"
        regionsContent.style.display = "none"
    })
    regionButton.addEventListener("click", function () {
        regionsContent.style.display = "block"
        usersContent.style.display = "none"
        doctorsContent.style.display = "none"
        specContent.style.display = "none"
    })
})

async function openModalVisit(){
    document.getElementById('visitCreate').style.display = 'block'
    const id_user = localStorage.getItem('userId')
    try {
        const response = await fetch(`/api/doctor-user/${id_user}`)
        if (response.ok){
            const date = await response.json()
            const selectedPatientVisit = document.getElementById('selectedDoctorVisit')
            selectedPatientVisit.textContent = date.name + " " + date.surname
            document.getElementById('selectedDoctorId').value = date.id
        }
    }catch (error) {
        console.error('Ошибка при открытии окна создания пациента', error)
    }
}
function closeModalVisit() {
    document.getElementById('visitCreate').style.display = 'none'
}

//Окно добавления доктора
function openModalDoc() {
    document.getElementById("doctorCreate").style.display = "block"
}

function closeModalDoc() {
    // Закрываем модальное окно
    document.getElementById("doctorCreate").style.display = "none"
}

// Для показа списка докторов
async function updateDoctor() {
    try {

        const response = await fetch('/api/doctor-full')
        const doctors = await response.json()

        const listDoctor = document.getElementById('doctors-list')
        const listDoctor2 = document.getElementById('doctorMain-list')

        const table = document.createElement('table')
        const table2 = document.createElement('table')

        listDoctor.innerHTML = ''
        listDoctor2.innerHTML = ''
        table.innerHTML = ''
        table2.innerHTML = ''

        const thead2 = document.createElement('thead')
        const headerRow2 = document.createElement('tr')
        const specDoc2 = document.createElement('th')
        specDoc2.textContent = 'Специальность'
        headerRow2.appendChild(specDoc2)
        const nameHeader2 = document.createElement('th')
        nameHeader2.textContent = 'Имя'
        headerRow2.appendChild(nameHeader2)
        const surnameHeader2 = document.createElement('th')
        surnameHeader2.textContent = 'Фамилия'
        headerRow2.appendChild(surnameHeader2)
        const officeHeader2 = document.createElement('th')
        officeHeader2.textContent = 'Кабинет'
        headerRow2.appendChild(officeHeader2)
        const regionHeader2 = document.createElement('th')
        regionHeader2.textContent = 'Участок'
        headerRow2.appendChild(regionHeader2)
        thead2.appendChild(headerRow2)
        table2.appendChild(thead2)


        const thead = document.createElement('thead')
        const headerRow = document.createElement('tr')
        const idHeader = document.createElement('th')
        idHeader.textContent = 'ID'
        headerRow.appendChild(idHeader)
        const nameHeader = document.createElement('th')
        nameHeader.textContent = 'Имя'
        headerRow.appendChild(nameHeader)
        const surnameHeader = document.createElement('th')
        surnameHeader.textContent = 'Фамилия'
        headerRow.appendChild(surnameHeader)
        const officeHeader = document.createElement('th')
        officeHeader.textContent = 'Кабинет'
        headerRow.appendChild(officeHeader)
        const regionHeader = document.createElement('th')
        regionHeader.textContent = 'Участок'
        headerRow.appendChild(regionHeader)
        const specDoc = document.createElement('th')
        specDoc.textContent = 'Специальность'
        headerRow.appendChild(specDoc)
        const deleteHeader = document.createElement('th')
        deleteHeader.textContent = ''
        headerRow.appendChild(deleteHeader)
        const updateHeader = document.createElement('th')
        updateHeader.textContent = ''
        headerRow.appendChild(updateHeader)
        thead.appendChild(headerRow)
        table.appendChild(thead)

        const nameSpecial = await fetch('/api/specialization-full')
        const specialization = await nameSpecial.json()

        doctors.forEach(doctor => {
            const row2 = document.createElement('tr')
            const nameSpec2 = document.createElement('td')
            for (let i = 0; i < specialization.length; i++) {
                if (specialization[i].id === doctor.id_specialization) {
                    nameSpec2.textContent = specialization[i].name
                    break
                }
            }
            row2.appendChild(nameSpec2)
            const nameDoc2 = document.createElement('td')
            nameDoc2.textContent = doctor.name
            row2.appendChild(nameDoc2)
            const surnameDoc2 = document.createElement('td')
            surnameDoc2.textContent = doctor.surname
            row2.appendChild(surnameDoc2)
            const officeDoc2 = document.createElement('td')
            officeDoc2.textContent = doctor.office
            row2.appendChild(officeDoc2)
            const regDoc2 = document.createElement('td')
            regDoc2.textContent = doctor.region_number
            row2.appendChild(regDoc2)
            table2.appendChild(row2)


            const row = document.createElement('tr')
            const idDoc = document.createElement('td')
            idDoc.textContent = doctor.id
            row.appendChild(idDoc)
            const nameDoc = document.createElement('td')
            nameDoc.textContent = doctor.name
            row.appendChild(nameDoc)
            const surnameDoc = document.createElement('td')
            surnameDoc.textContent = doctor.surname
            row.appendChild(surnameDoc)
            const officeDoc = document.createElement('td')
            officeDoc.textContent = doctor.office
            row.appendChild(officeDoc)
            const regDoc = document.createElement('td')
            regDoc.textContent = doctor.region_number
            row.appendChild(regDoc)
            const nameSpec = document.createElement('td')
            for (let i = 0; i < specialization.length; i++) {
                if (specialization[i].id === doctor.id_specialization) {
                    nameSpec.textContent = specialization[i].name
                    break
                }
            }
            row.appendChild(nameSpec)
            const deleteButtonDoc = document.createElement('td')
            const deleteButton = document.createElement('button')
            deleteButton.textContent = 'Удалить'
            deleteButton.classList.add('delete-button')
            deleteButton.addEventListener('click', () => deleteDoc(doctor.id))
            deleteButtonDoc.appendChild(deleteButton)
            row.appendChild(deleteButtonDoc)
            const updateButtonDoc = document.createElement('td')
            const updateButton = document.createElement('button')
            updateButton.textContent = 'Изменить'
            updateButton.classList.add('delete-button')
            updateButton.addEventListener('click', () => openChangeDoc(doctor.id))
            updateButtonDoc.appendChild(updateButton)
            row.appendChild(updateButtonDoc)
            table.appendChild(row)
        })
        listDoctor.appendChild(table)
        listDoctor2.appendChild(table2)
    } catch (error) {
        console.error('Ошибка при обновлении списка специализаций:', error)
    }
}

async function deleteDoc(id) {
    try {
        const response = await fetch(`/api/doctor-delete/${id}`, {
            method: 'DELETE'
        })
        if (response.ok) {
            alert("Доктор удален")
            await updateDoctor()
        } else {
            throw new Error('Ошибка при удалении доктора')
        }
    } catch (error) {
        console.error('Ошибка при удалении доктора:', error)
    }
}

async function addDoctor() {
    const confirmation = confirm("Вы уверены, что хотите добавить этого доктора?");
    if (!confirmation) {
        return
    }
    const doctorName = document.getElementById('doctorName').value.trim()
    const doctorSurname = document.getElementById('doctorSurname').value.trim()
    const officeDoctor = document.getElementById('officeDoctor').value.trim()
    const userId = document.getElementById('selectedUserId').value.trim()
    const specializationId = document.getElementById('doctorSpecialization').value.trim()
    const regionNumber = document.getElementById('regionDoctor').value.trim()

    if (!doctorName || !doctorSurname || !officeDoctor || !userId || !specializationId || !regionNumber) {
        alert('Пожалуйста, заполните все поля')
        return
    }

    const requestBody = {
        name: doctorName,
        surname: doctorSurname,
        office: officeDoctor,
        userId: userId,
        specializationId: specializationId,
        regionNumber: regionNumber
    }

    try {
        const response = await fetch('/api/doctor-create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })

        if (response.ok) {
            alert('Доктор успешно добавлен!')
            document.getElementById('doctorName').value = ''
            document.getElementById('doctorSurname').value = ''
            document.getElementById('officeDoctor').value = ''
            document.getElementById('selectedUserId').value = ''
            document.getElementById('doctorSpecialization').value = ''
            document.getElementById('regionDoctor').value = ''
            await updateDoctor()
            document.getElementById("doctorCreate").style.display = "none"
        } else {
            throw new Error('Ошибка при добавлении доктора')
        }
    } catch (error) {
        console.error('Ошибка:', error)
    }
}

async function openChangeDoc(id) {
    const response = await fetch(`/api/doctor/${id}`)
    const doctorInfo = await response.json()

    const selectedUserChange = document.getElementById('selectedUserChange')
    selectedUserChange.textContent = doctorInfo.id_user
    document.getElementById('selectedUserIdChange').value = doctorInfo.id
    document.getElementById('doctorNameChange').value = doctorInfo.name
    document.getElementById('doctorSurnameChange').value = doctorInfo.surname
    document.getElementById('officeDoctorChange').value = doctorInfo.office
    document.getElementById('doctorSpecializationChange').value = doctorInfo.id_specialization
    document.getElementById('regionDoctorChange').value = doctorInfo.region_number

    document.getElementById('doctorChange').style.display = 'block'
}

function closeChangeDoc() {
    document.getElementById('doctorChange').style.display = 'none'
}

async function changeDoctor() {
    try {
        const confirmation = confirm("Вы уверены, что хотите изменить этого доктора?");
        if (!confirmation) {
            return
        }
        const doctorId = document.getElementById('selectedUserIdChange').value
        const doctorName = document.getElementById('doctorNameChange').value.trim()
        const doctorSurname = document.getElementById('doctorSurnameChange').value.trim()
        const officeDoctor = document.getElementById('officeDoctorChange').value.trim()
        const specializationId = document.getElementById('doctorSpecializationChange').value.trim()
        const regionNumber = document.getElementById('regionDoctorChange').value.trim()

        if (!doctorName || !doctorSurname || !officeDoctor || !specializationId || !regionNumber) {
            alert('Пожалуйста, заполните все поля')
            return
        }

        const requestBody = {
            id: doctorId,
            name: doctorName,
            surname: doctorSurname,
            office: officeDoctor,
            specializationId: specializationId,
            regionNumber: regionNumber
        }

        const response = await fetch('/api/doctor-change', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })

        if (response.ok) {
            alert('Доктор успешно изменен!')
            await updateDoctor()
            document.getElementById('doctorChange').style.display = 'none'
        } else {
            throw new Error('Ошибка при зменении доктора')
        }
    } catch (error) {
        console.error('Ошибка при изменнении доктора: ', error)
    }
}


// Для создания специальностей
document.getElementById("specializationForm").addEventListener("submit", async function (event) {
    event.preventDefault()

    const specializationInput = document.getElementById("specializationInput").value.trim()

    // Проверка, что поле специализации заполнено
    if (!specializationInput) {
        alert("Пожалуйста, введите название специальности.")
        return
    }

    const confirmation = confirm("Вы уверены, что хотите добавить этоту специальность?");
    if (!confirmation) {
        return
    }

    try {
        const response = await fetch("/api/specialization-create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name: specializationInput})
        })

        if (response.ok) {
            alert("Специальность успешно добавлена!")
            document.getElementById('specializationInput').value = ''
            await updateSpecializations()
        } else {
            throw new Error("Ошибка при добавлении специальности")
        }
    } catch (error) {
        console.error("Ошибка:", error)
    }
})

//Для показа специальностей
async function updateSpecializations() {
    try {
        const response = await fetch('/api/specialization-full')
        const specializations = await response.json()

        const selectElement = document.getElementById('doctorSpecialization')
        const selectChange = document.getElementById('doctorSpecializationChange')
        const listElement = document.getElementById('specializations-list')
        const table = document.createElement('table')


        selectElement.innerHTML = ''
        selectChange.innerHTML = ''
        listElement.innerHTML = ''

        const thead = document.createElement('thead')
        const headerRow = document.createElement('tr')
        const idHeader = document.createElement('th')
        idHeader.textContent = 'ID'
        headerRow.appendChild(idHeader)
        const nameHeader = document.createElement('th')
        nameHeader.textContent = 'Название'
        headerRow.appendChild(nameHeader)
        const deleteHeader = document.createElement('th')
        deleteHeader.textContent = ''
        headerRow.appendChild(deleteHeader)
        const changeHeader = document.createElement('th')
        changeHeader.textContent = ''
        headerRow.appendChild(changeHeader)
        thead.appendChild(headerRow)
        table.appendChild(thead)

        specializations.forEach(specialization => {
            const option = document.createElement('option')
            option.value = specialization.id
            option.textContent = specialization.name
            selectElement.appendChild(option)

            const change = document.createElement('option')
            change.value = specialization.id
            change.textContent = specialization.name
            selectChange.appendChild(change)


            const row = document.createElement('tr')
            const idCell = document.createElement('td')
            idCell.textContent = specialization.id
            row.appendChild(idCell)
            const nameCell = document.createElement('td')
            nameCell.textContent = specialization.name
            row.appendChild(nameCell)
            const deleteButtonCell = document.createElement('td')
            const deleteButton = document.createElement('button')
            deleteButton.textContent = 'Удалить'
            deleteButton.classList.add('delete-button')
            deleteButton.addEventListener('click', () => deleteSpecialization(specialization.id))
            deleteButtonCell.appendChild(deleteButton)
            row.appendChild(deleteButtonCell)
            const changeButtonCell = document.createElement('td')
            const changeButton = document.createElement('button')
            changeButton.textContent = 'Изменить'
            changeButton.classList.add('delete-button')
            changeButton.addEventListener('click', () => openChangeSpec(specialization.id, specialization.name))
            changeButtonCell.appendChild(changeButton)
            row.appendChild(changeButtonCell)
            table.appendChild(row)

        })
        listElement.appendChild(table)
    } catch (error) {
        console.error('Ошибка при обновлении списка специализаций:', error)
    }
}

async function deleteSpecialization(id) {
    try {
        const response = await fetch(`/api/specialization/${id}`, {
            method: 'DELETE'
        })
        if (response.ok) {
            alert("Специальность удалена")
            await updateSpecializations()
        } else {
            throw new Error('Ошибка при удалении специальности')
        }
    } catch (error) {
        console.error('Ошибка при удалении специальности:', error)
    }
}

function openChangeSpec(id, name) {
    document.getElementById('specializationChange').style.display = 'block'
    document.getElementById('specChangeName').value = name
    document.getElementById('specIdChange').value = id
}

function closeChangeSpec() {
    document.getElementById('specializationChange').style.display = 'none'
}

async function changeSpecialization() {
    try {
        const confirmation = confirm("Вы уверены, что хотите изменить эту специальность?");
        if (!confirmation) {
            return
        }
        const name = document.getElementById('specChangeName').value.trim()
        const id = document.getElementById('specIdChange').value

        if (! name){
            alert('Пожалуйста, заполните все поля')
            return
        }
        const requestBody = {
            id: id,
            name: name,
        }

        const response = await fetch('/api/specialization-change', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })

        if (response.ok) {
            alert('Специальность успешно изменена!')
            await updateSpecializations()
            document.getElementById('specializationChange').style.display = 'none'
        } else {
            throw new Error('Ошибка при зменении специальность')
        }
    } catch (error) {
        console.error('Ошибка при изменении специальности:', error)
    }
}

//Для обновления списков
window.onload = async function () {
    try {
        await updateSpecializations()
        await updateDoctor()
        await updateRegions()
        await updateUsers()
        await updateUI()
        await checkIsDoctor()
        await updateVisit()
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error)
    }
}


//Для содания региона
document.getElementById("regionForm").addEventListener("submit", async function (event) {
    event.preventDefault()

    const regionNumberInput = document.getElementById("regionNumberInput").value.trim()
    const regionInput = document.getElementById("regionInput").value.trim()

    if (!regionNumberInput) {
        alert("Пожалуйста, введите номер.")
        return
    }
    if (!regionInput) {
        alert("Пожалуйста, введите адрес.")
        return
    }

    const confirmation = confirm("Вы уверены, что хотите добавить этот регион?");
    if (!confirmation) {
        return
    }

    try {
        const response = await fetch("/api/region-create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({regionNumberInput: regionNumberInput, regionInput: regionInput})
        })

        if (response.ok) {
            alert("Регион успешно добавлен!")
            document.getElementById('regionNumberInput').value = ''
            document.getElementById('regionInput').value = ''
            await updateRegions()
        } else {
            throw new Error("Ошибка при добавлении специальности")
        }
    } catch (error) {
        console.error("Ошибка:", error)
    }
})

//Для показа регионов
async function updateRegions() {
    try {
        const response = await fetch('/api/region-full')
        const regions = await response.json()

        const selectRegion = document.getElementById('regionDoctor')
        const selectChange = document.getElementById('regionDoctorChange')
        const listRegion = document.getElementById('regions-list')
        const regionUser = document.getElementById('regionUser')
        const table = document.createElement('table')

        selectRegion.innerHTML = ''
        selectChange.innerHTML = ''
        listRegion.innerHTML = ''
        regionUser.innerHTML = ''

        const thead = document.createElement('thead')
        const headerRow = document.createElement('tr')
        const idHeader = document.createElement('th')
        idHeader.textContent = 'ID'
        headerRow.appendChild(idHeader)
        const numberHeader = document.createElement('th')
        numberHeader.textContent = '№'
        headerRow.appendChild(numberHeader)
        const nameHeader = document.createElement('th')
        nameHeader.textContent = 'Название'
        headerRow.appendChild(nameHeader)
        const deleteHeader = document.createElement('th')
        deleteHeader.textContent = ''
        headerRow.appendChild(deleteHeader)
        thead.appendChild(headerRow)
        table.appendChild(thead)

        regions.forEach(region => {
            const option = document.createElement('option')
            option.value = region.id
            option.textContent = region.number
            selectRegion.appendChild(option)


            const change = document.createElement('option')
            change.value = region.id
            change.textContent = region.number
            selectChange.appendChild(change)


            const selectReg = document.createElement('option')
            selectReg.value = region.id
            selectReg.textContent = region.address_range
            regionUser.appendChild(selectReg)


            const row = document.createElement('tr')
            const idReg = document.createElement('td')
            idReg.textContent = region.id
            row.appendChild(idReg)
            const numberReg = document.createElement('td')
            numberReg.textContent = region.number
            row.appendChild(numberReg)
            const addressReg = document.createElement('td')
            addressReg.textContent = region.address_range
            row.appendChild(addressReg)
            const deleteButtonReg = document.createElement('td')
            const deleteButton = document.createElement('button')
            deleteButton.textContent = 'Удалить'
            deleteButton.classList.add('delete-button')
            deleteButton.addEventListener('click', () => deleteRegion(region.id))
            deleteButtonReg.appendChild(deleteButton)
            row.appendChild(deleteButtonReg)
            table.appendChild(row)
        })
        listRegion.appendChild(table)
    } catch (error) {
        console.error('Ошибка при обновлении списка специализаций:', error)
    }
}

async function deleteRegion(id) {
    try {
        const response = await fetch(`/api/region/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            alert("Участок удален")
            await updateSpecializations()
        } else {
            throw new Error('Ошибка при удалении участка');
        }
    } catch (error) {
        console.error('Ошибка при удалении участка:', error);
    }
}

//Для показа списка пользователей
async function updateUsers() {
    try {
        const response = await fetch('/api/user-full')
        const users = await response.json()
        const listUserDoc = document.getElementById('users-list')
        const listUser = document.getElementById('user-full-list')
        const table = document.createElement('table')
        listUserDoc.innerHTML = ''
        listUser.innerHTML = ''


        // Создаем элемент <thead> для шапки таблицы
        const thead = document.createElement('thead')
        const headerRow = document.createElement('tr')
        const idHeader = document.createElement('th')
        idHeader.textContent = 'ID'
        headerRow.appendChild(idHeader)
        const loginHeader = document.createElement('th')
        loginHeader.textContent = 'Логин'
        headerRow.appendChild(loginHeader)
        const emailHeader = document.createElement('th')
        emailHeader.textContent = 'Email'
        headerRow.appendChild(emailHeader)
        const phoneHeader = document.createElement('th')
        phoneHeader.textContent = 'Телефон'
        headerRow.appendChild(phoneHeader)
        thead.appendChild(headerRow)
        table.appendChild(thead)

        users.forEach(user => {
            const row = document.createElement('tr')
            const idUs = document.createElement('td')
            idUs.textContent = user.id
            row.appendChild(idUs)
            const loginUs = document.createElement('td')
            loginUs.textContent = user.login
            row.appendChild(loginUs)
            const mailUs = document.createElement('td')
            mailUs.textContent = user.email
            row.appendChild(mailUs)
            const phoneUs = document.createElement('td')
            phoneUs.textContent = user.phone_number
            row.appendChild(phoneUs)
            table.appendChild(row)

            const listItem = document.createElement('li')
            listItem.textContent = user.login + ";  " + user.email
            listItem.addEventListener('click', () => selectUser(user.id, user.login))
            listUserDoc.appendChild(listItem)
        })
        listUser.appendChild(table)
    } catch (error) {
        console.error('Ошибка при обновлении списка пользователей:', error)
    }
}

async function openUserModal() {
    await updateUsers()
    const userModal = document.getElementById('userModal')
    userModal.style.display = 'block'
}

function closeUserModal() {
    const userModal = document.getElementById('userModal')
    userModal.style.display = 'none'
}
async function openPatientVisitModal() {
    await updatePatient()
    document.getElementById('patientModalVisit').style.display = 'block'
}
function closePatientVisitModal(){
    document.getElementById('patientModalVisit').style.display = 'none'
}

async function updatePatient() {
    try{
        const response = await fetch('/api/patient-full')
        const patients = await response.json()
        const listPatientVisit = document.getElementById('patient-list-visit')

        listPatientVisit.innerHTML = ''

        patients.forEach(patient =>{
            const listItem = document.createElement('li')
            listItem.textContent = patient.name + " " + patient.surname + "; Дата рождения: " + patient.birthday_data
            listItem.addEventListener('click', () => selectedPatientVisit(patient.name, patient.surname, patient.card_number))
            listPatientVisit.appendChild(listItem)
        })
    }catch (error){
        console.error('Ошибка при обновлении списка пациентов:', error)
    }
}

async function updateVisit(){
    try {
        const id_user = localStorage.getItem('userId')
        let response2
        if (id_user) {
            response2 = await fetch(`/api/patient-user/${id_user}`)
        }
        const patientInfo = await response2.json()
        const patient_card_number = patientInfo.card_number
        const response = await fetch(`/api/visit-user/${patient_card_number}`)
        const visits = await response.json()
        const listVisitPatient = document.getElementById('visit-patient-list')
        const table = document.createElement('table')

        listVisitPatient.innerHTML = ''

        const thead = document.createElement('thead')
        const headerRow = document.createElement('tr')
        const dataHeader = document.createElement('th')
        dataHeader.textContent = 'Дата'
        headerRow.appendChild(dataHeader)
        const doctorHeader = document.createElement('th')
        doctorHeader.textContent = 'Доктор'
        headerRow.appendChild(doctorHeader)
        const specialHeader = document.createElement('th')
        specialHeader.textContent = 'Специальность'
        headerRow.appendChild(specialHeader)
        const infoHeader = document.createElement('th')
        infoHeader.textContent = ''
        headerRow.appendChild(infoHeader)
        thead.appendChild(headerRow)
        table.appendChild(thead)

        const nameSpecial = await fetch('/api/specialization-full')
        const specialization = await nameSpecial.json()

        const nameDoctor = await fetch('/api/doctor-full')
        const doctor = await nameDoctor.json()
        visits.forEach(visit =>{
            const row = document.createElement('tr')
            const createdDate = new Date(visit.created)
            const formattedDate = `${createdDate.getDate()}.${createdDate.getMonth() + 1}.${createdDate.getFullYear()}`
            const data = document.createElement('td')
            data.textContent = formattedDate
            row.appendChild(data)
            const FIODoc = document.createElement('td')
            const nameSpec = document.createElement('td')
            for (let i = 0; i < doctor.length; i++) {
                if (doctor[i].id === visit.id_doctor) {
                    FIODoc.textContent = doctor[i].name + " " + doctor[i].surname
                    for (let j = 0; j < specialization.length; j++) {
                        if (specialization[j].id === doctor[i].id_specialization) {
                            nameSpec.textContent = specialization[j].name
                            break
                        }
                    }
                    break
                }
            }
            row.appendChild(FIODoc)
            row.appendChild(nameSpec)
            const infoButtonVisit = document.createElement('td')
            const infoButton = document.createElement('button')
            infoButton.textContent = 'Подробнее'
            infoButton.classList.add('delete-button')
            infoButton.addEventListener('click', () => openVisitInfo(visit.id))
            infoButtonVisit.appendChild(infoButton)
            row.appendChild(infoButtonVisit)
            table.appendChild(row)
        })
        listVisitPatient.appendChild(table)
    }catch (error) {
        console.error('Ошибка при обновлении списка визитов:', error)
    }
}
async function createVisit(){
    const patient_card_number = document.getElementById('selectedPatientId').value.trim()
    const note = document.getElementById('noteVisit').value.trim()
    const price = document.getElementById('priceVisit').value.trim()
    const id_doctor = document.getElementById('selectedDoctorId').value.trim()

    if (!patient_card_number || !note || !price || !id_doctor) {
        alert("Пожалуйста, заполните все поля.")
        return
    }

    try {
        const requestBody = {
            note: note,
            price: price,
            patient_card_number: patient_card_number,
            id_doctor: id_doctor
        }

        const response = await fetch('/api/visit-create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })

        if (response.ok) {
            alert('Визит успешно создан!')
            document.getElementById('selectedPatientId').value = ''
            document.getElementById('noteVisit').value = ''
            document.getElementById('priceVisit').value = ''
            document.getElementById('selectedDoctorId').value = ''
            document.getElementById("visitCreate").style.display = "none"
            await updateVisit()
        } else {
            throw new Error('Ошибка при добавлении визита')
        }
    } catch (error) {
        console.log('Ошибка при создании визита:', error)
    }
}

async function openVisitInfo(id){
    const response = await fetch(`/api/visit/${id}`)
    const data = await response.json()
    document.getElementById('numberVisitInfo').textContent = data.id
    document.getElementById('dataVisitInfo').textContent = data.created
    document.getElementById('noteVisitInfo').textContent = data.note
    document.getElementById('priceVisitInfo').textContent = data.price

    const id_doctor = data.id_doctor
    const response2 = await fetch(`/api/doctor-name/${id_doctor}`)
    const data2 = await response2.json()
    document.getElementById('doctorVisitInfo').textContent = data2.name + ' ' + data2.surname

    const patient_card_number = data.patient_card_number
    const response3 = await fetch(`/api/patient-name/${patient_card_number}`)
    const data3 = await response3.json()
    document.getElementById('patientVisitInfo').textContent = data3.name + ' ' + data3.surname

    document.getElementById('visitInfo').style.display = 'block'
}
function closeVisitInfo() {
    document.getElementById('visitInfo').style.display = 'none'

}

function openPersModal(){
    document.getElementById('personalDov').style.display = 'block'
}

function closePersModal(){
    document.getElementById('personalDov').style.display = 'none'
}
//Для передачи данных    при добовлении доктора
function selectUser(id, login) {
    const selectedUser = document.getElementById('selectedUser')
    selectedUser.textContent = id + "; " + login
    document.getElementById('selectedUserId').value = id
    closeUserModal()
}
function selectedPatientVisit(name, surname, id) {
    const selectedPatientVisit = document.getElementById('selectedPatientVisit')
    selectedPatientVisit.textContent = name + " " + surname
    document.getElementById('selectedPatientId').value = id
    closePatientVisitModal()
}


//Для создания пациентов
function openModalPatient() {
    document.getElementById("patientCreate").style.display = "block"
}

function closeModalPatient() {document.getElementById("patientCreate").style.display = "none"}

async function addPatient() {
    const confirmation = confirm("Вы уверены?");
    if (!confirmation) {
        return
    }

    const patientName = document.getElementById('patientName').value.trim()
    const patientSurname = document.getElementById('patientSurname').value.trim()
    const gender = document.getElementById('gender').value.trim()
    const birthData = document.getElementById('birthData').value.trim()
    const addressPatient = document.getElementById('addressPatient').value.trim()
    const regionUser = document.getElementById('regionUser').value.trim()
    const userIdPatient = localStorage.getItem('userId')

    if (!patientName || !patientSurname || !gender || !birthData || !addressPatient || !regionUser) {
        alert('Пожалуйста, заполните все поля')
        return
    }

    const passportSeries = document.getElementById('passportSeries').value.trim()
    const passportNumber = document.getElementById('passportNumber').value.trim()
    const passportExpiration = document.getElementById('passportExpiration').value.trim()
    const identificationNumber = document.getElementById('identificationNumber').value.trim()

    if (!passportSeries || !passportNumber || !passportExpiration || !identificationNumber){
        alert('Пожалуйста, заполните все поля персональных данных')
        return
    }

    const requestBody = {
        name: patientName,
        surname: patientSurname,
        gender: gender,
        birthday_data: birthData,
        address: addressPatient,
        id_user: userIdPatient,
        region_number: regionUser
    }

    const requestBody2 = {
        passportSeries: passportSeries,
        passportNumber: passportNumber,
        passportExpiration: passportExpiration,
        identificationNumber: identificationNumber,
        id_user: userIdPatient
    }

    try {
        const response = await fetch('/api/patient-create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
        const response2 = await fetch('/api/personalDate-create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody2)
        })

        if (response.ok && response2.ok) {
            alert('Вы стали пациентом!')
            document.getElementById('patientName').value = ''
            document.getElementById('patientSurname').value = ''
            document.getElementById('gender').value = ''
            document.getElementById('birthData').value = ''
            document.getElementById('addressPatient').value = ''
            document.getElementById('regionUser').value = ''
            document.getElementById('passportSeries').value = ''
            document.getElementById('passportNumber').value = ''
            document.getElementById('passportExpiration').value = ''
            document.getElementById('identificationNumber').value = ''
            document.getElementById("patientCreate").style.display = "none"
        } else {
            throw new Error('Ошибка при добавлении доктора')
        }
    } catch (error) {
        console.error('Ошибка:', error)
    }

}


function openVisitPatient() {
    const userId = localStorage.getItem('userId')
    if (userId) {
        document.getElementById('userVisit').style.display = 'block'
        document.getElementById('adminWindow').style.display = 'none'
        document.getElementById('maimMain').style.display = 'none'
        document.getElementById('doctorMain').style.display = 'none'
        document.getElementById('doctorMainWindow').style.display = 'none'
        document.getElementById("menu-overlay").style.left = "-200px"
    } else {
        alert('Вы не ввошли в аккаунт')
    }
}

//Для проверки администратора
async function updateUI() {
    const isAdmin = localStorage.getItem('isAdmin')
    const adminButton = document.getElementById('administrationButton')
    if (isAdmin === 'true') {
        adminButton.style.display = 'block'
    } else {
        adminButton.style.display = 'none'
    }
}

async function checkIsDoctor(){
    const isDoctor = localStorage.getItem('isDoctor')
    const doctorButton = document.getElementById('doctorButton')
    if (isDoctor === 'true') {
        doctorButton.style.display = 'block'
    } else {
        doctorButton.style.display = 'none'
    }
}
