var progressBar = {
    fill: document.querySelector('.profile-level-bar-fill'),
    percents: document.querySelector('.profile-level-bar-percents')
}

function updateProgressBar(percents) {
    progressBar.fill.style.width = percents + '%';
    progressBar.percents.innerHTML = percents + '%';

}