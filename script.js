// Music + Popup
const music = document.getElementById("music");
const startBtn = document.getElementById("startBtn");
const popup = document.getElementById("popup");
const messagePopup = document.getElementById("messagePopup");
const closeMsg = document.getElementById("closeMsg");

startBtn.addEventListener("click", () => {
    music.play();
    popup.style.display = "none";
});

closeMsg.addEventListener("click", () => {
    messagePopup.style.display = "none";
});

// Confetti Effect
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const confetti = [];
for (let i = 0; i < 150; i++) {
    confetti.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: Math.random() * 6 + 2,
        d: Math.random() * 10 + 5,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        tilt: Math.random() * 10 - 10
    });
}

function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach(c => {
        ctx.beginPath();
        ctx.fillStyle = c.color;
        ctx.fillRect(c.x, c.y, c.r, c.r * 2);
        ctx.fill();
    });
    updateConfetti();
}

function updateConfetti() {
    confetti.forEach(c => {
        c.y += 2;
        c.x += Math.sin(c.tilt) / 2;
        if (c.y > canvas.height) {
            c.y = -10;
            c.x = Math.random() * canvas.width;
        }
    });
}

function animate() {
    drawConfetti();
    requestAnimationFrame(animate);
}
animate();

// Slideshow
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
let slideCount = 0;

function showSlides() {
    slides.forEach((slide, index) => {
        slide.classList.remove("active");
        if (index === currentSlide) {
            slide.classList.add("active");
        }
    });

    currentSlide = (currentSlide + 1) % slides.length;
    slideCount++;

    // After one full round, show the personalized message
    if (slideCount === slides.length) {// Music + Popup
        const music = document.getElementById("music");
        const startBtn = document.getElementById("startBtn");
        const popup = document.getElementById("popup");
        const messagePopup = document.getElementById("messagePopup");
        const closeMsg = document.getElementById("closeMsg");

        startBtn.addEventListener("click", () => {
            music.play();
            popup.style.display = "none";
        });

        // Close button with smooth fade-out
        closeMsg.addEventListener("click", () => {
            messagePopup.classList.add("fadeOut"); // trigger fade out
            setTimeout(() => {
                messagePopup.style.display = "none"; // hide after animation
                messagePopup.classList.remove("fadeOut"); // reset for next time
            }, 800); // match animation duration
        });

        // Confetti Effect
        const canvas = document.getElementById("confetti");
        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const confetti = [];
        for (let i = 0; i < 150; i++) {
            confetti.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height - canvas.height,
                r: Math.random() * 6 + 2,
                d: Math.random() * 10 + 5,
                color: `hsl(${Math.random() * 360}, 100%, 50%)`,
                tilt: Math.random() * 10 - 10
            });
        }

        function drawConfetti() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            confetti.forEach(c => {
                ctx.beginPath();
                ctx.fillStyle = c.color;
                ctx.fillRect(c.x, c.y, c.r, c.r * 2);
                ctx.fill();
            });
            updateConfetti();
        }

        function updateConfetti() {
            confetti.forEach(c => {
                c.y += 2;
                c.x += Math.sin(c.tilt) / 2;
                if (c.y > canvas.height) {
                    c.y = -10;
                    c.x = Math.random() * canvas.width;
                }
            });
        }

        function animate() {
            drawConfetti();
            requestAnimationFrame(animate);
        }
        animate();

        // Slideshow
        let currentSlide = 0;
        const slides = document.querySelectorAll(".slide");
        let slideCount = 0;

        function showSlides() {
            slides.forEach((slide, index) => {
                slide.classList.remove("active");
                if (index === currentSlide) {
                    slide.classList.add("active");
                }
            });

            currentSlide = (currentSlide + 1) % slides.length;
            slideCount++;

            // After one full round, show the personalized message
            if (slideCount === slides.length) {
                setTimeout(() => {
                    messagePopup.style.display = "flex";
                }, 1500);
            }
        }

        setInterval(showSlides, 4000); // Change every 4 seconds
        showSlides(); // Initial call to display the first slide

        setTimeout(() => {
            messagePopup.style.display = "flex";
        }, 1500);
    }
}

setInterval(showSlides, 4000); // Change every 4 seconds
showSlides(); // Initial call to display the first slide