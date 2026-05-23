import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import "../Gallery.css";
import onlyMineSong from "../../Media/Song/Only Mine - Darshan Raval _ Siddharth B._ Youngveer _ Mir Desai _ Official Lyrical Video.mp3";

const galleryModules = import.meta.glob("../../Media/Gallery/*.{jpg,jpeg,png,webp,gif,JPG,JPEG,PNG,WEBP,GIF}", {
    eager: true,
    query: "?url",
    import: "default",
});

const galleryCaptions = [
    "1. The first accidental photo of us 🤣",
    "2. Our Snapchat era 😊",
    "3. The first official selfie on 14 Feb 2023 🤭",
    "4. On your birthday party 🙂",
    "5. The sudden dinner plan 🍽️",
    "6. When you told me to take break 🥺",
    "7. College days (Traditional Day) ✨",
    "8. College days (Denim Day) 😭",
    "9. College days (Group Day) 🤍",
    "10. Friends meetup 😊",
    "11. At Sharadotsav 🌙",
    "12. On Freshers 😌",
    "13. Friends meet 💫",
    "14. Mini meet 🫶",
    "15. School mini reunion 🥹",
    "16. At Poptos 🍟",
    "17. After movie: Mahavatar Narsimha 🎬",
    "18. Balling 🎳",
    "19. Freshers 😍",
    "20. Friends reunion 🤭",
    "21. On my birthday 😎",
    "22. When I got my new Alienware laptop 💻🤍",
    "23. On our first trip with friends 🗽",
];

const getFileName = (path) => path.split("/").pop();

const galleryImages = Object.entries(galleryModules)
    .sort(([pathA], [pathB]) => getFileName(pathA).localeCompare(getFileName(pathB), undefined, { numeric: true, sensitivity: "base" }))
    .map(([path, src], index) => ({
        src,
        name: getFileName(path),
        title: galleryCaptions[index] || `Memory ${index + 1}`,
    }));

const Gallery = () => {
    const [activePhoto, setActivePhoto] = useState(null);
    const galleryAudioRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") setActivePhoto(null);
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    useEffect(() => {
        const audio = galleryAudioRef.current;
        if (!audio) return;
        let autoplayRetryId;
        let stopAutoplayRetryId;

        const startGallerySong = () => {
            audio.volume = 0.38;
            audio.play().catch(() => {
                // Browsers may wait for the first click/tap before allowing audio.
            });
        };

        const handleCanPlay = () => startGallerySong();
        const handleFirstInteraction = () => startGallerySong();

        if (audio.readyState >= 2) {
            startGallerySong();
        }

        audio.addEventListener("canplay", handleCanPlay, { once: true });
        autoplayRetryId = setInterval(startGallerySong, 500);
        stopAutoplayRetryId = setTimeout(() => clearInterval(autoplayRetryId), 5000);
        window.addEventListener("pointerdown", handleFirstInteraction, { once: true });
        window.addEventListener("keydown", handleFirstInteraction, { once: true });

        return () => {
            audio.pause();
            clearInterval(autoplayRetryId);
            clearTimeout(stopAutoplayRetryId);
            audio.removeEventListener("canplay", handleCanPlay);
            window.removeEventListener("pointerdown", handleFirstInteraction);
            window.removeEventListener("keydown", handleFirstInteraction);
        };
    }, []);

    return (
        <main className="gallery-page">
            <audio ref={galleryAudioRef} src={onlyMineSong} preload="auto" autoPlay playsInline loop />
            <header className="gallery-header">
                <Link to="/" className="gallery-back" aria-label="Back to home">
                    <span aria-hidden="true">←</span>
                    Home
                </Link>
                <div>
                    <p className="gallery-kicker">Our Gallery</p>
                    <h1>23 Little Memories</h1>
                </div>
                <p className="gallery-count">{galleryImages.length} photos</p>
            </header>

            <section className="gallery-grid" aria-label="Photo gallery">
                {galleryImages.map((photo, index) => (
                    <button
                        className={`gallery-photo gallery-photo--${(index % 7) + 1}`}
                        key={photo.name}
                        onClick={() => setActivePhoto(photo)}
                        type="button"
                    >
                        <img src={photo.src} alt={photo.title} loading="lazy" />
                        <span>{photo.title}</span>
                    </button>
                ))}
            </section>

            {activePhoto && (
                <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label={activePhoto.title}>
                    <button className="gallery-lightbox__close" onClick={() => setActivePhoto(null)} type="button">
                        ×
                    </button>
                    <img src={activePhoto.src} alt={activePhoto.title} />
                    <p>{activePhoto.title}</p>
                </div>
            )}
        </main>
    );
};

export default Gallery;
