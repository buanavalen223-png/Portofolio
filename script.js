/* ==========================================================================
   PORTFOLIO - JAVASCRIPT LOGIC & INTERACTIONS
   Buana Valen Putrangga | Modern Minimalist Dark Portfolio
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --------------------------------------------------------------------------
    // 1. Mobile Menu Toggle
    // --------------------------------------------------------------------------
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            const isActive = navLinks.classList.toggle('mobile-active');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.className = isActive ? 'fas fa-times' : 'fas fa-bars';
            }
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('mobile-active');
                const icon = mobileToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            });
        });

        // Close mobile menu when tapping outside the navbar
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('mobile-active') && !navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
                navLinks.classList.remove('mobile-active');
                const icon = mobileToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            }
        });
    }

    // --------------------------------------------------------------------------
    // 2. Intersection Observer for Scroll Reveals & Skill Progress Bars
    // --------------------------------------------------------------------------
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Animate progress bars when skills section is entered
                if (entry.target.id === 'skills') {
                    const progressFills = entry.target.querySelectorAll('.progress-bar-fill');
                    progressFills.forEach((fill, index) => {
                        const targetWidth = fill.getAttribute('data-progress') || '0%';
                        setTimeout(() => {
                            fill.style.width = targetWidth;
                        }, index * 150);
                    });
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section-container').forEach(sec => {
        sectionObserver.observe(sec);
    });

    // --------------------------------------------------------------------------
    // 3. Floating Navbar Scroll Effects & Active Link Tracking
    // --------------------------------------------------------------------------
    const header = document.getElementById('header');
    const navContainer = document.querySelector('.nav-container');
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        // Header shadow & compacting
        if (navContainer) {
            if (scrollY > 50) {
                navContainer.style.background = 'rgba(10, 14, 23, 0.9)';
                navContainer.style.boxShadow = '0 12px 35px -8px rgba(0, 0, 0, 0.7)';
                navContainer.style.borderColor = 'rgba(255, 255, 255, 0.12)';
            } else {
                navContainer.style.background = 'rgba(13, 18, 29, 0.75)';
                navContainer.style.boxShadow = '0 10px 30px -10px rgba(0, 0, 0, 0.5)';
                navContainer.style.borderColor = 'var(--border-subtle)';
            }
        }

        // Active link tracking
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 180;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navAnchors.forEach(anchor => {
            anchor.classList.remove('active');
            if (anchor.getAttribute('href') === `#${currentSectionId}`) {
                anchor.classList.add('active');
            }
        });
    }, { passive: true });

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --------------------------------------------------------------------------
    // 4. Subtle Modern Glowing Cursor
    // --------------------------------------------------------------------------
    const dot = document.querySelector('.cursor-dot');
    const glow = document.querySelector('.cursor-glow');

    if (dot && glow && window.innerWidth > 992) {
        let mouseX = 0, mouseY = 0;
        let glowX = 0, glowY = 0;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.style.transform = `translate3d(${mouseX - 3}px, ${mouseY - 3}px, 0)`;
        }, { passive: true });

        // Smooth trailing glow
        const animateCursor = () => {
            glowX += (mouseX - glowX) * 0.18;
            glowY += (mouseY - glowY) * 0.18;
            glow.style.transform = `translate3d(${glowX - 17}px, ${glowY - 17}px, 0)`;
            requestAnimationFrame(animateCursor);
        };
        requestAnimationFrame(animateCursor);

        // Hover expand effect
        const hoverTargets = document.querySelectorAll('a, button, .btn, .skill-card, .cert-card, .social-link, .cert-preview-box');
        hoverTargets.forEach(el => {
            el.addEventListener('mouseenter', () => {
                glow.style.width = '52px';
                glow.style.height = '52px';
                glow.style.transform = `translate3d(${glowX - 26}px, ${glowY - 26}px, 0)`;
                glow.style.borderColor = 'rgba(56, 189, 248, 0.9)';
                glow.style.background = 'rgba(56, 189, 248, 0.12)';
            });
            el.addEventListener('mouseleave', () => {
                glow.style.width = '34px';
                glow.style.height = '34px';
                glow.style.transform = `translate3d(${glowX - 17}px, ${glowY - 17}px, 0)`;
                glow.style.borderColor = 'rgba(56, 189, 248, 0.5)';
                glow.style.background = 'rgba(56, 189, 248, 0.04)';
            });
        });
    }

    // --------------------------------------------------------------------------
    // 5. Lightbox Modal for Certificate Previews
    // --------------------------------------------------------------------------
    const modal = document.getElementById('certModal');
    const modalImg = document.getElementById('imgModal');
    const closeBtn = document.getElementById('modalCloseBtn');
    const backdrop = document.querySelector('.modal-backdrop');

    const openModal = (src) => {
        if (!modal || !modalImg) return;
        modalImg.src = src;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        if (!modal) return;
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    // Zoom button and preview image triggers
    document.querySelectorAll('.cert-zoom-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const imgSrc = btn.getAttribute('data-img');
            if (imgSrc) openModal(imgSrc);
        });
    });

    document.querySelectorAll('.cert-preview-img').forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
            openModal(img.src);
        });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // --------------------------------------------------------------------------
    // 5b. Horizontal Certificate Carousel, Auto-Slide, Drag & Category Filter
    // --------------------------------------------------------------------------
    const certTrack = document.getElementById('certTrack');
    const certPrevBtn = document.getElementById('certPrevBtn');
    const certNextBtn = document.getElementById('certNextBtn');
    const certScrollBar = document.getElementById('certScrollBar');
    const filterBtns = document.querySelectorAll('.cert-filter-btn');
    const certCards = document.querySelectorAll('.cert-card[data-category]');

    const updateCertProgress = () => {
        if (!certTrack || !certScrollBar) return;
        const maxScroll = certTrack.scrollWidth - certTrack.clientWidth;
        if (maxScroll <= 5) {
            certScrollBar.style.width = '100%';
        } else {
            const scrollRatio = certTrack.scrollLeft / maxScroll;
            const percent = Math.max(20, Math.min(100, 20 + scrollRatio * 80));
            certScrollBar.style.width = `${percent}%`;
        }
    };

    let autoSlideTimer = null;
    let isCarouselPaused = false;

    const startCertAutoSlide = () => {
        if (!certTrack) return;
        stopCertAutoSlide();
        autoSlideTimer = setInterval(() => {
            if (isCarouselPaused) return;
            const maxScroll = certTrack.scrollWidth - certTrack.clientWidth;
            if (maxScroll <= 10) return;

            if (certTrack.scrollLeft >= maxScroll - 15) {
                certTrack.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                certTrack.scrollBy({ left: 370, behavior: 'smooth' });
            }
        }, 4200);
    };

    const stopCertAutoSlide = () => {
        if (autoSlideTimer) {
            clearInterval(autoSlideTimer);
            autoSlideTimer = null;
        }
    };

    if (certTrack) {
        certTrack.addEventListener('scroll', updateCertProgress, { passive: true });
        window.addEventListener('resize', updateCertProgress, { passive: true });
        setTimeout(updateCertProgress, 150);
        startCertAutoSlide();

        // Pause auto-slide when hovering or touching the carousel
        certTrack.addEventListener('mouseenter', () => { isCarouselPaused = true; });
        certTrack.addEventListener('mouseleave', () => { isCarouselPaused = false; });
        certTrack.addEventListener('touchstart', () => { isCarouselPaused = true; }, { passive: true });
        certTrack.addEventListener('touchend', () => {
            setTimeout(() => { isCarouselPaused = false; }, 2500);
        }, { passive: true });

        // Mouse Click-and-Drag Scrolling for Desktop
        let isDragging = false;
        let startX = 0;
        let scrollLeftStart = 0;

        certTrack.addEventListener('mousedown', (e) => {
            if (e.target.closest('button')) return;
            isDragging = true;
            certTrack.classList.add('dragging');
            startX = e.pageX - certTrack.offsetLeft;
            scrollLeftStart = certTrack.scrollLeft;
        });

        window.addEventListener('mouseup', () => {
            if (!isDragging) return;
            isDragging = false;
            certTrack.classList.remove('dragging');
        });

        certTrack.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - certTrack.offsetLeft;
            const walk = (x - startX) * 1.4;
            certTrack.scrollLeft = scrollLeftStart - walk;
        });

        if (certPrevBtn) {
            certPrevBtn.addEventListener('click', () => {
                const maxScroll = certTrack.scrollWidth - certTrack.clientWidth;
                if (certTrack.scrollLeft <= 10) {
                    certTrack.scrollTo({ left: maxScroll, behavior: 'smooth' });
                } else {
                    certTrack.scrollBy({ left: -370, behavior: 'smooth' });
                }
                startCertAutoSlide();
            });
        }

        if (certNextBtn) {
            certNextBtn.addEventListener('click', () => {
                const maxScroll = certTrack.scrollWidth - certTrack.clientWidth;
                if (certTrack.scrollLeft >= maxScroll - 15) {
                    certTrack.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    certTrack.scrollBy({ left: 370, behavior: 'smooth' });
                }
                startCertAutoSlide();
            });
        }
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterVal = btn.getAttribute('data-filter');
            let visibleIndex = 0;
            certCards.forEach(card => {
                const cat = card.getAttribute('data-category');
                card.classList.remove('filter-animate');
                if (filterVal === 'all' || cat === filterVal) {
                    card.classList.remove('hidden-cert');
                    void card.offsetWidth; // trigger reflow for smooth staggered animation
                    card.style.animationDelay = `${visibleIndex * 0.08}s`;
                    card.classList.add('filter-animate');
                    visibleIndex++;
                } else {
                    card.classList.add('hidden-cert');
                }
            });

            if (certTrack) {
                certTrack.scrollTo({ left: 0, behavior: 'smooth' });
                setTimeout(updateCertProgress, 200);
                startCertAutoSlide();
            }
        });
    });

    // --------------------------------------------------------------------------
    // 6. Delicate 3D Tilt Effect on Cards
    // --------------------------------------------------------------------------
    if (window.innerWidth > 992) {
        const tiltCards = document.querySelectorAll('.skill-card, .cert-card, .profile-card');
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((centerY - y) / centerY) * 4;
                const rotateY = ((x - centerX) / centerX) * 4;

                card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    // --------------------------------------------------------------------------
    // 7. Modern Three.js Ambient Constellation Network Background
    // --------------------------------------------------------------------------
    const initThreeAmbientBackground = () => {
        const container = document.getElementById('full-3d-canvas');
        if (!container || typeof THREE === 'undefined') return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 8;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Particle nodes
        const particleCount = window.innerWidth < 768 ? 60 : 120;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const velocities = [];

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 16;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 8;

            velocities.push({
                x: (Math.random() - 0.5) * 0.003,
                y: (Math.random() - 0.5) * 0.003,
                z: (Math.random() - 0.5) * 0.002
            });
        }
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        // Subtle electric cyan & indigo particles
        const particleMaterial = new THREE.PointsMaterial({
            size: 0.08,
            color: 0x38bdf8,
            transparent: true,
            opacity: 0.75,
            blending: THREE.AdditiveBlending
        });
        const particlesMesh = new THREE.Points(geometry, particleMaterial);
        scene.add(particlesMesh);

        // Thin connecting lines group
        const linesMaterial = new THREE.LineBasicMaterial({
            color: 0x38bdf8,
            transparent: true,
            opacity: 0.18,
            blending: THREE.AdditiveBlending
        });
        const linesGroup = new THREE.Group();
        scene.add(linesGroup);

        // Mouse Parallax Interaction
        let mouseX = 0, mouseY = 0;
        let targetX = 0, targetY = 0;

        window.addEventListener('mousemove', (event) => {
            mouseX = (event.clientX / window.innerWidth) - 0.5;
            mouseY = (event.clientY / window.innerHeight) - 0.5;
        }, { passive: true });

        // Animation Loop
        const maxDistance = 2.6;
        let frame = 0;

        const animate = () => {
            requestAnimationFrame(animate);
            frame++;

            // Update particle positions gently
            const pos = geometry.attributes.position.array;
            for (let i = 0; i < particleCount; i++) {
                pos[i * 3] += velocities[i].x;
                pos[i * 3 + 1] += velocities[i].y;
                pos[i * 3 + 2] += velocities[i].z;

                // Bounce at boundaries
                if (Math.abs(pos[i * 3]) > 8) velocities[i].x *= -1;
                if (Math.abs(pos[i * 3 + 1]) > 8) velocities[i].y *= -1;
                if (Math.abs(pos[i * 3 + 2]) > 4) velocities[i].z *= -1;
            }
            geometry.attributes.position.needsUpdate = true;

            // Reconstruct connecting lines every 2 frames for optimal performance
            if (frame % 2 === 0) {
                while (linesGroup.children.length > 0) {
                    const obj = linesGroup.children[0];
                    if (obj.geometry) obj.geometry.dispose();
                    linesGroup.remove(obj);
                }

                const linePositions = [];
                for (let i = 0; i < particleCount; i++) {
                    for (let j = i + 1; j < particleCount; j++) {
                        const dx = pos[i * 3] - pos[j * 3];
                        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
                        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
                        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                        if (dist < maxDistance) {
                            linePositions.push(
                                pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2],
                                pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]
                            );
                        }
                    }
                }

                if (linePositions.length > 0) {
                    const lineGeom = new THREE.BufferGeometry();
                    lineGeom.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
                    const lines = new THREE.LineSegments(lineGeom, linesMaterial);
                    linesGroup.add(lines);
                }
            }

            // Smooth parallax camera movement
            targetX += (mouseX * 0.8 - targetX) * 0.05;
            targetY += (-mouseY * 0.8 - targetY) * 0.05;
            scene.rotation.y = targetX * 0.3;
            scene.rotation.x = targetY * 0.3;

            renderer.render(scene, camera);
        };

        animate();

        // Resize handler
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }, { passive: true });
    };

    // Initialize 3D scene smoothly
    setTimeout(initThreeAmbientBackground, 300);
});
