document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('app-container');
    const popups = document.querySelectorAll('.popup');
    let currentPopupIndex = 0;

    function showPopup(index) {
        popups.forEach((popup, i) => {
            if (i === index) {
                popup.classList.add('active');
            } else {
                popup.classList.remove('active');
            }
        });

        // Autoplay video if it's the video popup
        if (popups[index] && popups[index].id === 'video-popup') {
            const video = document.getElementById('birthday-video');
            if (video) {
                video.play();
                video.muted = false; // Unmute the video when it plays
            }
        } else {
            // Pause any playing video when switching away from video popup
            const video = document.getElementById('birthday-video');
            if (video && !video.paused) {
                video.pause();
                video.currentTime = 0; // Rewind video
            }
        }
    }


    // Initial display of the intro screen
    showPopup(currentPopupIndex);

    // Event listener for button clicks to advance the popups
    appContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('next-btn')) {
            if (event.target.id === 'restart-btn') {
                currentPopupIndex = 0; // Restart from the beginning
                showPopup(currentPopupIndex);
                return; // Stop further processing for this click
            }

            currentPopupIndex++;
            if (currentPopupIndex < popups.length) {
                showPopup(currentPopupIndex);
            } else {
                // If all popups have been shown, you could optionally hide everything
                // or ensure the last popup stays active.
                // For this example, we'll just let the last popup remain.
                console.log("OKAY NA TO!");
            }
        }
    });

    // Optional: Allow clicking anywhere on the intro screen to start
    document.getElementById('intro-screen').addEventListener('click', (event) => {
        // Only trigger if it's the intro screen and not clicking the button itself
        if (currentPopupIndex === 0 && !event.target.classList.contains('next-btn')) {
            currentPopupIndex++;
            showPopup(currentPopupIndex);
        }
    });
});