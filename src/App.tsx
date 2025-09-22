import { useLayoutEffect, useRef, useState } from 'react'
import './css/style.min.css'
import './css/splide.min.css'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Splide, SplideSlide } from '@splidejs/react-splide'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const specialTl = useRef<gsap.core.Timeline>(null)

  const [hasEnter, setHasEnter] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  if (isPlaying) {
    audioRef.current?.play()
  } else {
    audioRef.current?.pause()
  }

  const handleClick = () => {
    specialTl.current?.restart()
    setHasEnter(true)
    setIsPlaying(true)
  }

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const quote = document.querySelectorAll<HTMLElement>('.quote .animate-item')
      gsap.from(quote, {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.5,
        scrollTrigger: {
          trigger: '.quote',
          start: 'top 40%',
          // markers: true,
        },
      })

      const about1 = document.querySelectorAll<HTMLElement>('.about1 .animate-item')
      gsap.from(about1, {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.5,
        scrollTrigger: {
          trigger: '.about1',
          start: 'top 50%',
          // markers: true,
        },
      })

      const about2 = document.querySelectorAll<HTMLElement>('.about2 .animate-item')
      gsap.from(about2, {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: { each: 0.5, from: 'end' },
        scrollTrigger: {
          trigger: '.about2',
          start: 'top 50%',
          // markers: true,
        },
      })

      const parentOrder = [1, 0, 2, 3]
      const parent1 = document.querySelectorAll<HTMLElement>('.parent1 .animate-item')
      const parent2 = document.querySelectorAll<HTMLElement>('.parent2 .animate-item')
      const parent1Order = parentOrder.map((i) => parent1[i])
      const parent2Order = parentOrder.map((i) => parent2[i])
      gsap.from(parent1Order, {
        y: 20,
        opacity: 0,
        duration: 1,
        stagger: (index) => {
          if (index === 0) return 0 // A
          if (index === 1) return 0.5 // B
          if (index === 2 || index === 3) return 1 // C & D 同時
          return index * 0.5 // 其他照規則延遲
        },
        scrollTrigger: {
          trigger: '.parent1',
          start: 'top 50%',
        },
      })
      gsap.from(parent2Order, {
        y: 20,
        opacity: 0,
        duration: 1,
        stagger: (index) => {
          if (index === 0) return 0 // A
          if (index === 1) return 0.5 // B
          if (index === 2 || index === 3) return 1 // C & D 同時
          return index * 0.5 // 其他照規則延遲
        },
        scrollTrigger: {
          trigger: '.parent2',
          start: 'top 50%',
        },
      })

      const theInfo = document.querySelectorAll<HTMLElement>('.theInfo .animate-item')
      gsap.from(theInfo, {
        y: 20,
        opacity: 0,
        duration: 1,
        stagger: (index) => {
          if (index === 0) return 0
          if (index === 1) return 0.5
          if (index === 2) return 1
          if (index === 3 || index === 7) return 1.5
          if (index === 4 || index === 8) return 2
          if (index === 5 || index === 9) return 2.5
          if (index === 6 || index === 10) return 3
          return index * 0.5
        },
        scrollTrigger: {
          trigger: '.theInfo',
          start: 'top 50%',
          // markers: true,
        },
      })

      const reply = document.querySelectorAll<HTMLElement>('.reply .animate-item')
      gsap.from(reply, {
        y: 30,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '.reply',
          start: 'top 60%',
          // markers: true,
        },
      })

      specialTl.current = gsap.timeline({ paused: true })
      specialTl.current.from('.landing-animate', {
        opacity: 0,
        duration: 1,
        delay: 1,
        stagger: (index) => {
          if (index === 2) return 0
          if (index === 0 || index === 3) return 0.6
          if (index === 1) return 1.2
          return index * 0.5
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const hide = hasEnter ? 'hide' : ''
  return (
    <>
      <button className="audio-btn" onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying && <img src="/images/音樂關.svg" alt="Play" />}
        {!isPlaying && <img src="/images/音樂.svg" alt="Play" />}
      </button>
      <audio ref={audioRef} src="/audio/Ikson Spring Vlog.mp3" autoPlay loop />
      <div className="bg"></div>
      <div className={`cover ${hide}`}>
        <img className="happy" src="/images/囍.png" alt="囍" />
        <div className="text">
          <p className="highlight">
            我們的故事
            <br className="desktop-hide" />
            走到新的篇章
            <br />
            <br />
            在最重要的一天
            <br />
            <br />
            想誠摯邀請您
            <br className="desktop-hide" />
            一同見證這份幸福
          </p>
        </div>
        <button className="btn" onClick={handleClick}>
          一同參與
        </button>
      </div>

      <div ref={containerRef} className="main">
        {/* LANDING */}
        <div className="landing max-width-1080">
          <p className="landing-animate">Sunny</p>
          <div>
            <img className="happy landing-animate" src="/images/囍.png" alt="囍" />
            <img className="landing-animate" src="/images/首圖.jpg" alt="首圖" />
          </div>
          <p className="landing-animate">Chuanyi</p>
        </div>

        {/* QUOTE */}
        <div className="quote">
          <img className="animate-item" src="/images/雙囍.png" alt="雙囍" />
          <div className="text">
            <p className="highlight text-md mb animate-item">
              偉大的愛情不是愛很多人，而是易生只愛霓。
            </p>
            <p className="highlight animate-item">
              A great love is not one who loves many,
              <br />
              but one who loves one woman for life.
            </p>
          </div>
        </div>

        {/* ABOUT */}
        <div className="max-width-1080">
          <div className="bg-light">
            <div className="img-title">
              <img src="/images/關於我們.png" alt="關於我們" />
            </div>
            <div className="about about1">
              <img className="animate-item" src="/images/傳易獨照.jpg" alt="傳易獨照" />
              <div className="text animate-item">
                <p className="title">
                  <span>許傳易</span>Chuanyi
                </p>
                <p>
                  生日:11/26
                  <br />
                  星座:射手
                  <br />
                  喜歡的影視:
                  <br className="desktop-hide" />
                  港片、海賊王
                  <br />
                  最討厭:
                  <br className="desktop-hide" />
                  房間亂、地板髒
                  <br />
                  最害怕:大貓咪
                  <br />
                  怎麼稱呼新娘:
                  <br />
                  大貓咪、鼻啊、
                  <br />
                  小可愛、老婆
                </p>
              </div>
            </div>
            <div className="about about2 second">
              <div className="text animate-item">
                <p className="title">
                  <span>林姍霓</span>Sunny
                </p>
                <p>
                  生日:02/19
                  <br />
                  星座:雙魚
                  <br />
                  喜歡的影視:
                  <br className="desktop-hide" />
                  浪漫愛情都市古裝穿越動作喜劇、動漫
                  <br />
                  最討厭:打掃房間
                  <br />
                  最害怕:
                  <br className="desktop-hide" />
                  蟑螂毛毛蟲
                  <br />
                  怎麼稱呼新郎:
                  <br className="desktop-hide" />
                  腦公、阿鼻、傳易、許傳易！
                </p>
              </div>
              <img className="animate-item" src="/images/姍霓獨照.jpg" alt="姍霓獨照" />
            </div>
            <div className="img-title bottom">
              <img src="/images/雙方父母.png" alt="雙方父母" />
            </div>
          </div>
        </div>

        {/* PARENTS */}
        <div>
          <div className="parent parent1 my max-width-800">
            <img className="name animate-item" src="/images/傳易.png" alt="傳易" />
            <img className="image animate-item" src="/images/parent1.jpg" alt="傳易父母" />
            <div className="left animate-item">
              <img src="/images/icon.svg" alt="icon" />
              <p className="highlight">傳易母親</p>
              <p>
                <span>MOTHER</span>
              </p>
              <p className="highlight">
                許慧虹<span>女士</span>
              </p>
            </div>
            <div className="right animate-item">
              <img src="/images/icon.svg" alt="icon" />
              <p className="highlight">傳易父親</p>
              <p>
                <span>FATHER</span>
              </p>
              <p className="highlight">
                管世傑<span>先生</span>
              </p>
            </div>
          </div>
          <div className="parent parent2 max-width-800">
            <img className="name animate-item" src="/images/姍霓.png" alt="姍霓" />
            <img className="image animate-item" src="/images/parent2.jpg" alt="姍霓父母" />
            <div className="left animate-item">
              <img src="/images/icon.svg" alt="icon" />
              <p className="highlight">姍霓父親</p>
              <p>
                <span>FATHER</span>
              </p>
              <p className="highlight">
                林進興<span>先生</span>
              </p>
            </div>
            <div className="right animate-item">
              <img src="/images/icon.svg" alt="icon" />
              <p className="highlight">姍霓母親</p>
              <p>
                <span>MOTHER</span>
              </p>
              <p className="highlight">
                江惠娟<span>女士</span>
              </p>
            </div>
          </div>
        </div>

        {/* INFO */}
        <div className="theInfo max-width-1080">
          <div className="bg-light">
            <div className="img-title">
              <img src="/images/婚禮資訊.png" alt="婚禮資訊" />
            </div>
            <div className="info">
              <div className="animate-item">
                <img className="icon" src="/images/符號.svg" alt="符號" />
                <p>
                  民國 114 年・國曆 12 月 7 日<br />
                  星期日・12:00PM
                </p>
              </div>
              <div className="animate-item">
                <img className="icon mt" src="/images/符號.svg" alt="符號" />
                <p>
                  朝暮良辰婚宴會館
                  <br />
                  台中文南店 3 樓<br />
                  風華B廳
                </p>
              </div>
              <p className="text-bg animate-item">
                <span>台中市南屯區文心南路99號</span>
              </p>
            </div>
            <div className="timeline">
              <div className="text">
                <p className="animate-item">10:30</p>
                <p className="animate-item">11:30</p>
                <p className="animate-item">12:00</p>
                <p className="animate-item">15:00</p>
              </div>
              <div className="line"></div>
              <div className="text">
                <p className="animate-item">文定儀式</p>
                <p className="animate-item">賓客入席</p>
                <p className="animate-item">開席</p>
                <p className="animate-item">送客合影</p>
              </div>
            </div>
            <div className="map">
              <p className="highlight chinese">地圖&停車資訊</p>
              <p className="highlight english">MAP&PARKING</p>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3641.1011690066584!2d120.64344307569858!3d24.133084978411155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34693db42c8e42b9%3A0x603e2b599c60bb5b!2z5pyd5pqu6Imv6L6w5ama5a605pyD6aSoIOWPsOS4reaWh-WNl-W6lyjljp_lpbPlhZLntIXlqZrlrrTmnIPppKgp!5e0!3m2!1szh-TW!2stw!4v1758212774317!5m2!1szh-TW!2stw"
                loading="lazy"
              ></iframe>
              <img src="/images/map.png" alt="map" />
            </div>
          </div>
        </div>

        {/* REPLY */}
        <div className="reply max-width-1080">
          <img src="/images/出席回覆.png" alt="出席回覆" />
          <a
            className="animate-item"
            href="https://docs.google.com/forms/d/e/1FAIpQLSdQOzYK9puPj9aDNKCPl2AplyZc0HZFRLHaRJ7EiC5kq6qMYw/viewform?usp=header"
          >
            <img src="/images/出席回覆按鈕.png" alt="出席回覆按鈕" />
          </a>
        </div>

        {/* PHOTO */}
        <div className="photo">
          <p className="highlight text">
            <span>PHOTO</span>
          </p>
          <Splide
            aria-label="My Favorite Images"
            options={{
              type: 'loop',
              padding: '10rem',
              arrows: false,
              autoplay: true,
              interval: 3000,
              speed: 2000,
              breakpoints: {
                575: {
                  padding: '2rem', // 螢幕寬度 ≤ 1024px 時
                },
              },
            }}
          >
            <SplideSlide>
              <img src="/images/carousel0.jpg" alt="Image" />
            </SplideSlide>
            <SplideSlide>
              <img src="/images/carousel1.jpg" alt="Image" />
            </SplideSlide>
            <SplideSlide>
              <img src="/images/carousel2.jpg" alt="Image" />
            </SplideSlide>
            <SplideSlide>
              <img src="/images/carousel3.jpg" alt="Image" />
            </SplideSlide>
            <SplideSlide>
              <img src="/images/carousel4.jpg" alt="Image" />
            </SplideSlide>
            <SplideSlide>
              <img src="/images/carousel5.jpg" alt="Image" />
            </SplideSlide>
          </Splide>
        </div>

        {/* FOOTER */}
        <div className="footer">
          <p className="highlight">
            姍霓 <span>Sunny</span>
          </p>
          <div className="circle"></div>
          <img src="/images/囍.png" alt="囍" />
          <p className="highlight">
            傳易 <span>Chuanyi</span>
          </p>
        </div>
      </div>
    </>
  )
}

export default App
