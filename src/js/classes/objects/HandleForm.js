import es6Promise from 'es6-promise';
import fetch from 'isomorphic-fetch';
es6Promise.polyfill();

let itemAddForm;
let spelers;

export default () => {
  itemAddForm = document.getElementById(`itemAddForm`);

  const $inputDiv = document.querySelector(`.inputField`);
  $inputDiv.classList.remove(`hidden`);

  if (itemAddForm) {
    itemAddForm.addEventListener(`submit`, submitItemAddForm);
  }
  loadScores();
};

const submitItemAddForm = event => {
  event.preventDefault();

  fetch(`${itemAddForm.getAttribute(`action`)}?t=${Date.now()}`, {
    headers: new Headers({
      Accept: `application/json`
    }),
    method: `post`,
    body: new FormData(itemAddForm)
  })
  .then(r => r.json())
  .then(result => {
    if (result.result === `ok`) {

      const $inputDiv = document.querySelector(`.inputField`);
      $inputDiv.classList.add(`hidden`);

      const $scoreInput = document.querySelector(`.scoreInput`);
      const score = $scoreInput.value;

      for (let i = 0;i < spelers.length;i ++) {
        if (score <= spelers[i].score) {

          const $validForm = document.querySelector(`.aThankYou`);
          const scoreNeeded = spelers[9].score - score;

          $validForm.innerHTML = `<p>Still need ${scoreNeeded} points to make the top 10!</p>`;
          $validForm.classList.add(`text-field`);
          $validForm.classList.remove(`hidden`);

        } else {
          const $validForm = document.querySelector(`.aThankYou`);
          const scoreNeeded = spelers[0].score - score;

          $validForm.innerHTML = `<p>Congrats!</p><p> Your in the top 10! ${scoreNeeded} points and you're NR1!</p>`;
          $validForm.classList.add(`text-field`);
          $validForm.classList.remove(`hidden`);
        }
        if (score > spelers[0].score) {
          const $validForm = document.querySelector(`.aThankYou`);

          $validForm.innerHTML = `<p>Congrats!</p><p>You're the nr1!</p><p>Nice done Champ!</p>`;
          $validForm.classList.add(`text-field`);
          $validForm.classList.remove(`hidden`);
        }

      }

    } else {
      //TODO: don't use alert function, but render errors in HTML
      alert(`error`);
    }
  });
};

const loadScores = () => {
  fetch(`index.php?page=home&t=${Date.now()}`, {
    headers: new Headers({
      Accept: `application/json`
    })
  })
  .then(r => r.json())
  .then(results => {
    if (!results || results.length === 0) {
      return;
    }
    spelers = results;
  });
};
