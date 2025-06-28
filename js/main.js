document.addEventListener('DOMContentLoaded', () => {

    // loader functionality
    const main_loaderElm = document.querySelector('.main_loader');

    // setTimeout(()=>{
    //     main_loaderElm.style.display = 'none';
    //     document.body.style.overflowY = 'scroll'
    // }, 2000)

    main_loaderElm.style.display = 'none';
    document.body.style.overflowY = 'scroll'

    // home feature course swiper slider
    if (document.querySelector('.home_feat_swiper')) {
        const homeFeatSwiper = new Swiper('.home_feat_swiper', {
            slidesPerView: 3,
            // spaceBetween: 30,
            clickable: true,
            loop: true,
            effect: "coverflow",
            coverflowEffect: {
                rotate: 20,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            },
            centeredSlides: true,
            autoplay: {
                delay: 4000
            },
            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 40
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 80
                }
            }
        })
    }

    // marquee slider swiper slider
    if (document.querySelector('.marquee_slider')) {

        const marqueeSwiper = new Swiper(".marquee_slider", {
            spaceBetween: 0,
            centeredSlides: true,
            speed: 2000, // smoother marquee feel
            autoplay: {
                delay: 0,
                disableOnInteraction: false, // allows autoplay to continue after hover
            },
            loop: true,
            slidesPerView: 'auto',
            allowTouchMove: false,
        });
    }



    // added active class on header
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('active')
            localStorage.setItem('scrollY', 105)
        } else {
            header.classList.remove('active')
            localStorage.removeItem('scrollY')
        }
    })

    if (localStorage.getItem('scrollY')) {
        header.classList.add('active')
    } else {
        header.classList.remove('active')
    }

    // console.log(localStorage.getItem('scrollY'));


    // the year dynamically on footer
    const footerYearElm = document.querySelector('#footer_year');
    const date = new Date();
    const fullYear = date.getFullYear()
    footerYearElm.textContent = fullYear

    // add nav link style

    const jsPageNameElm = document.querySelector('#js_page_name')
    const pageNameValue = jsPageNameElm.value
    // const allPageNames = ['home', 'about'];

    if (pageNameValue === 'home') {
        document.querySelector('#home_nav_link').classList.add('active')
    } else {
        document.querySelector('#home_nav_link').classList.remove('active')
    }

    if (pageNameValue === 'credential') {
        document.querySelector('#cr_nav_link').classList.add('active')
    } else {
        document.querySelector('#cr_nav_link').classList.remove('active')
    }

    // add header bg if not on homepage
    if (pageNameValue !== 'home') {
        header.classList.add('header_bg');
    }

    // show box on certificate benefits
    const allCertBoxBtnElm = document.querySelectorAll('.crt_box_show_btn')
    const allCertBoxElm = document.querySelectorAll('.ben_cert_box')
    const crtsectionElm = document.getElementById('benefit_crd_certification')

    // default image
    const defaultBg = "./images/career.jpg";

    for (let i = 0; i < allCertBoxBtnElm.length; i++) {

        const btn = allCertBoxBtnElm[i]
        const bgImg = btn.getAttribute('data-image')

        allCertBoxBtnElm[i].addEventListener('mouseenter', () => {
            allCertBoxElm.forEach(box => {
                box.classList.remove('active')
            })
            allCertBoxElm[i].classList.add('active')
            crtsectionElm.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${bgImg}')`;
        })

        allCertBoxBtnElm[i].addEventListener('click', () => {
            allCertBoxElm.forEach(box => {
                box.classList.remove('active')
            })
            allCertBoxElm[i].classList.add('active')
            crtsectionElm.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${bgImg}')`;
        })

        allCertBoxBtnElm[i].addEventListener('mouseout', () => {
            allCertBoxElm.forEach(box => {
                box.classList.remove('active')
            })
            allCertBoxElm[0].classList.add('active')
            crtsectionElm.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${defaultBg}')`;
        })
    }


    // counter up vanilla js
    function animateCounter(counter, duration = 2000) {
        const target = +counter.getAttribute('data-target');
        let current = 0;
        const steps = 60; // number of frames
        const increment = target / steps;
        const intervalTime = duration / steps;

        const update = () => {
            current += increment;
            if (current < target) {
                counter.innerText = Math.floor(current);
                setTimeout(update, intervalTime);
            } else {
                counter.innerText = target;
            }
        };

        update();
    }

    // Set up Intersection Observer
    const statObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.stat_counter');
                counters.forEach(counter => animateCounter(counter, 2000)); // 💥 fixed here
                observer.unobserve(entry.target); // only run once
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% visible
    });

    // Observe the stats section
    const section = document.getElementById('home_stats');

    section && statObserver.observe(section);

    // home testimonial swiper
    if (document.querySelector('.ht_swiper')) {

        const ht_swiper = new Swiper('.ht_swiper', {
            loop: true,
            autoplay: {
                delay: 4000
            },
            pagination: {
                el: '.swiper-pagination',
                type: 'fraction'
            },
            // navigation: {
            //     nextEl: '.swiper-button-next',
            //     prevEl: '.swiper-button-prev',
            // },
        })
    }



    // ===================== learning path js
    // Interactive path cards
    document.querySelectorAll('.path-card').forEach(card => {
        card.addEventListener('mouseenter', function () {
            // Remove active class from all cards
            document.querySelectorAll('.path-card').forEach(c => c.classList.remove('active'));
            // Add active class to hovered card
            this.classList.add('active');
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animate cards on scroll
    document.addEventListener('DOMContentLoaded', function () {
        const cards = document.querySelectorAll('.path-card');

        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            card.style.transition = `all 0.6s ease ${index * 0.2}s`;
            observer.observe(card);
        });
    });

    // Parallax effect for floating elements
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-element');

        parallaxElements.forEach((element, index) => {
            const speed = 0.3 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.05}deg)`;
        });
    });

    // Path recommendation system (mock)
    function recommendPath() {
        const paths = ['tech', 'business', 'design', 'security'];
        const randomPath = paths[Math.floor(Math.random() * paths.length)];
        const pathCard = document.querySelector(`[data-path="${randomPath}"]`);

        // Highlight recommended path
        document.querySelectorAll('.path-card').forEach(card => {
            card.classList.remove('active');
        });
        pathCard.classList.add('active');

        // Scroll to recommended path
        pathCard.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }

    // Add click handlers for CTA buttons
    if (document.querySelector('.btn-primary-cta')) {

        document.querySelector('.btn-primary-cta').addEventListener('click', function (e) {
            e.preventDefault();
            recommendPath();
        });
    }

    // Add ripple effect to buttons

    document.querySelectorAll('.btn-explore, .btn-primary-cta').forEach(button => {
        button.addEventListener('click', function (e) {
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




    // ============================== back to top functionality ==============================

    const backToTopBtnElm = document.querySelector('.back_to_top')

    window.addEventListener('scroll', e => {
        if (this.scrollY > 100) {
            backToTopBtnElm.style.display = 'block'
        } else {
            backToTopBtnElm.style.display = 'none'
        }

    })

    if (backToTopBtnElm) {
        backToTopBtnElm.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        })
    }



})