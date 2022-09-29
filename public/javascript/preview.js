export function readURL(input, id) {
    const fk = document.querySelector(`#${id}`)
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            fk.src = e.target.result;
        };

        reader.readAsDataURL(input.files[0]);
    }
}