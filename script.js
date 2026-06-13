
        // === CONTROL DE SCROLLYTELLING ===
        window.addEventListener('scroll', () => {
            const zonaAnimacion = document.getElementById('zona-animacion');
            const solapa = document.getElementById('solapa');
            const carta = document.getElementById('carta');
            const instruccion = document.getElementById('instruccion');
            const partesFrontales = document.getElementById('partes-frontales');
            
            const esCelular = window.innerWidth <= 480;
            const escalaMaxima = esCelular ? 1.05 : 1.4; 

            const scrollDistancia = window.scrollY;
            const maxScrollZona = zonaAnimacion.offsetHeight - window.innerHeight;
            
            let progreso = scrollDistancia / maxScrollZona;
            if (progreso < 0) progreso = 0;
            if (progreso > 1) progreso = 1;

            let progresoSolapa = Math.min(progreso / 0.25, 1);
            solapa.style.transform = `rotateX(${progresoSolapa * 180}deg)`;
            solapa.style.zIndex = progresoSolapa > 0.5 ? 1 : 4;

            let translateY = 0;
            let scale = 1;

            if (progreso > 0.25) {
                if (progreso <= 0.5) {
                    let p = (progreso - 0.25) / 0.25; 
                    translateY = p * -170; 
                    scale = 1 + (p * 0.1); 
                } else {
                    let p = Math.min((progreso - 0.5) / 0.3, 1); 
                    translateY = -170 + (p * 170); 
                    scale = 1.1 + (p * (escalaMaxima - 1.1)); 
                }
                
                carta.style.transform = `translateY(${translateY}px) scale(${scale})`;
                carta.style.zIndex = progreso > 0.35 ? 10 : 2;
            } else {
                carta.style.transform = `translateY(0) scale(1)`;
                carta.style.zIndex = 2;
            }

            if (progreso > 0.5) {
                let progresoDesvanecer = Math.min((progreso - 0.5) / 0.2, 1);
                partesFrontales.style.opacity = 1 - progresoDesvanecer;
                solapa.style.opacity = 1 - progresoDesvanecer;
                document.querySelector('.parte-trasera').style.opacity = 1 - progresoDesvanecer;
            } else {
                partesFrontales.style.opacity = 1;
                solapa.style.opacity = 1;
                document.querySelector('.parte-trasera').style.opacity = 1;
            }

            instruccion.style.opacity = Math.max(1 - (progreso * 10), 0);
        });

        // === CONTROL DE MÚSICA ===
        const musica = document.getElementById('musica-fondo');
        const btnMusica = document.getElementById('btn-musica');
        let interaccionUsuario = false;

        const iniciarMusica = () => {
            if (!interaccionUsuario) {
                musica.play().then(() => {
                    btnMusica.innerHTML = '⏸️ Pausar Música';
                    interaccionUsuario = true;
                    window.removeEventListener('scroll', iniciarMusica);
                }).catch(error => {
                    console.log("Esperando interacción para audio.");
                });
            }
        };

        window.addEventListener('scroll', iniciarMusica, { once: true });

        btnMusica.addEventListener('click', () => {
            if (musica.paused) {
                musica.play();
                btnMusica.innerHTML = '⏸️ Pausar Música';
                interaccionUsuario = true; 
            } else {
                musica.pause();
                btnMusica.innerHTML = '🎵 Reproducir Música';
            }
        });

        