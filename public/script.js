const video = document.getElementById('videoElement');
const canvas = document.getElementById('finalCanvas');

const photoSlots = document.querySelectorAll('.photo-slot');
const captureBtn = document.getElementById('captureBtn');
const processBtn = document.getElementById('processBtn');

const modal = document.getElementById('previewModal');
const resultImg = document.getElementById('resultImage');
const closeModal = document.querySelector('.close-modal');

const downloadBtn = document.getElementById('downloadBtn');
const shareBtn = document.getElementById('shareBtn');

let currentSlotIndex = 0;
let capturedImages = [null, null, null, null];
let currentFrameStyle = 'classic8';

async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { width: 1280, height: 720, facingMode: "user" }
        });
        video.srcObject = stream;
    } catch (err) {
        alert("Gagal mengakses kamera: " + err.message);
    }
}
startCamera();

window.selectSlot = function (index) {
    currentSlotIndex = index;

    photoSlots.forEach(slot => slot.classList.remove('active'));
    photoSlots[index].classList.add('active');

    const status = capturedImages[index]
        ? "Foto ulang slot ini?"
        : "Siap ambil foto!";
    document.getElementById('instruction').innerText =
        `Slot ${index + 1} dipilih. ${status}`;
};

window.setFrameStyle = function (style, el) {
    currentFrameStyle = style;

    document.querySelectorAll('.frame-option')
        .forEach(o => o.classList.remove('active'));

    if (el) el.classList.add('active');
};

captureBtn.addEventListener('click', () => {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = video.videoWidth;
    tempCanvas.height = video.videoHeight;

    const ctx = tempCanvas.getContext('2d');

    ctx.translate(tempCanvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0);

    const dataUrl = tempCanvas.toDataURL('image/png');
    capturedImages[currentSlotIndex] = dataUrl;

    const slot = photoSlots[currentSlotIndex];
    slot.innerHTML = `
        <img src="${dataUrl}">
        <button class="retake-btn"
            onclick="event.stopPropagation(); selectSlot(${currentSlotIndex})">
            <i class="fas fa-sync-alt"></i>
        </button>
    `;
    slot.classList.add('has-image');
    slot.style.border = "none";

    const next = capturedImages.findIndex(i => i === null);
    if (next !== -1) selectSlot(next);

    checkCompletion();
});

function checkCompletion() {
    const filled = capturedImages.filter(i => i !== null).length;
    if (filled === 4) {
        processBtn.disabled = false;
        document.getElementById('instruction').innerText =
            "Sempurna! Klik LIHAT HASIL ✨";
    }
}

processBtn.addEventListener('click', () => {
    processBtn.innerHTML = "MEMPROSES...";
    processBtn.disabled = true;

    generateFinalImage((url) => {
        resultImg.src = url;
        modal.style.display = "block";
        processBtn.innerHTML = '<i class="fas fa-magic"></i> LIHAT HASIL';
        processBtn.disabled = false;
    });
});

closeModal.onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; };

function generateFinalImage(callback) {
    const ctx = canvas.getContext('2d');

    const dateText = new Date().toLocaleDateString('id-ID');
    const timeText = new Date().toLocaleTimeString('id-ID', {
        hour: '2-digit', minute: '2-digit'
    });

    const bgColor = "#0a0a0a";
    const accentColor = "#660000";

    if (currentFrameStyle === 'classic8') {

        const stripW = 320;
        const padding = 25;
        const photoH = 210;
        const gap = 20;
        const headerH = 100;
        const footerH = 80;

        const stripH = headerH + (photoH * 4) + (gap * 3) + footerH;

        canvas.width = (stripW * 2) + 40;
        canvas.height = stripH;

        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const drawStrip = (x) => {
            const cx = x + stripW / 2;

            ctx.fillStyle = "#fff";
            ctx.font = "italic 700 24px 'Playfair Display'";
            ctx.textAlign = "center";
            ctx.fillText("Special Edition", cx, 50);

            ctx.font = "10px Montserrat";
            ctx.fillText("PHOTOBOOTH by @isnainoo", cx, 70);

            ctx.fillStyle = accentColor;
            ctx.fillRect(cx - 20, 80, 40, 2);

            let y = headerH;
            capturedImages.forEach(src => {
                if (!src) return;
                const img = new Image();
                img.src = src;

                ctx.fillStyle = accentColor;
                ctx.fillRect(x + padding - 2, y - 2,
                    stripW - padding * 2 + 4, photoH + 4);

                ctx.drawImage(img,
                    x + padding, y,
                    stripW - padding * 2, photoH);

                y += photoH + gap;
            });

            ctx.fillStyle = "#fff";
            ctx.font = "14px Montserrat";
            ctx.fillText(dateText, cx, stripH - 45);

            ctx.fillStyle = "#777";
            ctx.font = "10px monospace";
            ctx.fillText(`${timeText} • SURAKARTA`, cx, stripH - 25);
        };

        drawStrip(0);

        ctx.setLineDash([10, 10]);
        ctx.strokeStyle = "#333";
        ctx.beginPath();
        ctx.moveTo(stripW + 20, 20);
        ctx.lineTo(stripW + 20, stripH - 20);
        ctx.stroke();
        ctx.setLineDash([]);

        drawStrip(stripW + 40);
    }

    if (currentFrameStyle === 'grid4') {

        const box = 450;
        const gap = 20;
        const border = 40;
        const headerH = 120;

        canvas.width = box * 2 + gap + border * 2;
        canvas.height = headerH + box * 2 + gap + border;

        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#fff";
        ctx.font = "italic 700 50px 'Playfair Display'";
        ctx.textAlign = "center";
        ctx.fillText("PHOTOBOOTH", canvas.width / 2, 80);

        const pos = [
            [border, headerH],
            [border + box + gap, headerH],
            [border, headerH + box + gap],
            [border + box + gap, headerH + box + gap]
        ];

        capturedImages.forEach((src, i) => {
            if (!src) return;
            const img = new Image();
            img.src = src;

            const s = Math.min(img.width, img.height);
            const sx = (img.width - s) / 2;

            ctx.drawImage(img, sx, 0, s, s,
                pos[i][0], pos[i][1], box, box);

            ctx.strokeStyle = accentColor;
            ctx.lineWidth = 2;
            ctx.strokeRect(
                pos[i][0] + 10,
                pos[i][1] + 10,
                box - 20,
                box - 20
            );
        });

        ctx.fillStyle = "#666";
        ctx.font = "14px monospace";
        ctx.fillText(`${dateText} | ${timeText}`,
            canvas.width / 2, canvas.height - 20);
    }

    addNoiseOverlay(ctx, canvas.width, canvas.height);

    setTimeout(() => {
        callback(canvas.toDataURL('image/jpeg', 0.95));
    }, 150);
}

function addNoiseOverlay(ctx, w, h) {
    const img = ctx.getImageData(0, 0, w, h);
    const d = img.data;

    for (let i = 0; i < d.length; i += 4) {
        const n = (Math.random() - 0.5) * 15;
        d[i] += n; d[i + 1] += n; d[i + 2] += n;
    }
    ctx.putImageData(img, 0, 0);
}

downloadBtn.onclick = () => {
    const a = document.createElement('a');
    a.href = resultImg.src;
    a.download = `photobooth-${Date.now()}.jpg`;
    a.click();
};

shareBtn.onclick = () => {
    fetch(resultImg.src)
        .then(r => r.blob())
        .then(b => {
            const f = new File([b], "photo.jpg", { type: "image/jpeg" });
            if (navigator.canShare?.({ files: [f] })) {
                navigator.share({ files: [f] });
            } else alert("Browser tidak mendukung share.");
        });
};

window.addEventListener('keydown', (e) => {
    const validKeys = ['VolumeUp', 'VolumeDown', 'Enter', ' ', 'ArrowUp', 'ArrowDown'];

    if (validKeys.includes(e.key) || validKeys.includes(e.code)) {
        const modal = document.getElementById('previewModal');
        const isModalHidden = modal.style.display === "none" || modal.style.display === "";

        if (isModalHidden) {
            if (!captureBtn.disabled) {
                captureBtn.classList.add('active-press');
                setTimeout(() => captureBtn.classList.remove('active-press'), 200);
                captureBtn.click();
            }
        }
    }
});

const style = document.createElement('style');
style.innerHTML = `
    .btn-primary.active-press {
        transform: scale(0.95);
        background-color: #fff !important;
        color: #000 !important;
    }
`;
document.head.appendChild(style);
