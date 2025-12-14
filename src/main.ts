import './style.css';

type SlideType = 'hero' | 'about' | 'projects' | 'contact';
type Direction = 'next' | 'prev' | 'initial';

const ANIMATION_TIMING = {
    SLIDE_TRANSITION: 500,
    INITIAL_FADE: 800
} as const;

const SWIPE_THRESHOLD = 50;
const SLIDE_TYPES: SlideType[] = ['hero', 'about', 'projects', 'contact'];

class SlideManager {
    private currentIndex: number = 0;
    private isAnimating: boolean = false;
    private touchStartX: number = 0;

    constructor() {
        this.initEventListeners();
    }

    get isAtStart(): boolean {
        return this.currentIndex === 0;
    }

    get isAtEnd(): boolean {
        return this.currentIndex === SLIDE_TYPES.length - 1;
    }

    render(direction: Direction = 'initial'): void {
        const slideContainer = document.querySelector<HTMLDivElement>('#slide-container')!;
        const indicatorsContainer = document.querySelector<HTMLDivElement>('#slide-indicators')!;

        indicatorsContainer.innerHTML = this.renderSlideIndicators();
        this.attachIndicatorListeners();
        this.animateSlideTransition(slideContainer, direction);
    }

    nextSlide(): void {
        if (this.isAnimating || this.isAtEnd) return;
        this.transitionTo(this.currentIndex + 1);
    }

    prevSlide(): void {
        if (this.isAnimating || this.isAtStart) return;
        this.transitionTo(this.currentIndex - 1);
    }

    goTo(index: number): void {
        if (this.isAnimating || index === this.currentIndex) return;
        this.transitionTo(index);
    }

    private transitionTo(target: number): void {
        const direction: Direction = target > this.currentIndex ? 'next' : 'prev';
        this.isAnimating = true;
        this.currentIndex = target;
        this.render(direction);
    }

    private initEventListeners(): void {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') this.nextSlide();
            if (e.key === 'ArrowLeft') this.prevSlide();
        });

        document.addEventListener('touchstart', (e) => {
            this.touchStartX = e.changedTouches[0].screenX;
        });

        document.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].screenX;
            const diff = this.touchStartX - touchEndX;
            if (Math.abs(diff) > SWIPE_THRESHOLD) {
                diff > 0 ? this.nextSlide() : this.prevSlide();
            }
        });
    }

    private animateSlideTransition(slideContainer: HTMLDivElement, direction: Direction): void {
        if (direction !== 'initial') {
            slideContainer.classList.add(direction === 'next' ? 'slide-out-left' : 'slide-out-right');
        }

        setTimeout(() => {
            slideContainer.innerHTML = renderSlideContent(SLIDE_TYPES[this.currentIndex]);
            slideContainer.classList.remove('slide-out-left', 'slide-out-right');
            
            if (direction === 'initial') {
                slideContainer.classList.add('fade-in');
                setTimeout(() => {
                    slideContainer.classList.remove('fade-in');
                    this.isAnimating = false;
                }, ANIMATION_TIMING.INITIAL_FADE);
            } else {
                slideContainer.classList.add(direction === 'next' ? 'slide-in-right' : 'slide-in-left');
                setTimeout(() => {
                    slideContainer.classList.remove('slide-in-right', 'slide-in-left');
                    this.isAnimating = false;
                }, ANIMATION_TIMING.SLIDE_TRANSITION);
            }
        }, direction === 'initial' ? 0 : ANIMATION_TIMING.SLIDE_TRANSITION);
    }

    private renderSlideIndicators(): string {
        return `
            <div class="flex items-center gap-4 bg-white rounded-full p-2 shadow-lg">
                <i id="prev" class="fa-solid fa-angle-left text-2xl transition-all ${
                    this.isAtStart ? 'text-navy/30 cursor-not-allowed' : 'text-navy cursor-pointer hover:scale-125'
                }"></i>
                <div class="flex gap-2">
                    ${SLIDE_TYPES.map(
                        (_, i) =>
                            `<div data-slide="${i}" class="w-3 h-3 rounded-full cursor-pointer transition-all hover:scale-110 ${
                                i === this.currentIndex ? 'bg-navy scale-125' : 'bg-navy/30'
                            }"></div>`
                    ).join('')}
                </div>
                <i id="next" class="fa-solid fa-angle-right text-2xl transition-all ${
                    this.isAtEnd ? 'text-navy/30 cursor-not-allowed' : 'text-navy cursor-pointer hover:scale-125'
                }"></i>
            </div>
        `;
    }

    private attachIndicatorListeners(): void {
        const prev = document.getElementById('prev');
        const next = document.getElementById('next');

        if (prev) {
            prev.addEventListener('click', () => this.prevSlide());
        }
        if (next) {
            next.addEventListener('click', () => this.nextSlide());
        }

        document.querySelectorAll('[data-slide]').forEach((el) => {
            el.addEventListener('click', () => this.goTo(Number((el as HTMLElement).dataset.slide)));
        });
    }
}

function renderSlideContent(type: SlideType): string {
    switch (type) {
        case 'hero':
            return renderHeroSlide();
        case 'about':
            return renderAboutSlide();
        case 'projects':
            return renderProjectsSlide();
        case 'contact':
            return renderContactSlide();
    }
}

function renderHeroSlide(): string {
    return `
        <div class="h-screen flex flex-col text-center justify-center text-navy px-8">
            <h1 class="text-4xl sm:text-6xl lg:text-8xl font-bold mb-4 animate-fade-in-up animation-delay-200">
                Hi, I'm Aelberth.
            </h1>
            <p class="text-xl sm:text-3xl mb-16 animate-fade-in-up animation-delay-400">
                A Fullstack Developer
            </p>
            <div class="mx-auto w-auto animate-fade-in animation-delay-600">
                <a class="inline-block font-bold text-lg sm:text-xl text-navy bg-white rounded-full py-4 px-6 shadow-lg
                          hover:shadow-xl hover:bg-gray-50 hover:-translate-y-1 
                          active:translate-y-0 active:shadow-md active:bg-navy active:text-white
                          transition-all duration-200 ease-in-out"
                   href="/assets/Aelberth_Cheong_CV_2025.pdf" 
                   download="Aelberth_Cheong_CV_2025.pdf">
                    <i class="fa-solid fa-file-arrow-down me-2"></i>DOWNLOAD CV
                </a>
            </div>
        </div>
    `;
}

function renderAboutSlide(): string {
    const langs: Record<string, string> = {
        'Python': 'python',
        'Go': 'golang',
        'Javascript': 'js',
        'HTML': 'html5',
        'CSS': 'css3-alt'
    };
    const tools: Record<string, string> = {
        'Postgres': 'deskpro',
        'Git': 'git-alt',
        'Docker': 'docker',
        'Linux': 'linux',
    };

    return `
        <div class="h-screen flex flex-col items-center justify-center text-navy px-8 py-12">
            <h2 class="text-4xl sm:text-6xl lg:text-8xl font-bold mb-6 animate-fade-in-up animation-delay-200">
                About Me
            </h2>
            <p class="text-lg sm:text-2xl mb-12 max-w-2xl text-center animate-fade-in-up animation-delay-400">
                I like building cool things.
            </p>
            
            <div class="flex flex-col gap-8 max-w-4xl w-full animate-fade-in animation-delay-600">
                <!-- Languages Section -->
                <div class="flex flex-col items-center">
                    <h3 class="text-xl sm:text-2xl font-bold mb-4">Languages</h3>
                    <div class="flex flex-wrap justify-center sm:justify-start gap-3">
                        ${Object.entries(langs).map(([lang, icon]) => `
                            <span class="px-5 py-3 bg-navy text-white font-semibold rounded-xl text-sm sm:text-base select-none
                                        shadow-[0_4px_0_0_rgb(209,213,219)]
                                        hover:-translate-y-1 hover:shadow-[0_6px_0_0_rgb(209,213,219)]
                                        active:translate-y-1 active:shadow-[0_2px_0_0_rgb(209,213,219)]
                                        transition-all duration-150 ease-in-out cursor-pointer">
                                <i class="fa-brands fa-${icon} me-2"></i>${lang}
                            </span>
                        `).join('')}
                    </div>
                </div>

                <!-- Tools Section -->
                <div class="flex flex-col items-center">
                    <h3 class="text-xl sm:text-2xl font-bold mb-4">Tools</h3>
                    <div class="flex flex-wrap justify-center sm:justify-end gap-3">
                        ${Object.entries(tools).map(([tool, icon]) => `
                            <span class="px-5 py-3 bg-navy text-white font-semibold rounded-xl text-sm sm:text-base select-none
                                        shadow-[0_4px_0_0_rgb(209,213,219)]
                                        hover:-translate-y-1 hover:shadow-[0_6px_0_0_rgb(209,213,219)]
                                        active:translate-y-1 active:shadow-[0_2px_0_0_rgb(209,213,219)]
                                        transition-all duration-150 ease-in-out cursor-pointer">
                                <i class="fa-brands fa-${icon} me-2"></i>${tool}
                            </span>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
}

interface Project {
    name: string;
    description: string;
    link: string;
}

function renderProjectsSlide(): string {
    const projects: Project[] = [
        { name: 'Git-viewer', description: 'A web-based platform where you can store, view, and share git repositories.', link: 'https://github.com/albertcheong/git-viewer' },
        { name: 'Grab', description: 'A command-line tool written in Go for searching text by lines that matches a regular expression.', link: 'https://github.com/albertcheong/grab' },
        { name: 'Portfolio website', description: 'My personal portfolio website showcasing my projects and skills.', link: 'https://github.com/albertcheong/albertcheong.github.io' }
    ];

    return `
        <div class="h-screen flex flex-col items-center justify-center text-navy px-8">
            <h2 class="text-4xl sm:text-6xl lg:text-8xl font-bold mb-12 animate-fade-in-up animation-delay-200">
                Projects
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full animate-fade-in animation-delay-400">
                ${projects.map((project) => 
                        renderProjectCard(project)
                    ).join('')}
            </div>
        </div>
    `;
}

function renderProjectCard(project: Project): string {
    return `
        <div class="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300}">
            <h3 class="text-xl sm:text-2xl font-bold mb-2">${project.name}</h3>
            <p class="text-gray-600 mb-4 text-sm sm:text-base">${project.description}</p>
            <a href="${project.link}" class="text-navy underline hover:text-navy/80 transition-colors">View Project →</a>
        </div>
    `;
}

function renderContactSlide(): string {
    const socialLinks = [
        { href: 'mailto:aelberth.cheong@outlook.com', icon: 'fa-envelope', label: 'Email' },
        { href: 'https://github.com/albertcheong', icon: 'fa-github', label: 'GitHub' },
        { href: 'https://linkedin.com/in/aelberthcheong', icon: 'fa-linkedin', label: 'LinkedIn' },
    ];

    return `
        <div class="h-screen flex flex-col items-center justify-center text-navy px-8">
            <h2 class="text-4xl sm:text-6xl lg:text-8xl font-bold mb-12 animate-fade-in-up animation-delay-200">
                Contact Me
            </h2>
            <div class="flex flex-row gap-8 sm:gap-16 text-2xl animate-fade-in-up animation-delay-400">
                ${socialLinks
                    .map(
                        (link) => `
                    <a href="${link.href}" 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       class="hover:-translate-y-1 active:translate-y-0 active:text-navy/50 transition-all duration-200 ease-in-out">
                        <i class="text-4xl sm:text-5xl ${link.icon === 'fa-envelope' ? 'fa-solid' : 'fa-brands'} ${link.icon}"></i>
                    </a>
                `
                    )
                    .join('')}
            </div>
        </div>
    `;
}


function App(): void {
    const app = document.querySelector<HTMLDivElement>('#app')!;
    app.innerHTML = `
        <div id="slide-container"></div>
        <div id="slide-indicators" class="fixed bottom-8 left-1/2 -translate-x-1/2 text-xl z-10"></div>
    `;

    const slideManager = new SlideManager();
    slideManager.render();
}

App();