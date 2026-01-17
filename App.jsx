import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const images = [
    '/src/assets/foto1.png',
    '/src/assets/foto2.jpg',
    '/src/assets/foto3.jpg'
  ]

  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const startX = useRef(0)

  // Lista de conciertos
  const conciertos = [
    { fecha: '15 de Febrero', lugar: 'Sala Rockera', ciudad: 'Madrid', hora: '21:00' },
    { fecha: '30 de Febrero', lugar: 'Sala Apolo', ciudad: 'Barcelona', hora: '23:00' },
  ]

  // Auto slide
  useEffect(() => {
    if (paused) return
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [paused, images.length])

  const next = () => setCurrent((current + 1) % images.length)
  const prev = () => setCurrent((current - 1 + images.length) % images.length)

  // Swipe móvil
  const handleTouchStart = (e) => { startX.current = e.touches[0].clientX }
  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX
    if (startX.current - endX > 50) next()
    if (endX - startX.current > 50) prev()
  }

  return (
    <>
      <header>
        <ul className="nav">
          <li>Inicio</li>
          <li>Sobre nosotros</li>
          <img src="/src/assets/logo.png" alt="Logo" />
          <li>Lanzamientos</li>
          <li>Contacto</li>
        </ul>
      </header>

      <main>
        <h2>OBTÉN NUESTRA CAMISETA PARA ANIMARNOS EN LOS CONCIERTOS</h2>

        {/* MERCH */}
        <div className="merch">
          <div className="product">
            <img src="/src/assets/camiseta.png" alt="Camiseta Blue Omelet" />
            <p>Camiseta básica Blue Omelet</p>
            <span>10.99€</span>
            <button>Comprar</button>
          </div>
          <div className="product">
            <img src="/src/assets/camiseta.png" alt="Camiseta Blue Omelet" />
            <p>Camiseta básica Blue Omelet</p>
            <span>10.99€</span>
            <button>Comprar</button>
          </div>
        </div>

        {/* GALERÍA */}
        <div
          className="galeria"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="slider" style={{ transform: `translateX(-${current * 100}%)` }}>
            {images.map((img, index) => (
              <img key={index} src={img} alt={`Foto ${index + 1}`} />
            ))}
          </div>

          <button className="arrow left" onClick={prev}>‹</button>
          <button className="arrow right" onClick={next}>›</button>

          <div className="dots">
            {images.map((_, index) => (
              <span
                key={index}
                className={current === index ? 'dot active' : 'dot'}
                onClick={() => setCurrent(index)}
              />
            ))}
          </div>
        </div>

        {/* CONCIERTOS */}
        <div className="conciertos">
          <h2>PRÓXIMOS CONCIERTOS</h2>

          <div className="info">
            <div>Fecha</div>
            <div>Lugar</div>
            <div>Ciudad</div>
            <div>Hora</div>
          </div>

          {conciertos.length > 0 ? (
            conciertos.map((c, i) => (
              <div className="concierto" key={i}>
                <div>{c.fecha}</div>
                <div>{c.lugar}</div>
                <div>{c.ciudad}</div>
                <div>{c.hora}</div>
              </div>
            ))
          ) : (
            <div className="noconciertos">No hay conciertos programados</div>
          )}
        </div>
      </main>
    </>
  )
}

export default App
