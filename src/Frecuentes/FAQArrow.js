window.toggleAnswer = function(element) {
    const answer = element.nextElementSibling;
    answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
    element.parentElement.classList.toggle('active');
}