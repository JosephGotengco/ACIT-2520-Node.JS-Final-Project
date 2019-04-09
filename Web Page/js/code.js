function display_code() {
    var user_code = document.getElementById('input').value;

    document.getElementById('output').srcdoc = user_code;
}
window.onload = display_code();