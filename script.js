document.addEventListener('DOMContentLoaded', function() {
    const linksButton = document.getElementById('links-button');
    const linksDropdown = document.getElementById('links-dropdown');
    const descriptionElement = document.getElementById('dynamic-description');
    const projectCards = document.querySelectorAll('.project-card');

    // Toggle Links Dropdown
    linksButton.addEventListener('click', (e) => {
        e.stopPropagation();
        linksDropdown.classList.toggle('show');
    });

    document.addEventListener('click', () => linksDropdown.classList.remove('show'));

    // Handle Hover Descriptions
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const desc = this.getAttribute('data-description');
            descriptionElement.textContent = desc;
            descriptionElement.style.color = "#000";
        });

        card.addEventListener('mouseleave', function() {
            descriptionElement.textContent = "Select a project to see details.";
            descriptionElement.style.color = "#666";
        });
    });
});