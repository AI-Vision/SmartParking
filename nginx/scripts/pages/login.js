// При загрузке в url может быть ошибка - её нужно вывести
$(document).ready(function(){
    const params = new URLSearchParams(document.location.search.substring(1));
    if (params.get("error")) {
        toastr.error(params.get("description"));
    }
});

$("#passwd").on('input', function() {
    $(this).removeClass("is-invalid");
});

$("#loginForm").submit(function(e) {
    e.preventDefault(); // Отменяем отправку формы

    const email    = $("#email").val();    // Почта
    const passwd   = $("#passwd").val();   // Пароль

    if (passwd.length < 6 || passwd.length > 30) {
        $("#passwd").addClass("is-invalid");
        toastr.error("Неверный пароль", "Пароль может содержать от 6 до 30 символов");
        return;
    }

    if (email.length < 6 || email.length > 60) {
        $("#email").addClass("is-invalid");
        toastr.error("Неверная почта", "Почта может содержать от 6 до 60 символов");
        return;
    }

    $("button").prop("disabled", true);

    $.ajax({
        type: "POST",
        url: "/login",
        data: {email, passwd},
        success: function(response) {
            console.log('RESULT');
            const result = JSON.parse(response);

            if (result.Status == "Success") {
                toastr.success("Авторизация прошла успешно");
                setTimeout(function() {
                    window.location.href = "/helper";
                }, 500);
            }else {
                toastr.error(result.Description);
                $('#passwd').addClass('is-invalid');

                $("button").prop("disabled", false);
            }
        }
    });
});