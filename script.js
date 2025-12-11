// ============================================
// EFECTOS VISUALES AVANZADOS
// ============================================

// 1. CURSOR PERSONALIZADO CON EFECTO NEÓN
const cursorDot = document.getElementById('cursorDot');
const cursorOutline = document.getElementById('cursorOutline');

let mouseX = 0;
let mouseY = 0;
let outlineX = 0;
let outlineY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
});

// Animación suave del outline del cursor
function animateCursor() {
    outlineX += (mouseX - outlineX) * 0.1;
    outlineY += (mouseY - outlineY) * 0.1;
    
    cursorOutline.style.left = outlineX + 'px';
    cursorOutline.style.top = outlineY + 'px';
    
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Efecto hover en elementos interactivos
const interactiveElements = document.querySelectorAll('a, button, .proyecto-card, input, textarea');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorDot.style.transform = 'scale(1.5)';
        cursorOutline.style.transform = 'scale(2)';
        cursorOutline.style.borderColor = '#00f3ff';
    });
    
    el.addEventListener('mouseleave', () => {
        cursorDot.style.transform = 'scale(1)';
        cursorOutline.style.transform = 'scale(1)';
        cursorOutline.style.borderColor = '#00f3ff';
    });
});

// 2. SISTEMA DE PARTÍCULAS AVANZADO
const canvas = document.getElementById('particlesCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
    }
    
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.color = this.getRandomColor();
    }
    
    getRandomColor() {
        const colors = ['#00f3ff', '#ff00ff', '#9d00ff', '#00ff88', '#ffd700'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Rebote en los bordes
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        
        // Resetear si sale de la pantalla
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
        
        // Efecto de brillo
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

// Crear partículas
const particles = [];
const particleCount = 80;

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

// Conectar partículas cercanas
function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                ctx.beginPath();
                ctx.strokeStyle = particles[i].color;
                ctx.globalAlpha = (150 - distance) / 150 * 0.3;
                ctx.lineWidth = 1;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
                ctx.globalAlpha = 1;
            }
        }
    }
}

// Animación de partículas
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    connectParticles();
    
    requestAnimationFrame(animateParticles);
}
animateParticles();

// 3. EFECTOS DE RAYOS DE LUZ ANIMADOS
const lightRay1 = document.getElementById('lightRay1');
const lightRay2 = document.getElementById('lightRay2');

function animateLightRays() {
    let angle1 = 0;
    let angle2 = 180;
    
    setInterval(() => {
        angle1 += 0.5;
        angle2 -= 0.5;
        
        const x1 = window.innerWidth / 2 + Math.cos(angle1 * Math.PI / 180) * 300;
        const y1 = window.innerHeight / 2 + Math.sin(angle1 * Math.PI / 180) * 300;
        
        const x2 = window.innerWidth / 2 + Math.cos(angle2 * Math.PI / 180) * 300;
        const y2 = window.innerHeight / 2 + Math.sin(angle2 * Math.PI / 180) * 300;
        
        lightRay1.style.left = x1 + 'px';
        lightRay1.style.top = y1 + 'px';
        
        lightRay2.style.left = x2 + 'px';
        lightRay2.style.top = y2 + 'px';
    }, 16);
}
animateLightRays();

// 4. EFECTO DE TYPING EN EL TÍTULO HERO
const heroTitle = document.querySelector('.hero-title');
const originalText = heroTitle.textContent;

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Reiniciar typing al hacer scroll a la sección hero
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.id === 'inicio') {
            setTimeout(() => {
                typeWriter(heroTitle, originalText, 80);
            }, 500);
        }
    });
}, observerOptions);

observer.observe(document.getElementById('inicio'));

// 5. EFECTO PARALLAX EN SCROLL
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - scrolled / 500;
    }
    
    // Parallax en las tarjetas de proyectos
    const cards = document.querySelectorAll('.proyecto-card');
    cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const cardTop = rect.top + window.pageYOffset;
        const scrollPosition = window.pageYOffset + window.innerHeight;
        
        if (scrollPosition > cardTop && window.pageYOffset < cardTop + rect.height) {
            const offset = (scrollPosition - cardTop) * 0.1;
            card.style.transform = `translateY(${offset}px) rotateX(${offset * 0.05}deg)`;
        }
    });
});

// 6. ANIMACIÓN AL HACER SCROLL (Intersection Observer)
const animatedElements = document.querySelectorAll('.proyecto-card, .sobre-mi-content, .contacto-form');

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    scrollObserver.observe(el);
});

// 7. EFECTO DE GLITCH MEJORADO EN TÍTULOS
function addGlitchEffect(element) {
    const text = element.textContent;
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    setInterval(() => {
        if (Math.random() > 0.9) {
            let glitchedText = '';
            for (let i = 0; i < text.length; i++) {
                if (Math.random() > 0.9 && text[i] !== ' ') {
                    glitchedText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
                } else {
                    glitchedText += text[i];
                }
            }
            element.textContent = glitchedText;
            
            setTimeout(() => {
                element.textContent = text;
            }, 100);
        }
    }, 2000);
}

const sectionTitles = document.querySelectorAll('.section-title');
sectionTitles.forEach(title => {
    addGlitchEffect(title);
});

// 8. EFECTO DE ONDAS EN LOS BOTONES
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// 9. EFECTO DE BRillo EN EL HEADER AL HACER SCROLL
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 0 50px rgba(0, 243, 255, 0.4)';
        header.style.borderBottomColor = '#00f3ff';
    } else {
        header.style.boxShadow = '0 0 30px rgba(0, 243, 255, 0.2)';
        header.style.borderBottomColor = 'rgba(0, 243, 255, 0.3)';
    }
    
    lastScroll = currentScroll;
});

// 10. EFECTO DE HOVER MAGNÉTICO EN TARJETAS
document.querySelectorAll('.proyecto-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const moveX = (x - centerX) / 10;
        const moveY = (y - centerY) / 10;
        
        card.style.transform = `translateY(-15px) translateX(${moveX}px) translateY(${moveY}px) rotateY(${moveX * 0.1}deg) rotateX(${-moveY * 0.1}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) translateX(0) translateY(0) rotateY(0) rotateX(0)';
    });
});

// 11. EFECTO DE PARTÍCULAS AL HACER CLIC
document.addEventListener('click', (e) => {
    for (let i = 0; i < 15; i++) {
        createClickParticle(e.clientX, e.clientY);
    }
});

function createClickParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'click-particle';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    
    const colors = ['#00f3ff', '#ff00ff', '#9d00ff', '#00ff88'];
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    document.body.appendChild(particle);
    
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 5 + 2;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;
    
    let px = x;
    let py = y;
    let opacity = 1;
    
    function animate() {
        px += vx;
        py += vy;
        opacity -= 0.02;
        
        particle.style.left = px + 'px';
        particle.style.top = py + 'px';
        particle.style.opacity = opacity;
        
        if (opacity > 0) {
            requestAnimationFrame(animate);
        } else {
            particle.remove();
        }
    }
    
    animate();
}

// 12. FORMULARIO CON EFECTOS ESPECIALES
const formInputs = document.querySelectorAll('input, textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
        this.style.boxShadow = '0 0 30px rgba(0, 243, 255, 0.6)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
        if (!this.value) {
            this.style.boxShadow = '0 0 10px rgba(0, 243, 255, 0.1)';
        }
    });
    
    input.addEventListener('input', function() {
        if (this.value) {
            this.style.borderColor = '#00ff88';
        } else {
            this.style.borderColor = 'rgba(0, 243, 255, 0.3)';
        }
    });
});

// 13. PREVENIR ENVÍO DEL FORMULARIO Y MOSTRAR EFECTO
document.getElementById('contactoForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const button = e.target.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    
    button.textContent = 'ENVIANDO...';
    button.style.background = 'linear-gradient(45deg, #00ff88, #00f3ff)';
    
    setTimeout(() => {
        button.textContent = '✓ ENVIADO';
        button.style.background = 'linear-gradient(45deg, #00ff88, #00ff88)';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
            e.target.reset();
            formInputs.forEach(input => {
                input.style.borderColor = 'rgba(0, 243, 255, 0.3)';
            });
        }, 2000);
    }, 1500);
});

// 14. EFECTO DE SCANLINE (línea de escaneo)
function createScanline() {
    const scanline = document.createElement('div');
    scanline.className = 'scanline';
    document.body.appendChild(scanline);
    
    let position = -2;
    
    function animate() {
        position += 2;
        if (position > window.innerHeight + 2) {
            position = -2;
        }
        scanline.style.top = position + 'px';
        requestAnimationFrame(animate);
    }
    
    setTimeout(animate, Math.random() * 2000);
}
createScanline();

// 15. EFECTO DE DISTORSIÓN EN IMÁGENES AL HOVER
document.querySelectorAll('.proyecto-img').forEach(img => {
    img.addEventListener('mouseenter', function() {
        this.style.filter = 'brightness(1.2) contrast(1.2) saturate(1.3)';
    });
    
    img.addEventListener('mouseleave', function() {
        this.style.filter = 'brightness(0.7)';
    });
});

console.log('%c✨ Portafolio de Videojuegos ✨', 'color: #00f3ff; font-size: 20px; font-weight: bold;');
console.log('%cEfectos visuales cargados correctamente', 'color: #00ff88; font-size: 12px;');

