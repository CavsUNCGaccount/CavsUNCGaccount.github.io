document.addEventListener('DOMContentLoaded', () => {
    
    // Select all figures in the gallery
    const figures = document.querySelectorAll('.dish-gallery figure');

    for (let i = 0; i < figures.length; i++) {
      figures[i].addEventListener('click', () => {
        // Reset all figures by removing big from images and show from figcaptions
        for (let j = 0; j < figures.length; j++) {
          figures[j].querySelector('img').classList.remove('big');
          figures[j].querySelector('figcaption').classList.remove('show');
        }

        // Makes the image bigger by applying big class
        figures[i].querySelector('img').classList.add('big');

        // Show the clicked figure's caption by applying show class
        figures[i].querySelector('figcaption').classList.add('show');
      });
    }
  });