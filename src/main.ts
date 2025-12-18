import './style.css';

interface Slide {
    content: () => string;
}

const slides: Slide[] = [
    {
        // Intro slide
        content: () => {
            return `
                <div class="text-center overflow-x-hidden"> 
                    <h1 class="text-5xl font-bold mb-4
                               sm:text-8xl">
                        Hi, I'm Aelberth
                    </h1>
                    <p class="text-xl mb-2 text-navy/70
                              sm:text-3xl">
                        A Full Stack Developer
                    </p>
                    <a 
                        href="/assets/Aelberth_Cheong_CV_2025.pdf"
                        download
                        class="mt-16 inline-flex items-center gap-3
                               rounded-xl bg-navy px-6 py-3
                               text-white font-semibold text-lg
                               shadow-[0_4px_0_0_#d1d5db]
                               transition-all duration-150 ease-in-out
                               hover:-translate-y-1 hover:shadow-[0_6px_0_0_#d1d5db]
                               active:translate-y-1 active:shadow-[0_2px_0_0_#d1d5db]
                               focus:outline-none focus-visible:ring-2
                               focus-visible:ring-navy/50">
                        <i class="fas fa-file-alt"></i>
                        Download CV
                    </a>
                </div>
            `;
        }
    },
    {
        // About Me slide
        content: () => {
            const icons: Record<string, string> = {
                'Python': 'python',
                'Go': 'golang',
                'Javascript': 'js',
                'HTML': 'html5',
                'CSS': 'css3-alt',
                'Git': 'git-alt',
                'Docker': 'docker',
                'Linux': 'linux',
            }
            return `
                <div class="text-center">
                    <h1 class="text-5xl font-bold mb-4
                               sm:text-8xl">
                        About Me
                    </h1>
                    <p class="text-xl mb-2 text-navy/70
                               sm:text-3xl">
                        I like building cool things.
                    </p>
                    <h1 class="text-xl font-semibold mt-16
                               sm:text-3xl sm:mt-16 mb-6">
                        Languages & Tools
                    </h1>
                    <div class="flex flex-wrap justify-center gap-4">
                        ${Object.entries(icons).map(([name, icon]) => `
                            <span class="px-5 py-3 bg-navy text-white font-semibold rounded-xl text-sm select-none shadow-[0_4px_0_0_#d1d5db]
                                         md:text-lg
                                         hover:-translate-y-1 hover:shadow-[0_6px_0_0_#d1d5db]
                                         active:translate-y-1 active:shadow-[0_2px_0_0_#d1d5db]
                                         transition-all duration-150 ease-in-out cursor-pointer">
                                <i class="fa-brands fa-${icon} me-2"></i>${name}
                            </span>
                        `).join('')}
                    </div>
                </div>
            `;
        }
    },
    {
        content: () => {
            const projects = [
                {
                    name: 'Git-viewer',
                    description:
                        'A web-based platform where you can store, view, and share git repositories.',
                    link: 'https://github.com/albertcheong/git-viewer'
                },
                {
                    name: 'Grab',
                    description:
                        'A command-line tool written in Go for searching text using regular expressions.',
                    link: 'https://github.com/albertcheong/grab'
                },
                {
                    name: 'Portfolio website',
                    description: 'This website.',
                    link: 'https://github.com/albertcheong/albertcheong.github.io'
                }
            ];

            return `
                <div class="flex flex-col items-center justify-center h-full px-8">
                    <div class="mb-12 text-center">
                        <h1 class="text-5xl sm:text-8xl font-bold">
                            Projects
                        </h1>
                        <p class="mt-4 text-xl sm:text-3xl text-navy/70">
                            Featured projects I've worked on.
                        </p>
                    </div>
                    <div class="grid gap-8 w-full max-w-6xl
                                grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        ${projects
                            .map((project) => `
                                    <div class="group flex flex-col h-full rounded-2xl bg-white p-6 shadow-md
                                                transition-all duration-200
                                                hover:-translate-y-1 hover:shadow-xl
                                                focus-within:-translate-y-1 focus-within:shadow-xl">
                                        <div class="mb-4">
                                            <h3 class="text-xl sm:text-2xl font-bold">
                                                ${project.name}
                                            </h3>
                                            <p class="mt-1 text-sm sm:text-base">
                                                ${project.description}
                                            </p>
                                        </div>
                                        <div class="flex-1"></div>
                                        <div class="mt-4">
                                            <a href="${project.link}"
                                               target="_blank"
                                               rel="noopener noreferrer"
                                               class="inline-flex items-center gap-2 text-navy font-semibold
                                                      hover:underline focus:outline-none
                                                      focus-visible:ring-2 focus-visible:ring-navy/50
                                                      rounded-md">
                                                View project →
                                            </a>
                                        </div>
                                    </div>
                                `)
                            .join('')}
                    </div>
                </div>
            `;
        }
    },
    {
        content: () => {
            return `
                <div class="flex flex-col items-center justify-center h-full px-8 text-center">
                    <h1 class="text-5xl sm:text-8xl font-bold text-navy mb-12">
                        Contact Me
                    </h1>
                    <div class="flex items-center gap-10">
                        <a
                            href="mailto:aelberth.cheong@outlook.com"
                            aria-label="Email"
                            class="relative inline-flex items-center justify-center
                                text-navy text-2xl
                                transition-all duration-200 ease-out
                                hover:-translate-y-1 hover:rotate-[-4deg]
                                focus:outline-none focus-visible:ring-2
                                focus-visible:ring-navy/50
                                after:content-[''] after:absolute after:-bottom-2
                                after:left-1/2 after:h-1 after:w-1
                                after:-translate-x-1/2 after:rounded-full
                                after:bg-navy after:opacity-0
                                after:transition-opacity after:duration-200
                                hover:after:opacity-100">
                            <i class="fas fa-envelope text-6xl sm:text-7xl"></i>
                        </a>
                        <a
                            href="https://github.com/albertcheong"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            class="relative inline-flex items-center justify-center
                                text-navy text-2xl
                                transition-all duration-200 ease-out
                                hover:-translate-y-1 hover:rotate-[4deg]
                                focus:outline-none focus-visible:ring-2
                                focus-visible:ring-navy/50
                                after:content-[''] after:absolute after:-bottom-2
                                after:left-1/2 after:h-1 after:w-1
                                after:-translate-x-1/2 after:rounded-full
                                after:bg-navy after:opacity-0
                                after:transition-opacity after:duration-200
                                hover:after:opacity-100">
                            <i class="fab fa-github text-6xl sm:text-7xl"></i>
                        </a>
                        <a
                            href="https://linkedin.com/in/aelberthcheong"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            class="relative inline-flex items-center justify-center
                                text-navy text-2xl
                                transition-all duration-200 ease-out
                                hover:-translate-y-1 hover:rotate-[-4deg]
                                focus:outline-none focus-visible:ring-2
                                focus-visible:ring-navy/50
                                after:content-[''] after:absolute after:-bottom-2
                                after:left-1/2 after:h-1 after:w-1
                                after:-translate-x-1/2 after:rounded-full
                                after:bg-navy after:opacity-0
                                after:transition-opacity after:duration-200
                                hover:after:opacity-100">
                            <i class="fab fa-linkedin text-6xl sm:text-7xl"></i>
                        </a>
                    </div>
                </div>
            `;
        }
    }
];

function goToSlide(index: number): void {
    if (index === currentSlide) return;

    const container = document.getElementById('slide-container')!;
    const direction = index > currentSlide ? 1 : -1;

    container.style.transform = `translateX(${-60 * direction}px) scale(0.95)`;
    container.style.opacity = '0';

    container.addEventListener('transitionend', function handler() {
        container.removeEventListener('transitionend', handler);
        
        currentSlide = index;
        container.innerHTML = slides[index].content();

        container.style.transform = `translateX(${60 * direction}px) scale(0.95)`;
        container.style.opacity = '0';

        requestAnimationFrame(() => {
            container.style.transform = 'translateX(0) scale(1)';
            container.style.opacity = '1';
        });

        updateDots(index);
        window.location.hash = `#${index}`;
    }, { once: true });
}

function updateDots(index: number): void {
    const dots = document.querySelectorAll<HTMLDivElement>(".dot");
    dots.forEach((dot, i) => {
        dot.classList.toggle('opacity-100', i === index);
        dot.classList.toggle('scale-120', i === index);

        dot.classList.toggle('opacity-30', i !== index);
        dot.classList.toggle('scale-100', i !== index);
    });
}

function renderSlides(index: number): string {
    return `
        <div id="slide-container" class="slide w-full h-full flex items-center justify-center">
            ${slides[index].content()}
        </div>
    `;
}

function renderDots(): string {
    return `
        <div class=" flex justify-center p-8 z-50">
            <div class="rounded-full bg-white p-3.5 flex gap-2.5 shadow-lg">
                ${slides.map((_, i) => `
                    <div data-index="${i}" 
                         class="dot w-3 h-3 rounded-full bg-navy cursor-pointer
                                hover:scale-110 transition-all duration-300
                                ${i === 0 ? 'opacity-100' : 'opacity-30'}">
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function setupEventListeners(): void {
    const dots = document.querySelectorAll<HTMLDivElement>(".dot");
    dots.forEach((dot, i) => {
        dot.addEventListener("click", (e) => {
            e.preventDefault();
            goToSlide(i);
        });
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") {
            let index = clamp(currentSlide + 1, 0, slides.length - 1);
            goToSlide(index);
        } 
        else if (e.key === "ArrowLeft") {
            let index = clamp(currentSlide - 1, 0, slides.length - 1);
            goToSlide(index);
        }
    });

    const hash = window.location.hash;
    if (hash) {
        const index = parseInt(hash.replace('#', ''), 10);
        if (!isNaN(index) && index >= 0 && index < slides.length) {
            goToSlide(index);
        }
    }
}

function clamp(value: number, min: number, max: number): number {
    if (value < min) return min;
    if (value > max) return max;
    return value; 
}

function detectSwipe(elementId: string) {
    const touchsurface = document.getElementById(elementId);
    if (!touchsurface) return;

    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;

    const threshold = 150;
    const restraint = 100;

    touchsurface.addEventListener('touchstart', (e: TouchEvent) => {
        const touchObj = e.changedTouches[0];
        startX = touchObj.screenX;
        startY = touchObj.screenY;
    }, false);

    touchsurface.addEventListener('touchend', (e: TouchEvent) => {
        const touchObj = e.changedTouches[0];
        endX = touchObj.screenX;
        endY = touchObj.screenY;

        const deltaX = endX - startX;
        const deltaY = endY - startY;

        if (Math.abs(deltaX) >= threshold && Math.abs(deltaY) <= restraint) {
            if (deltaX > 0) {
                let index = clamp(currentSlide - 1, 0, slides.length - 1);
                goToSlide(index);
            } else {
                let index = clamp(currentSlide + 1, 0, slides.length - 1);
                goToSlide(index);
            }
        }
    }, false);
}

let currentSlide = 0;

function App(): void {
    const app = document.querySelector<HTMLDivElement>("#app")!;
    app.innerHTML = `
        <div class="h-dvh flex flex-col overflow-x-hidden">
            <div class="flex-1 flex items-center justify-center p-5">
                ${renderSlides(currentSlide)}
            </div>
            ${renderDots()}
        </div>
    `;
    detectSwipe("app");
    setupEventListeners();
}

App();