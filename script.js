document.addEventListener('DOMContentLoaded', function() {
    const linksButton = document.getElementById('links-button');
    const linksDropdown = document.getElementById('links-dropdown');

    linksButton.addEventListener('click', function(e) {
        e.stopPropagation();
        linksDropdown.classList.toggle('show');
    });

    document.addEventListener('click', function() {
        linksDropdown.classList.remove('show');
    });

    linksDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});

const button = document.querySelector('.button');
button.addEventListener('click', () => {
    button.classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', function() {
    const projectPanels = document.querySelectorAll('.project-panel');
    const descriptionElement = document.getElementById('dynamic-description');
    const defaultMessage = "Hover over a project to see its description.";

    descriptionElement.textContent = defaultMessage;

    projectPanels.forEach(panel => {
        panel.addEventListener('mouseenter', function() {
            const description = this.querySelector('.project-description p').textContent;
            descriptionElement.textContent = description;
            descriptionElement.style.opacity = '1';
        });

        panel.addEventListener('mouseleave', function() {
            descriptionElement.textContent = defaultMessage;
            descriptionElement.style.opacity = '0.7';
        });
    });
});