
var CATCHALL_ERROR_MESSAGE = "Something broke. Please contact Wagon.";

var resetSignupState = function() {
  clearFormError();
  window.signupState = {valid: true, submitted: false};
};

var signupButton = $("#signup-submit");

var setSignupButtonText = function(txt) {
  signupButton.text(txt);
}

var errorMessage = $('#signup-error-message');
var successMessage = $('#signup-success-message');

var clearFormError = function() {
  showFormError('');
}

var showFormError = function(msg) {
  errorMessage.text(msg);
};

var clearFormSuccess = function() {
  showFormSuccess('');
}

var showFormSuccess = function(msg) {
  successMessage.text(msg);
};

var resetInput = function(sel, field) {
  sel.removeClass("has-error");
  var inputSel = sel.find("> input");
  inputSel.val("");
  inputSel.attr("placeholder", field);
};

var handleSignupError = function(err) {
  var msg;

  /* Work around validator response limitation.  Ideally err.email
   * could be "missing" as well. */
  if (err === "Invalid TO address.") {
    msg = "Please enter a valid email address.";
  }

  showFormError(msg || CATCHALL_ERROR_MESSAGE);
  clearFormSuccess();
};

var getCookie = function(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
};

var signupOnclick = function(e) {
  e.preventDefault();
  $(e.target).blur();

  // quick form validations...
  if (!$("#signup-name > input").val()) {
    clearFormSuccess();
    return showFormError("Please enter your name.");
  } else if (!$("#signup-email > input").val()) {
    clearFormSuccess();
    return showFormError("Please enter your email.");
  }

  $("#signup-submit > .btn").text("Signing up...");

  $.ajax({
    url: "https://app.wagonhq.com/api/invitation",
    type: "POST",
    data: JSON.stringify({
      toName: $("#signup-name > input").val(),
      toEmail: $("#signup-email > input").val(),
      fromEmail: "invites@wagonemail.com",
      fromName: "Team Wagon",
      type: "open-to-newTeam",
      source: getCookie("source")
    }),
    dataType: "json",
    timeout: 7000 // 7 second timeout
  }).fail(function (res) {
    ga('send', 'event', 'sign-up', 'error');
    if (res && res.status === 400 &&
        res.responseJSON && res.responseJSON.message) {

      setTimeout(function() {
        handleSignupError(res.responseJSON.message);
      }, 300);
    } else {
      setTimeout(function () {
        showFormError(CATCHALL_ERROR_MESSAGE);
        clearFormSuccess();
      }, 300);
    }

    setTimeout(function () {
      setSignupButtonText("Sign up and download");
    }, 300);
  }).done(function () {
    ga('send', 'event', 'sign-up', 'success');
    resetInput($("#signup-name"), "Name");
    resetInput($("#signup-email"), "name@company.com");
    setSignupButtonText("Sign up and download");
    showFormSuccess("Thanks! Please check your email.");
    resetSignupState();
  });
};

resetSignupState();
$(function() { signupButton.on("click", signupOnclick); });
