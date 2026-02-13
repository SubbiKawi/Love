const collage = document.getElementById("collage");
const totalImages = 20;
const music = document.getElementById("bgMusic");
const envelope = document.getElementById("envelope");
const flap = document.getElementById("flap");
const seal = document.getElementById("seal");

seal.addEventListener("click", () => {

    /* Start music */
    music.play();

    /* Open flap */
    flap.classList.add("open-flap");

    /* Fade envelope out */
    setTimeout(() => {
        envelope.style.transition = "opacity 1s ease";
        envelope.style.opacity = "0";

        setTimeout(() => {
            envelope.style.display = "none";
        }, 1000);

    }, 1200);
});



/* Safe autoplay handling */
window.addEventListener("load", () => {
    const playPromise = music.play();

    if (playPromise !== undefined) {
        playPromise.catch(() => {
            document.addEventListener("click", () => {
                music.play();
            }, { once: true });
        });
    }
});

/* Generate controlled scrambled collage */
function generateCollage() {

    const screenW = window.innerWidth;
    const screenH = window.innerHeight;

    const cols = 5;
    const rows = 4;

    const cellW = screenW / cols;
    const cellH = screenH / rows;

    let imgIndex = 1;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {

            if (imgIndex > totalImages) break;

            const img = document.createElement("img");
            img.src = "photos/" + imgIndex + ".jpg";
            img.className = "photo";

            const baseX = c * cellW;
            const baseY = r * cellH;

            const offsetX = (Math.random() - 0.5) * 50;
            const offsetY = (Math.random() - 0.5) * 50;

            img.style.width = (cellW * 0.85) + "px";
            img.style.height = "auto";

            img.style.left = (baseX + offsetX) + "px";
            img.style.top = (baseY + offsetY) + "px";

            const rotation = (Math.random() * 15) - 7;
            img.style.transform = "rotate(" + rotation + "deg)";

            collage.appendChild(img);

            imgIndex++;
        }
    }
}

generateCollage();

/* No button logic */
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const centerBox = document.querySelector(".center-box");

/* Make sure No is absolute inside center box */
noBtn.style.position = "absolute";

/* Place No next to Yes initially */
function positionNoNextToYes() {
    const yesRect = yesBtn.getBoundingClientRect();
    const boxRect = centerBox.getBoundingClientRect();

    const spacing = 20;

    const startX = yesRect.right - boxRect.left + spacing;
    const startY = yesRect.top - boxRect.top;

    noBtn.style.left = startX + "px";
    noBtn.style.top = startY + "px";
}

positionNoNextToYes();

/* Move safely inside center box */
function moveNoButton() {

    const boxWidth = centerBox.clientWidth;
    const boxHeight = centerBox.clientHeight;

    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    const padding = 10;

    const maxX = boxWidth - btnWidth - padding;
    const maxY = boxHeight - btnHeight - padding;

    const minX = padding;
    const minY = padding;

    const randomX = Math.random() * (maxX - minX) + minX;
    const randomY = Math.random() * (maxY - minY) + minY;

    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";
}

noBtn.addEventListener("mouseenter", moveNoButton);


/* Reposition if window resizes */
window.addEventListener("resize", positionNoNextToYes);

yesBtn.addEventListener("click", () => {

    /* Heart explosion */
    for (let i = 0; i < 120; i++) {

        const heart = document.createElement("div");
        heart.className = "heart";
        heart.innerHTML = "❤️";

        heart.style.left = "50%";
        heart.style.top = "50%";

        heart.style.setProperty("--x", (Math.random() - 0.5) * 2);
        heart.style.setProperty("--y", (Math.random() - 0.5) * 2);

        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 1600);
    }

    /* Create glow */
    const glow = document.createElement("div");
    glow.id = "glow";
    document.body.appendChild(glow);

    /* Create final photo */
    const img = document.createElement("img");
    img.src = "photos/1.jpg";
    img.id = "finalPhoto";
    document.body.appendChild(img);

    /* Animate both */
    setTimeout(() => {
    glow.classList.add("show");
}, 50);

setTimeout(() => {
    img.classList.add("show");
}, 200);

});

