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
    // 3. Floating Navbar Scroll Effects, Top Scroll Progress & Active Link Tracking
    // --------------------------------------------------------------------------
    const header = document.getElementById('header');
    const navContainer = document.querySelector('.nav-container');
    const topScrollProgress = document.getElementById('topScrollProgress');
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        // Top scroll progress bar
        if (topScrollProgress) {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolledPct = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
            topScrollProgress.style.width = `${Math.min(100, Math.max(0, scrolledPct))}%`;
        }

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
        const tiltCards = document.querySelectorAll('.skill-card, .cert-card, .profile-card, .lab-card');
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
    // 6b. Hero Dynamic Role Typewriter Effect
    // --------------------------------------------------------------------------
    const heroTypingEl = document.getElementById('heroTypingText');
    let currentLang = 'en';

    const typingPhrases = {
        en: [
            'Cisco & MikroTik Enterprise Routing',
            'Zero-Trust Firewall & VPN Security',
            'Multi-Area OSPF & VLAN Topologies',
            'Linux Server & Zabbix Telemetry',
            'Clean UI/UX & Network Architecture'
        ],
        id: [
            'Routing Enterprise Cisco & MikroTik',
            'Keamanan Firewall & Arsitektur VPN',
            'Topologi Multi-Area OSPF & VLAN',
            'Administrasi Server Linux & Zabbix',
            'Desain UI/UX & Topologi Jaringan'
        ]
    };

    if (heroTypingEl) {
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const runTypewriter = () => {
            const list = typingPhrases[currentLang] || typingPhrases.en;
            const currentPhrase = list[phraseIndex % list.length];

            if (!isDeleting) {
                charIndex++;
                heroTypingEl.textContent = currentPhrase.substring(0, charIndex);
                if (charIndex === currentPhrase.length) {
                    isDeleting = true;
                    setTimeout(runTypewriter, 2000);
                    return;
                }
            } else {
                charIndex--;
                heroTypingEl.textContent = currentPhrase.substring(0, charIndex);
                if (charIndex === 0) {
                    isDeleting = false;
                    phraseIndex = (phraseIndex + 1) % list.length;
                }
            }

            const speed = isDeleting ? 35 : 65;
            setTimeout(runTypewriter, speed);
        };

        setTimeout(runTypewriter, 1000);
    }

    // --------------------------------------------------------------------------
    // 6c. Interactive Network CLI Terminal
    // --------------------------------------------------------------------------
    const terminalOutput = document.getElementById('terminalOutput');
    const terminalForm = document.getElementById('terminalForm');
    const terminalInput = document.getElementById('terminalInput');

    const appendTerminalLine = (html) => {
        if (!terminalOutput) return;
        const div = document.createElement('div');
        div.className = 'term-line';
        div.innerHTML = html;
        terminalOutput.appendChild(div);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    };

    const executeCliCommand = (rawCmd) => {
        const cmd = rawCmd.trim().toLowerCase();
        if (!cmd) return;

        appendTerminalLine(`<span class="text-emerald">valen@core:~$</span> <strong class="text-white">${rawCmd}</strong>`);

        switch (cmd) {
            case 'help':
                appendTerminalLine(
                    `<span class="text-cyan">Available CLI Commands:</span><br>` +
                    `&bull; <strong>whoami</strong> &mdash; Display engineer profile &amp; status<br>` +
                    `&bull; <strong>skills</strong> &mdash; Inspect core technical routing &amp; security stack<br>` +
                    `&bull; <strong>certs</strong>  &mdash; List all 7 verified Cisco, MikroTik &amp; Fortinet credentials<br>` +
                    `&bull; <strong>labs</strong>   &mdash; Jump to Featured Network Topologies<br>` +
                    `&bull; <strong>ping</strong>   &mdash; Test packet latency to valenputra14.my.id<br>` +
                    `&bull; <strong>clear</strong>  &mdash; Clear terminal buffer`
                );
                break;
            case 'whoami':
                appendTerminalLine(
                    `<strong class="text-white">Buana Valen Putrangga</strong> | Network &amp; Systems Engineer<br>` +
                    `Location: Bekasi, ID &bull; Focus: Cisco IOS, MikroTik RouterOS, Cybersecurity &amp; UI/UX.`
                );
                break;
            case 'skills':
                appendTerminalLine(
                    `<span class="text-cyan">[ROUTING]</span> Cisco IOS, MikroTik RouterOS, OSPF, BGP, VLAN 802.1Q (90%)<br>` +
                    `<span class="text-indigo">[SECURITY]</span> pfSense IDS/IPS, WireGuard VPN, Wireshark, Linux (82%)<br>` +
                    `<span class="text-emerald">[DESIGN]</span> Figma, Topology Architecture, Adobe Suite (85%)`
                );
                break;
            case 'certs':
                appendTerminalLine(
                    `<span class="text-emerald">Verified Credentials (7 Total):</span><br>` +
                    `1. CCNA: Introduction to Networks<br>` +
                    `2. CCNA: Switching, Routing &amp; Wireless Essentials<br>` +
                    `3. CCNA: Enterprise Networking, Security &amp; Automation<br>` +
                    `4. MikroTik MTCNA &amp; 5. MikroTik MTCRE<br>` +
                    `6. Fortinet Threat Landscape 3.0 &amp; 7. Fortinet Cybersecurity 3.0`
                );
                break;
            case 'labs':
                appendTerminalLine(`<span class="text-cyan">Navigating to #labs infrastructure section...</span>`);
                const labsSec = document.getElementById('labs');
                if (labsSec) labsSec.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'ping':
                appendTerminalLine(
                    `PING valenputra14.my.id (103.189.234.14): 56 data bytes<br>` +
                    `64 bytes from 103.189.234.14: icmp_seq=0 ttl=64 time=<span class="text-emerald">8.4 ms</span><br>` +
                    `64 bytes from 103.189.234.14: icmp_seq=1 ttl=64 time=<span class="text-emerald">7.9 ms</span><br>` +
                    `<span class="text-emerald">--- 0% packet loss &bull; Host Online &amp; Ready ---</span>`
                );
                break;
            case 'clear':
                if (terminalOutput) terminalOutput.innerHTML = '';
                appendTerminalLine(`<span class="term-sys">[SYSTEM]</span> Terminal buffer cleared. Type <span class="term-cmd-chip" data-cmd="help">help</span> for commands.`);
                break;
            default:
                appendTerminalLine(`<span style="color:#f87171;">Command not found: ${cmd}.</span> Type <strong>help</strong> for available commands.`);
        }
    };

    if (terminalForm && terminalInput) {
        terminalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const val = terminalInput.value;
            terminalInput.value = '';
            executeCliCommand(val);
        });
    }

    document.addEventListener('click', (e) => {
        const chip = e.target.closest('[data-cmd]');
        if (chip) {
            const cmd = chip.getAttribute('data-cmd');
            executeCliCommand(cmd);
        }
    });

    // --------------------------------------------------------------------------
    // 6d. Bilingual Language Switcher (English / Bahasa Indonesia)
    // --------------------------------------------------------------------------
    const translations = {
        en: {
            nav_about: 'About',
            nav_skills: 'Skills',
            nav_labs: 'Projects',
            nav_certs: 'Certificates',
            nav_contact: 'Contact',
            nav_hire: 'Hire Me',
            hero_status: 'Available for Network & Security Roles',
            hero_title_1: 'Building High-Performance &',
            hero_title_2: 'Secure Network Systems',
            hero_desc: 'Hi, I\'m <strong class="text-white">Buana Valen Putrangga</strong>. A Network and Computer Systems Engineering specialist focused on scalable IT infrastructure, Cisco & MikroTik dynamic routing, and proactive cybersecurity architectures.',
            hero_btn_certs: 'Explore Credentials',
            hero_btn_labs: 'View Lab Topologies',
            hero_btn_contact: 'Get In Touch',
            hero_stat_1: 'Certified Credentials',
            hero_stat_2: 'Enterprise Routing',
            hero_stat_3: 'Firewalls & Hardening',
            about_badge: '// 01. ABOUT ME',
            about_title: 'Background & Philosophy',
            about_subtitle: 'Transforming complex network topologies into secure, seamless, and resilient connectivity.',
            about_p1: 'Hello! My name is <strong class="text-white">Buana Valen Putrangga</strong>. Born in Bekasi on February 14, 2006, I discovered my passion for computer systems through an obsession with how data moves across global backbones in milliseconds.',
            about_p2: 'In my <span class="gradient-text-alt">Network and Computer Systems Engineering</span> studies, I do not just configure routers—I architect reliable, redundant communication pathways that stand strong against traffic surges and cyber threats.',
            about_p3: 'Whether deploying enterprise <strong class="text-white">MikroTik RouterOS</strong> configurations, provisioning <strong class="text-white">Cisco VLANs & OSPF</strong> routing, or auditing network security with pfSense and penetration testing tools, I focus on precision, security, and uptime.',
            about_kp1: 'Enterprise Routing & Switching',
            about_kp2: 'Firewall & VPN Security Architecture',
            about_kp3: 'Server & Linux Virtualization',
            about_kp4: 'Clean UI/UX & Technical Design',
            about_role: 'Network & Systems Engineer',
            skills_badge: '// 02. TECHNICAL CAPABILITIES',
            skills_title: 'Core Competencies & Stack',
            skills_subtitle: 'A balanced fusion of low-level networking, defense security, and modern digital design.',
            skill_lvl_1: 'Proficient',
            skill_1_title: 'Network Engineering',
            skill_1_desc: 'Designing, configuring, and maintaining active enterprise network architectures with high reliability.',
            skill_1_bar: 'Practical Mastery',
            skill_lvl_2: 'Advanced',
            skill_2_title: 'Cybersecurity & Systems',
            skill_2_desc: 'Hardening network parameters, monitoring threat traffic, and maintaining perimeter security.',
            skill_2_bar: 'Security Hygiene',
            skill_lvl_3: 'Creative',
            skill_3_title: 'UI/UX & Visual Design',
            skill_3_desc: 'Creating clean, intuitive interfaces, network topology diagrams, and structured technical documentation.',
            skill_3_bar: 'Visual Execution',
            labs_badge: '// 03. INFRASTRUCTURE PORTFOLIO',
            labs_title: 'Featured Network & Security Labs',
            labs_subtitle: 'Hands-on architectural deployments, enterprise routing topologies, and hardened server implementations.',
            lab_1_title: 'Multi-Area OSPF & High-Availability Enterprise Campus Network',
            lab_1_desc: 'Designed a redundant 3-tier hierarchical network combining Cisco Catalyst switches and MikroTik core routers with Inter-VLAN trunking, EtherChannel link aggregation, and automatic failover.',
            lab_2_title: 'Zero-Trust Perimeter Firewall, IDS/IPS & Encrypted VPN Gateway',
            lab_2_desc: 'Deployed a multi-zone pfSense security perimeter separating LAN, Guest, and DMZ servers. Integrated deep packet inspection, strict ACL firewall rules, and encrypted site-to-site VPN tunnels.',
            lab_3_title: 'ISP / RT-RW Net Bandwidth Management & Zabbix Server Monitoring',
            lab_3_desc: 'Engineered an end-to-end residential ISP architecture featuring MikroTik Hierarchical Token Bucket (HTB) Simple Queues, hotspot billing portal, and 24/7 SNMP health alerts via Zabbix on Linux VPS.',
            certs_badge: '// 04. VERIFIED CREDENTIALS',
            certs_title: 'Official Certifications',
            certs_subtitle: 'Globally accredited professional certifications earned in network infrastructure & cybersecurity.',
            contact_badge: '// 05. GET IN TOUCH',
            contact_title: 'Let\'s Collaborate on Future Infrastructure',
            contact_subtitle: 'I am actively seeking internship opportunities, infrastructure engineering roles, or collaborative tech projects. Reach out and let\'s start a conversation.'
        },
        id: {
            nav_about: 'Tentang',
            nav_skills: 'Keahlian',
            nav_labs: 'Proyek Lab',
            nav_certs: 'Sertifikat',
            nav_contact: 'Kontak',
            nav_hire: 'Hubungi Saya',
            hero_status: 'Tersedia untuk Magang & Proyek Jaringan / Keamanan Siber',
            hero_title_1: 'Membangun Infrastruktur &',
            hero_title_2: 'Sistem Jaringan Berkeamanan Tinggi',
            hero_desc: 'Halo, saya <strong class="text-white">Buana Valen Putrangga</strong>. Mahasiswa & Spesialis Teknik Rekayasa Komputer Jaringan yang berfokus pada infrastruktur IT berskala luas, perutean dinamis Cisco & MikroTik, serta arsitektur keamanan siber proaktif.',
            hero_btn_certs: 'Lihat Sertifikat',
            hero_btn_labs: 'Lihat Proyek Lab',
            hero_btn_contact: 'Hubungi Saya',
            hero_stat_1: 'Sertifikasi Resmi',
            hero_stat_2: 'Routing Enterprise',
            hero_stat_3: 'Firewall & Keamanan',
            about_badge: '// 01. TENTANG SAYA',
            about_title: 'Latar Belakang & Filosofi',
            about_subtitle: 'Mengubah topologi jaringan yang kompleks menjadi konektivitas yang aman, cepat, dan tangguh.',
            about_p1: 'Halo! Nama saya <strong class="text-white">Buana Valen Putrangga</strong>. Lahir di Bekasi pada 14 Februari 2006, ketertarikan saya pada sistem komputer berawal dari rasa ingin tahu tentang bagaimana paket data melintasi jaringan global dalam hitungan milidetik.',
            about_p2: 'Dalam studi <span class="gradient-text-alt">Teknik Rekayasa Komputer Jaringan</span>, saya tidak sekadar mengonfigurasi router—saya merancang jalur komunikasi redundan yang tangguh menghadapi lonjakan trafik maupun ancaman siber.',
            about_p3: 'Baik saat menerapkan konfigurasi <strong class="text-white">MikroTik RouterOS</strong> skala enterprise, membangun <strong class="text-white">VLAN & OSPF Cisco</strong>, maupun mengaudit keamanan dengan pfSense, fokus utama saya adalah presisi, keamanan, dan uptime.',
            about_kp1: 'Enterprise Routing & Switching',
            about_kp2: 'Arsitektur Keamanan Firewall & VPN',
            about_kp3: 'Administrasi Server & Virtualisasi Linux',
            about_kp4: 'Desain UI/UX & Dokumentasi Topologi',
            about_role: 'Network & Systems Engineer',
            skills_badge: '// 02. KAPABILITAS TEKNIS',
            skills_title: 'Kompetensi Utama & Teknologi',
            skills_subtitle: 'Perpaduan keahlian konfigurasi jaringan tingkat lanjut, pertahanan siber, dan desain visual modern.',
            skill_lvl_1: 'Mahir',
            skill_1_title: 'Network Engineering',
            skill_1_desc: 'Merancang, mengonfigurasi, dan memelihara arsitektur jaringan aktif berkeandalan tinggi.',
            skill_1_bar: 'Penguasaan Praktis',
            skill_lvl_2: 'Lanjutan',
            skill_2_title: 'Cybersecurity & Systems',
            skill_2_desc: 'Memperkuat parameter keamanan jaringan, memantau trafik ancaman, dan menjaga keamanan perimeter server.',
            skill_2_bar: 'Ketahanan Sistem',
            skill_lvl_3: 'Kreatif',
            skill_3_title: 'UI/UX & Visual Design',
            skill_3_desc: 'Menciptakan antarmuka modern yang intuitif, diagram topologi jaringan, dan dokumentasi teknis.',
            skill_3_bar: 'Eksekusi Visual',
            labs_badge: '// 03. PORTOFOLIO INFRASTRUKTUR',
            labs_title: 'Proyek Lab Jaringan & Keamanan Siber',
            labs_subtitle: 'Implementasi arsitektur nyata, simulasi topologi routing enterprise, dan pengamanan server.',
            lab_1_title: 'Jaringan Kampus Enterprise Multi-Area OSPF & High-Availability',
            lab_1_desc: 'Merancang jaringan hierarkis 3-layer redundan yang memadukan switch Cisco Catalyst dan router inti MikroTik dengan trunking Inter-VLAN, agregasi link EtherChannel, serta failover otomatis.',
            lab_2_title: 'Firewall Perimeter Zero-Trust, IDS/IPS & Gateway VPN Terenkripsi',
            lab_2_desc: 'Membangun perimeter keamanan pfSense multi-zona yang memisahkan jaringan LAN, Guest, dan server DMZ. Dilengkapi inspeksi paket mendalam, aturan ACL ketat, serta terowongan VPN terenkripsi.',
            lab_3_title: 'Manajemen Bandwidth ISP / RT-RW Net & Monitoring Server Zabbix',
            lab_3_desc: 'Merancang arsitektur jaringan ISP RT-RW Net lengkap dengan manajemen bandwidth MikroTik HTB QoS, portal hotspot, serta pemantauan kesehatan perangkat 24/7 menggunakan Zabbix di Linux VPS.',
            certs_badge: '// 04. KREDENSIAL TERSERTIFIKASI',
            certs_title: 'Sertifikasi Profesional Resmi',
            certs_subtitle: 'Sertifikasi berstandar industri global di bidang infrastruktur jaringan dan keamanan siber.',
            contact_badge: '// 05. HUBUNGI SAYA',
            contact_title: 'Mari Berkolaborasi Membangun Infrastruktur Masa Depan',
            contact_subtitle: 'Saya terbuka untuk peluang magang (internship), posisi Network/Security Engineer, maupun kolaborasi proyek IT. Silakan hubungi saya kapan saja!'
        }
    };

    const langSwitchBtn = document.getElementById('langSwitchBtn');
    const currentLangLabel = document.getElementById('currentLangLabel');

    if (langSwitchBtn) {
        langSwitchBtn.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'id' : 'en';
            if (currentLangLabel) {
                currentLangLabel.textContent = currentLang.toUpperCase();
            }

            const dict = translations[currentLang];
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (dict && dict[key]) {
                    el.innerHTML = dict[key];
                }
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
