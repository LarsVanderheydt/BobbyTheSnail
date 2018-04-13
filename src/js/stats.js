import * as d3 from 'd3';
let array = [];

const formHandle = () => {
  const $form = document.getElementById(`between`);

  if ($form) {
    $form.addEventListener(`submit`, onSubmit);
  }
};

const onSubmit = e => {
  e.preventDefault();
  resetRects();
  loadScores();
};

const loadScores = () => {
  fetch(`index.php?page=stats&t=${Date.now()}`, {
    headers: new Headers({
      Accept: `application/json`
    })
  })
  .then(r => r.json())
  .then(results => {

    if (!results || results.length === 0) {
      d3.select(`.title`)
        .text(`Nog geen score in de database`);
    }

    const $from = document.getElementById(`from_date`);
    const $to = document.getElementById(`to_date`);
    // const $timeFrom = document.getElementById(`time_from`);
    // const $timeTo = document.getElementById(`time_to`);
    // const $secondsFrom = document.getElementById(`seconds_from`);
    // const $secondsTo = document.getElementById(`seconds_to`);

    // if ($timeTo == null && $timeFrom == null) {
    //   $timeFrom.value = `00:00`;
    //   $timeTo.value = `00:00`;
    // }
    //
    // if ($secondsTo == null && $secondsFrom == null) {
    //   $secondsFrom.value = `00`;
    //   $secondsTo.value = `00`;
    // }
    //
    // const fullFromTime = `${$from.value} ${$timeFrom.value}:${$secondsFrom.value}`;
    // const fullToTime = `${$to.value} ${$timeTo.value}:${$secondsTo.value}`;

    results.forEach(r => {
      if ($from != null && $to != null) {
        if (r.created >= $from.value && r.created <= $to.value) {
          array.push(r);
        }
      }
    });

    showScore(array);

  });
};

const resetRects = () => {
  array = [];
  if (array.length === 0) {
    d3.select(`.scoreGraph`).selectAll(`*`).remove();
  }
  d3.select(`.totals`).selectAll(`*`).remove();
};

const showScore = results => {
  const barHeight = 3;
  const max = getMax(results, `score`);


  const scoreGraph = d3.select(`.scoreGraph`)
    .attr(`height`, `${barHeight * results.length}rem`);

  const g = scoreGraph.selectAll(`g`)
    .data(results)
    .enter().append(`g`)
    .attr(`transform`, (d, i) => {
      return `translate(0, ${i * barHeight * 10})`;
    });



  g.append(`rect`)
    .attr(`fill`, `rgb(255, 106, 106)`)
    .attr(`width`, `100vw`)
    .attr(`height`, `${barHeight - .1}rem`);

  g.append(`rect`)
    .attr(`fill`, `rgb(208, 0, 0)`)
    .attr(`class`, `rect`)
    .attr(`width`, ({score}) => `${score / (max.score / 100) }vw`)
    .attr(`height`, `${barHeight - .1}rem`);

  g.append(`text`)
    .attr(`x`, `3vw`)
    .attr(`y`, `${barHeight / 1.75}rem`)
    .attr(`dy`, `.35rem`)
    .attr(`font-size`, `2rem`)
    .attr(`fill`, `white`)
    .text(({name}) => `${name}`);

  g.append(`text`)
      .attr(`x`, `65vw`)
      .attr(`text-anchor`, `middle`)
      .attr(`y`, `${barHeight / 1.75}rem`)
      .attr(`dy`, `.35rem`)
      .attr(`font-size`, `2rem`)
      .attr(`fill`, `white`)
      .text(({score}) => `${score}`);

  g.on(`mouseover`, d => {
    const hours   = Math.floor(d.time / 3600);
    const minutes = Math.floor((d.time - (hours * 3600)) / 60);
    const seconds = d.time - (hours * 3600) - (minutes * 60);
    const secondsToDeg = d.time / max.time * 360;

    const svg = d3.select(`.timeGraph`);


    const arcGroup = svg
    .append(`g`)
    .attr(`transform`, `translate(100,100)`)
    .attr(`class`, `timeGroup`);

// arc background

    const arcBg = d3.arc()
    .innerRadius(30)
    .outerRadius(80)
    .startAngle(0)
    .endAngle(2 * Math.PI);

    arcGroup.append(`path`)
    .attr(`fill`, `rgb(0, 62, 73)`)
    .attr(`class`, `arc`)
    .attr(`d`, arcBg);

// arc

    const arc = d3.arc()
    .innerRadius(40)
    .outerRadius(70)
    .startAngle(secondsToDeg * Math.PI / 180)
    .endAngle(2 * Math.PI);

    arcGroup.append(`path`)
    .attr(`fill`, `rgb(72, 185, 205)`)
    .attr(`class`, `arc`)
    .attr(`d`, arc);

    arcGroup.append(`text`)
      .attr(`text-anchor`, `middle`)
      .attr(`font-size`, `1.5rem`)
      .attr(`dy`, `.5rem`)
      .attr(`fill`, `black`)
      .text(`${minutes}:${seconds}`);

// hover stats text

    const infoGroup = svg.append(`g`)
      .attr(`class`, `nameHoverdPlayer`)
      .attr(`text-anchor`, `left`)
      .attr(`font-size`, `2rem`)
      .attr(`fill`, `black`)
      .attr(`transform`, `translate(20,210)`);

    infoGroup.append(`text`)
      .text(`Naam : ${d.name}`);

    infoGroup.append(`text`)
      .attr(`y`, `2rem`)
      .text(`score : ${ d.score}`);

    infoGroup.append(`text`)
      .attr(`y`, `6rem`)
      .text(`shields used : ${ d.used_shields}`);

    infoGroup.append(`text`)
      .attr(`y`, `8rem`)
      .text(`slime refill picked up : ${ d.used_slime_refills}`);

    infoGroup.append(`text`)
      .attr(`y`, `10rem`)
      .text(`extra lifes : ${ d.extra_lifes}`);

    infoGroup.append(`text`)
      .attr(`y`, `12rem`)
      .text(`hits taken : ${ d.hits_taken}`);

    infoGroup.append(`text`)
      .attr(`y`, `14rem`)
      .text(`rockets used : ${ d.used_rockets}`);
  })
  .on(`mouseout`, () => {
    d3.select(`.timeGroup`)
    .remove();
    d3.select(`.nameHoverdPlayer`)
    .remove();
    d3.select(`.scoreHoverdPlayer`)
    .remove();
  });

  let totalScore = 0;
  for (let i = 0;i < results.length;i ++) {
    totalScore += results[i].score;
  }

  const totals = d3.select(`.totals`);
  const totalScoreDiv = totals.append(`div`);
  totalScoreDiv.append(`h1`)
  .attr(`class`, `totalScore`)
  .text(`total score`);

  totalScoreDiv.append(`p`)
  .text(totalScore);


  let totalTime = 0;
  for (let i = 0;i < results.length;i ++) {
    totalTime += results[i].time;
  }

  const hours   = Math.floor(totalTime / 3600);
  const minutes = Math.floor((totalTime - (hours * 3600)) / 60);
  const seconds = totalTime - (hours * 3600) - (minutes * 60);

  const totalTimeDiv = totals.append(`div`);
  totalTimeDiv.append(`h1`)
  .attr(`class`, `totalScore`)
  .text(`total score`);

  totalTimeDiv.append(`p`)
  .text(`${hours}:${minutes}:${seconds}`);

  let totalShields = 0;
  for (let i = 0;i < results.length;i ++) {
    totalShields += results[i].used_shields;
  }

  const totalShieldDiv = totals.append(`div`);
  totalShieldDiv.append(`h1`)
  .attr(`class`, `totalScore`)
  .text(`total score`);

  totalShieldDiv.append(`p`)
  .text(totalShields);

  let totalSlime = 0;
  for (let i = 0;i < results.length;i ++) {
    totalSlime += results[i].used_slime_refills;
  }

  const totalSlimeDiv = totals.append(`div`);
  totalSlimeDiv.append(`h1`)
  .attr(`class`, `totalScore`)
  .text(`total slimes`);

  totalSlimeDiv.append(`p`)
  .text(totalSlime);


  let totalLifes = 0;
  for (let i = 0;i < results.length;i ++) {
    totalLifes += results[i].extra_lifes;
  }

  const totalLifeDiv = totals.append(`div`);
  totalLifeDiv.append(`h1`)
  .attr(`class`, `totalScore`)
  .text(`total lifes`);

  totalLifeDiv.append(`p`)
  .text(totalLifes);

  let totalHits = 0;
  for (let i = 0;i < results.length;i ++) {
    totalHits += results[i].hits_taken;
  }

  const totalHitsDiv = totals.append(`div`);
  totalHitsDiv.append(`h1`)
  .attr(`class`, `totalScore`)
  .text(`total hits`);

  totalHitsDiv.append(`p`)
  .text(totalHits);
};

const getMax = (arr, takeMaxBasedOn) => {
  let max;
  for (let i = 0;i < arr.length;i ++) {
    if (!max || parseInt(arr[i][takeMaxBasedOn]) > parseInt(max[takeMaxBasedOn]))
      max = arr[i];
  }
  return max;
};

const init = () => {
  formHandle();
};


init();
