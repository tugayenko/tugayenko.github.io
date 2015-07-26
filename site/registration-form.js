/**
 * Created by tam on 7/26/15.
 */
var regForm = new Object();

function regFormInit(){
    regForm.window = undefined;
    regForm.elm = document.getElementById('top_account');
    regForm.elm.onclick = openRegForm;
    regForm.width = 300;
    regForm.height = 320;
}

function openRegForm(){
    var left = (screen.width/2)-(regForm.width/2);
    var top = (screen.height/2)-(regForm.height/2);
    regForm.window = window.open('registration_form.html', 'REGISTRATION FORM',
        'toolbar=no, location=no, directories=no, status=no,' +
        ' menubar=no, scrollbars=no, resizable=no, copyhistory=no,' +
        ' width='+regForm.width+', height='+regForm.height+', top='+top+', left='+left);
    if (regForm.window){
        regForm.window.onload = function ()
        {
            initRegForm(regForm.window);
        }
    }
}
/*------------------------------*/
function initRegForm(w) {
    for (var i = 0; i < w.document.forms.length; i++) {
        var form = w.document.forms[i];

        var formValidation = false;

        for (var j = 0; j < form.elements.length; j++) {
            var e = form.elements[j];
            if (e.type != "text") {
                continue;
            }
            var pattern = e.getAttribute("data-val");
            if (pattern) {
                e.onchange = validateInput;
                formValidation = true;
            }
        }
        if (formValidation) {
            form.onsubmit = validateForm;
        }
    }
}

function validateInput() {
    var pattern = this.dataset.val,
        value = this.value;
    pattern = new RegExp(pattern);
    var res = pattern.test(value);
    //alert(this.value +"|"+pattern+"|"+res);
    if (!res) {
        this.className = "regFormInput error";
    }
    else {
        this.className = "regFormInput valid";
    }
}

function validateForm() {
    var invalid = false;
    for (var i = 0; i < this.elements.length; ++i) {
        var e = this.elements[i];
        if (e.type == "text" && e.onchange != null) {
            e.onchange();
            if (e.className == "regFormInput error") invalid = true;
        }
    }
    if (invalid) {
        alert("Допущены ошибки при заполнении формы.");
        return false;
    }
    else{
        alert("Форма заполнена верно");
        regForm.window.close();
    }
}
