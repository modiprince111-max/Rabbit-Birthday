import React, { useEffect, useRef, useState } from 'react'
import rabbuThree from '../../Media/Image/Rabbu 3.jpg'
import teraHoGaya from '../../Media/Song/Tera Ho Gaya _ Darshan Raval _ Out of Control.mp3'
import oBeliyaSong from '../../Media/Song/O Beliya Official Music Video _ Darshan Raval _ Ahsaas Channa _ Naushad Khan _ Out Of Control.mp3'
import { GiCrossMark } from 'react-icons/gi'

const LETTER_SONG_END_TIME = 65
const LYRICS_START_TIME = 86
const LYRICS_END_TIME = 132

const birthdayMessageBeforeLyrics = [
    "First of all, before you start overthinking anything — yes this is going to be long,",
    'Now honestly… I thought a lot about what I should write for you this time because normal birthday wishes just don’t feel enough for "you".',
    "You already know that you're not a “happy birthday, stay blessed” kind of person in my life.",
    "You’re more like… a permanent habit at this point.",
    "A very cute, dramatic, sleep-loving, overthinking, impossible-to-ignore habit. 🫠",
    "And somewhere between all our random conversations, arguments, sarcasm, mood swings, Mercedes promises and those unexpectedly deep talks… you became someone extremely important to me.",
    "You know what’s funny?",
    "Sometimes I still sit and think how one person can be THIS caring and THIS annoying together. It should actually be scientifically studied. 🤨",
    "Like seriously, how do you manage to remember the tiniest things about me while also acting like you don’t care half the time?",
    "Super suspicious behavior honestly.",
    "But genuinely… thank you.",
    "For every effort you made silently.",
    "For every time you stayed even after misunderstandings.",
    "For tolerating my nonsense, my speed obsession, my weird timings, my disappearing acts, my overthinking, my moods… basically for surviving me till now 😭",
    "I know I don’t always express things perfectly, but trust me, your presence matters to me more than I probably say out loud.",
    "Thank you for every “sorry” I didn’t want to hear, for every “I hate you” that secretly meant “I care,” and for every time you chose to understand me even when I was difficult.",
    "Now birthday wishes part because apparently that’s important too 😌👇",
    "I wish you always find reasons to smile even on difficult days.",
    "I wish your overthinking mind learns how to rest sometimes.",
    "I wish you get enough sleep time at night.",
    "I wish life gives you the kind of happiness that stays longer than temporary moments.",
    "I wish you achieve every little dream you secretly keep in your heart.",
    "I wish nobody ever makes you feel “less” because you deserve softness, effort, reassurance, loyalty — all of it.",
    "I wish your future self looks back one day and feels proud of the person you became.",
    "And most importantly…",
    "I wish you never lose this version of yourself — because your heart is genuinely rare.",
    "Also yes, I still pray for the brave soul who has to handle your mood swings forever. May God give them strength in advance 🫡",
    "(and if it’s me then wow, what a dangerous lifetime subscription 😭)",
    "And before ending this mini novel —",
    "I just want you to know something very honestly:",
    "No matter how much we tease each other or act unserious… you hold a very special place in my life.",
    "A place nobody accidentally gets.",
    "So yeah,",
    "Happy Birthday to my favorite human, favorite headache, favorite comfort person, favorite overthinker, and forever favorite Rabbit 💗🐇",
    "And maybe this is the first time I’m admitting something like this so openly but…",
    "somewhere along the way, you stopped feeling like “just someone” in my life.",
    "Now whenever I think about my happiest moments, somehow you exist in almost all of them.",
    "My days feel incomplete without talking to you, my mind looks for you in everything, and even future thoughts somehow end up including you naturally.",
    "It’s strange honestly…",
    "because I never planned for someone to become this important to me.",
    "But with you, it happened quietly. Naturally. Effortlessly.",
    "And maybe that’s why, out of all the people in this world, you’re the one I want beside me for the longest time possible. 🤍",
    "And maybe I still don’t fully know how to explain what you became to me…",
    "But if I had to describe it somehow,",
    "maybe these lyrics come closest to the truth. 🤍🎧",
]

const lyricLines = [
    "“Teri baanhon mein main rehna chahoon har pal",
    "Tu jo hai mila, main badla sa hoon aajkal",
    "",
    "Mere khayalon mein chupke se tu aaye kyun",
    "Chehra yeh tera mujhko sukoon de jaaye kyun",
    "",
    "Pehli dafa hua hai yeh",
    "Dil mera nadaan saa",
    "",
    "Kaise kahe ab tujhe…",
    "",
    "You're the only one that I will ever love.” 🤍",
]

const birthdayMessageAfterLyrics = [
    "Because genuinely…",
    "these lyrics don’t just sound beautiful anymore.",
    "They sound like you.",
    "And honestly…",
    "sometimes the way we care, the way we get affected by each other, the way we always somehow come back to each other after every misunderstanding…",
    "it doesn’t feel normal anymore.",
    "Maybe we never said certain things directly.",
    "Maybe we both act unserious half the time.",
    "Maybe we hide things behind jokes, sarcasm, fake anger, and “I hate you” texts.",
    "But deep down…",
    "I think we both know this connection became something much more than ordinary a long time ago.",
    "And maybe you’ll never fully admit it.",
    "Maybe I’ll keep pretending not to notice it too.",
    "But still…",
    "out of everyone,",
    "you’re the one my heart keeps choosing naturally. 🤍",
    "And now-a-days I’m genuinely very angry with you… and you already know the reason 😒",
    "Matlab what the hell are you seriously?",
    "At the moon? Pluto? Or in some secret parallel universe?",
    "Because disappearing like you should actually be making me miss you way more than I should.",
    "But anyways…",
    "even after all that,",
    "you’re still my favorite notification to wait for. 🤍",
    "— Prince",
    "(the one and only, obviously)",
]

const BookCanvas = ({ active, setActive }) => {

    const [lyricsSceneActive, setLyricsSceneActive] = useState(false)
    const dropdownRef = useRef(null)
    const letterAudioRef = useRef(null)
    const lyricsAudioRef = useRef(null)
    const messageScrollRef = useRef(null)
    const lyricsSectionRef = useRef(null)
    const lyricsStartedRef = useRef(false)
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setActive(true)
        }
    }
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    useEffect(() => {
        const audio = letterAudioRef.current
        if (!audio) return

        const stopLetterSong = () => {
            audio.pause()
            audio.currentTime = 0
        }

        const handleTimeUpdate = () => {
            if (audio.currentTime >= LETTER_SONG_END_TIME) {
                stopLetterSong()
            }
        }

        audio.addEventListener("timeupdate", handleTimeUpdate)

        if (active || lyricsSceneActive || lyricsStartedRef.current) {
            stopLetterSong()
        } else {
            audio.volume = 0.55
            audio.currentTime = 0
            audio.play().catch(() => {
                // Some browsers block audio until the next direct user interaction.
            })
        }

        return () => {
            audio.removeEventListener("timeupdate", handleTimeUpdate)
        }
    }, [active, lyricsSceneActive])

    useEffect(() => {
        const lyricsAudio = lyricsAudioRef.current
        const lyricsSection = lyricsSectionRef.current
        const messageScroll = messageScrollRef.current
        if (!lyricsAudio) return

        const jumpToLyricStart = () => {
            try {
                lyricsAudio.currentTime = LYRICS_START_TIME
            } catch {
                // Metadata may not be ready yet; the next play attempt will seek again.
            }
        }

        const stopLyricsSong = () => {
            lyricsAudio.pause()
            jumpToLyricStart()
        }

        const playLyricsSong = () => {
            const letterAudio = letterAudioRef.current
            if (letterAudio) letterAudio.pause()

            lyricsAudio.volume = 0.62
            if (lyricsAudio.currentTime < LYRICS_START_TIME || lyricsAudio.currentTime >= LYRICS_END_TIME) {
                jumpToLyricStart()
            }
            lyricsAudio.play().catch(() => {
                // Browser audio policy may wait for another tap/key if autoplay is blocked.
            })
        }

        const handleTimeUpdate = () => {
            if (lyricsAudio.currentTime >= LYRICS_END_TIME) {
                stopLyricsSong()
            }
        }

        lyricsAudio.addEventListener("loadedmetadata", jumpToLyricStart, { once: true })
        lyricsAudio.addEventListener("timeupdate", handleTimeUpdate)

        if (active) {
            setLyricsSceneActive(false)
            lyricsStartedRef.current = false
            stopLyricsSong()
            return () => {
                lyricsAudio.removeEventListener("loadedmetadata", jumpToLyricStart)
                lyricsAudio.removeEventListener("timeupdate", handleTimeUpdate)
            }
        }

        if (!lyricsSection) {
            return () => {
                lyricsAudio.removeEventListener("loadedmetadata", jumpToLyricStart)
                lyricsAudio.removeEventListener("timeupdate", handleTimeUpdate)
            }
        }

        const revealLyricsScene = () => {
            setLyricsSceneActive(true)
            if (!lyricsStartedRef.current) {
                lyricsStartedRef.current = true
                playLyricsSong()
            }
        }

        const checkLyricsVisibility = () => {
            if (!lyricsSection) return

            const sectionRect = lyricsSection.getBoundingClientRect()
            const rootRect = messageScroll
                ? messageScroll.getBoundingClientRect()
                : { top: 0, bottom: window.innerHeight }
            const visibleTop = Math.max(sectionRect.top, rootRect.top)
            const visibleBottom = Math.min(sectionRect.bottom, rootRect.bottom)
            const visibleHeight = Math.max(0, visibleBottom - visibleTop)
            const visibleRatio = visibleHeight / Math.max(sectionRect.height, 1)

            if (visibleRatio >= 0.08 || (sectionRect.top < rootRect.bottom - 28 && sectionRect.bottom > rootRect.top + 28)) {
                revealLyricsScene()
            } else if (visibleRatio < 0.02) {
                setLyricsSceneActive(false)
            }
        }

        let scrollFrameId
        const handleScrollOrResize = () => {
            if (scrollFrameId) cancelAnimationFrame(scrollFrameId)
            scrollFrameId = requestAnimationFrame(checkLyricsVisibility)
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && entry.intersectionRatio >= 0.08) {
                    revealLyricsScene()
                } else if (!entry.isIntersecting || entry.intersectionRatio < 0.12) {
                    checkLyricsVisibility()
                }
            },
            {
                root: messageScroll || null,
                rootMargin: "0px 0px -5% 0px",
                threshold: [0, 0.05, 0.08, 0.2, 0.5],
            }
        )

        observer.observe(lyricsSection)
        messageScroll?.addEventListener("scroll", handleScrollOrResize, { passive: true })
        window.addEventListener("resize", handleScrollOrResize)
        const initialVisibilityTimer = setTimeout(checkLyricsVisibility, 150)

        return () => {
            observer.disconnect()
            messageScroll?.removeEventListener("scroll", handleScrollOrResize)
            window.removeEventListener("resize", handleScrollOrResize)
            clearTimeout(initialVisibilityTimer)
            if (scrollFrameId) cancelAnimationFrame(scrollFrameId)
            lyricsAudio.removeEventListener("loadedmetadata", jumpToLyricStart)
            lyricsAudio.removeEventListener("timeupdate", handleTimeUpdate)
        }
    }, [active])


    return (
        <div className={`boxMail ${active ? 'hidden opacity-0 pointer-events-none' : 'opacity-100 visible'} ${lyricsSceneActive ? 'lyrics-mode' : ''}`}>
            <audio ref={letterAudioRef} src={teraHoGaya} preload="auto" />
            <audio ref={lyricsAudioRef} src={oBeliyaSong} preload="auto" />

            <div onClick={() => setActive(!active)} className="crossAll">
                <GiCrossMark className="text-white" />
            </div>

            <div ref={dropdownRef} className={`boxMail-container duration-500 -translate-y-1/2 ${active ? 'top-0' : ' top-1/2'}`}>
                <div className="card1">
                    <div className="cover-text-wrapper">
                        <h3 className="cover-title">
                            Happy Birthday My Rabbuuu😚
                        </h3>
                        <p className="cover-subtitle">
                            — Prince
                        </p>
                    </div>

                    {/* User Image remains the same */}
                    <div className="userImg">
                        <img src={rabbuThree} alt="Recipient's Photo" />
                    </div>

                    {/* New Hello Kitty themed decoration */}
                    <div className="hello-kitty-bow-pattern"></div>

                    {/* Previous decorations, possibly updated for theme */}
                    <div className="card1-decoration-sparkle"></div>

                    <svg className="deco-shape top-right-star" viewBox="0 0 100 100">
                        <polygon points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35" fill="rgba(255, 255, 255, 0.6)" /> {/* Slightly more opaque */}
                    </svg>

                    <svg className="deco-shape bottom-left-ring" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" stroke="rgba(255, 255, 255, 0.7)" strokeWidth="5" fill="none" /> {/* Slightly more opaque */}
                        <circle cx="50" cy="50" r="20" fill="rgba(255, 255, 255, 0.3)" />
                    </svg>
                </div>

                <div className="card2">
                    <div className={`card2-content ${lyricsSceneActive ? 'card2-content--lyrics-active' : ''}`}>
                        <h3 className="card2-recipient">
                            Happy Birthday My Rabbuuu😚
                        </h3>

                        <div ref={messageScrollRef} className="card2-message-text">
                            {birthdayMessageBeforeLyrics.map((paragraph, index) => (
                                <article key={`before-${index}`} className="letter-paragraph">
                                    {paragraph}
                                </article>
                            ))}

                            <article
                                ref={lyricsSectionRef}
                                className={`lyrics-cinematic ${lyricsSceneActive ? 'is-visible' : ''}`}
                                aria-label="Special lyrics section"
                            >
                                <div className="lyrics-cinematic__stars" aria-hidden="true"></div>
                                <div className="lyrics-cinematic__lines">
                                    {lyricLines.map((line, index) => (
                                        line ? (
                                            <span
                                                className="lyrics-cinematic__line"
                                                key={`lyric-${index}`}
                                                style={{ "--line-index": index }}
                                            >
                                                {line}
                                            </span>
                                        ) : (
                                            <span
                                                className="lyrics-cinematic__gap"
                                                key={`lyric-gap-${index}`}
                                                style={{ "--line-index": index }}
                                                aria-hidden="true"
                                            />
                                        )
                                    ))}
                                </div>
                            </article>

                            {birthdayMessageAfterLyrics.map((paragraph, index) => (
                                <article key={`after-${index}`} className="letter-paragraph">
                                    {paragraph}
                                </article>
                            ))}
                        </div>

                        <div className="card2-decoration"></div> {/* Decoration */}

                        <div className="corner-ribbon top-left">
                            <svg className='w-13 h-13 absolute -top-5 -rotate-50 -left-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
                                <path fill="#af0c1a" d="M60.23 50.47s-10.56 2.98-19.38 8.8c-7.26 4.78-13.83 12.04-13.83 12.04l1.88 17.76L34.1 93l21.81-19.63s3.1-8.1 4.21-13.65c.58-2.86.88-5.66.88-5.66zm8.96 2.22s2.21 8.35 3.02 11.66c.92 3.74 2.69 9.82 2.69 9.82l21.69 15.42l8.2-16.05s-4.61-5.72-7.09-8.71s-16.57-12.72-16.57-12.72z" />
                                <path fill="#ff605e" d="M13.32 98.51s.75-6.87 6.39-16.69s8.41-11.53 8.41-11.53s3.26-.76 6.15-1.11c3.12-.38 5.72-.09 5.72-.09s-3.93 4.78-6.15 9.39s-3.59 8.97-1.96 9.82c1.62.85 3.43-5 6.92-10.33c3.67-5.62 6.47-8.38 6.47-8.38s2.8.09 5.72.96c3.23.96 5.02 2.6 5.02 2.6s-5.76 15.49-8.92 24.46s-7.72 20.87-8.83 21.3s-3.04-3.02-4.24-5.75s-5.29-17.25-5.55-16.99s-15.15 2.34-15.15 2.34M74.89 74.1s2.51-1.69 4.56-2.38c2.05-.68 5.68-1.26 5.68-1.26s2.18 4.26 3.88 7.17c1.71 2.9 4.49 8.88 6.28 8.02c1.79-.85-.51-6.89-1.84-9.56c-1.21-2.43-3.33-5.72-3.33-5.72s2.65-.34 7.51.6c4.87.94 7.17 2.56 7.17 2.56s4.5 6.68 6.92 10.76c3.22 5.44 7.26 14.68 7.26 14.68l-17.85 1.46l-8.97 19.64s-1.24.08-1.93-.34c-.68-.43-3.91-9.3-5.66-14.5c-2.75-8.21-9.68-31.13-9.68-31.13" />
                                <path fill="#dc0d28" d="M100.1 98.73c-.69.64-7.36 17.21-7.56 17.7c-1.03 2.54-2.44 3.12-2.44 3.12s1.21 1.74 3.26 1.14c1.58-.46 9.1-18.27 9.1-18.27s13.59.13 15.57-.73c2.22-.96.92-2.77.92-2.77s-17.93-1.05-18.85-.19m-86.75-.6s4.02-.73 7.72-1.71s8.44-2.37 8.44-2.37s3.74 10.22 4.86 13.65s4.04 11.1 4.04 11.1s-1.27 1.37-3.1.24c-1.71-1.06-4.98-10.1-5.84-12.5c-1.1-3.04-2.53-7.55-2.53-7.55s-3.88 1.29-7.11 1.88s-5.42 1.02-6.28.16c-.86-.85-.2-2.9-.2-2.9m33.01-69.16l-18.55-4.76L14.7 34.87l-5.44 26l2.97 5s3.22 2.46 12.28.44c9.06-2.03 29.52-9.91 29.52-9.91s2.61 1.08 4.95 1.4s6.33-.52 6.33-.52s5.02.82 8.01.61c2.98-.21 4.26-.53 4.26-.53s9.81 5.22 19.61 7.99s17.37 3.4 19.08 3.2c2.66-.32 3.94-4.8 3.94-4.8l-1.07-9.81l-14.28-30.7l-29.74 8.53l-1.81 2.03l-7.79-2.12l-10.57 2.08l-1.33-1.56z" />
                                <path fill="#ff605e" d="M54.59 33.37s1.18-3.66 10.07-3.66c8.29 0 9.41 3.28 9.41 3.28s1.08 7.2.1 13.44c-.87 5.58-3.96 11.41-3.96 11.41s-2.05.51-5.22.6c-2.99.08-6.17-.67-6.17-.67S56 52.8 54.81 46.56c-1.14-6.04-.22-13.19-.22-13.19" />
                                <path fill="#fcc4bf" d="M59.9 45.07c1.7.34 2.67-4.23 3.74-5.48c1.68-1.95 5.66-1.57 5.59-4.18c-.05-2.06-7.63-3.01-10.36.81c-1.9 2.67-1.68 8.31 1.03 8.85" />
                                <path fill="#ff605e" d="M75.11 31.77s1.13 1.38 2.13 3.86c.74 1.82 1.54 4.48 1.54 4.48s3.68-3.21 6.83-4.95c3.14-1.74 18.15-7.07 18.54.2c.31 5.91-10.75 5.79-15.94 7.9c-3.65 1.48-8.62 4.28-8.62 4.28v6.02s2.4 2.56 8.02 3.03s20.03.3 22.87.42c5.91.25 7.98 2.9 7.98 6.05c0 3.14-1.11 4.43-.74 4.84c.48.54 2.95-1.43 4.29-6.52s2.37-14.6 1.97-22.75c-.47-9.63-2.37-22.52-6.67-24.92s-16.84.8-24.2 3.95c-12.38 5.3-18 14.11-18 14.11m-24.74 7.97s.46-2.37 1.33-4.25c.68-1.47 1.93-3.28 1.93-3.28s-2.36-6.15-11.05-11.14s-26.87-8.89-32.66-6.69c-2.88 1.09-5.67 8.48-6.52 19.7c-.73 9.74.23 21.4 3.3 27.15c2.31 4.33 8.17 7.55 9.95 5.77c.87-.87-5.77-3.89.56-7.87c3.67-2.3 10.69-2.1 16.78-2.5s8.69-.1 11.89-.9s5.19-2 5.19-2s-.75-2.5-.9-3.7c-.21-1.64-.34-2.98-.34-2.98s-2.11-1.19-7.65-2.11c-5.43-.91-14.35-.71-14.48-6.69c-.17-7.59 8.59-5.69 12.68-4s9.49 4.99 9.99 5.49" />
                            </svg>
                        </div>
                        <div className="corner-ribbon bottom-right"></div>
                        <div className="confetti-dots"></div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookCanvas
