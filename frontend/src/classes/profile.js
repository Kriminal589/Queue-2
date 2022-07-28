export const updateProfile = (data) => {
    const $name = document.getElementById('name_holder')
    $name.innerHTML = `${data['first_name']} ${data['last_name']}`
    $name.dataset.uid = data['uid']
}