"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

document.querySelector('#nav-submit').addEventListener('click', ((e)=>{
  e.preventDefault()
  if(document.querySelector('#submit-form').hidden === true){
    document.querySelector('#submit-form').hidden = false
    for (let x of document.querySelectorAll('.submit-input')){
      x.hidden = false
    }
  }
}))

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}
let navLogin = document.getElementById('nav-login')
console.log(navLogin.style.display = 'block')
