"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}
document.querySelector("#submit-form").addEventListener("submit", (e) => {
  e.preventDefault();
  let submitTitle = e.target[0].value;
  let submitAuthor = e.target[1].value;
  let submitURL = e.target[2].value;
  console.log(submitTitle, submitAuthor, submitURL);
  storyList.addStory(currentUser, {
    title: submitTitle,
    author: submitAuthor,
    url: submitURL,
  });

  setTimeout(() => {
    document.location.reload();
  }, 1500);
});


async function addAndDeleteFavs(e){
  console.log(e.target)
  e.preventDefault
 try{ if (e.target.parentElement.classList.value === "stories-list") return;
  if (e.target.classList.value === "stories-list") return;
  console.log(e.target.parentElement);

  const chosenStory = e.target.parentElement;
  // console.log(currentUser);
  
  console.log(chosenStory.id);
  console.log(currentUser.favorites)
  
  for(let favs of currentUser.favorites){
    console.log(favs.storyId)
    console.log(favs.id)
    if (chosenStory.id === favs.storyId || chosenStory.id === favs.id){
      console.log('the same!')
      $(`#${chosenStory.id}`).css('color', 'grey')
      await currentUser.removeFavorite(chosenStory)
      return
    }
  }
  $(`#${chosenStory.id}`).css('color', 'red')
  await currentUser.addFavorite(chosenStory)
  console.log(currentUser.favorites)
 }catch(err){
  console.log(err)
 }
}

setTimeout(()=>{
  console.log(currentUser)
  for(let fav of currentUser.favorites){
    console.log(fav)
    console.log(fav.storyId)
    $(`#${fav.storyId}`).css('color', 'red')
  }

}, 300)


function favStoriesOnPage(){
  console.log(currentUser.favorites)
  $allStoriesList.empty();
  for (let story of currentUser.favorites) {
    const storyl = generateStoryMarkup(story);
    $allStoriesList.append(storyl);
}}
document.getElementById('abs-favs').addEventListener('click', favStoriesOnPage)

document.querySelector("#all-stories-list").addEventListener("click", addAndDeleteFavs);