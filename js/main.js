document.addEventListener('DOMContentLoaded', ()=> {

    // loader functionality
    const main_loaderElm = document.querySelector('.main_loader');

    setTimeout(()=>{
        main_loaderElm.style.display = 'none';
        document.body.style.overflowY = 'scroll'
    }, 2000)


    if(document.querySelector('.marquee_slider')){

        const swiper = new Swiper(".marquee_slider", {
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

    window.addEventListener('scroll', ()=>{
        if(window.scrollY > 100){
            header.classList.add('active')
            localStorage.setItem('scrollY', 105)
        }else{
            header.classList.remove('active')
            localStorage.removeItem('scrollY')
        }
    })

    if(localStorage.getItem('scrollY')){
        header.classList.add('active')
    }else{
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

    if(pageNameValue === 'home'){
        document.querySelector('#home_nav_link').classList.add('active')
    }else{
        document.querySelector('#home_nav_link').classList.remove('active')
    }

    if(pageNameValue === 'credential'){
        document.querySelector('#cr_nav_link').classList.add('active')
    }else{
        document.querySelector('#cr_nav_link').classList.remove('active')
    }

    // add header bg if not on homepage
    if(pageNameValue !== 'home'){
        header.classList.add('header_bg');
    }

    // show box on certificate benefits
    const allCertBoxBtnElm = document.querySelectorAll('.crt_box_show_btn')
    const allCertBoxElm = document.querySelectorAll('.ben_cert_box')
    const crtsectionElm = document.getElementById('benefit_crd_certification')

    // default image
    const defaultBg = "./images/career.jpg";

    for(let i = 0; i < allCertBoxBtnElm.length; i++){

        const btn = allCertBoxBtnElm[i]
        const bgImg = btn.getAttribute('data-image')

        allCertBoxBtnElm[i].addEventListener('mouseenter', ()=>{
            allCertBoxElm.forEach(box => {
                box.classList.remove('active')
            })
            allCertBoxElm[i].classList.add('active')
            crtsectionElm.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${bgImg}')`;
        })

        allCertBoxBtnElm[i].addEventListener('click', ()=>{
            allCertBoxElm.forEach(box => {
                box.classList.remove('active')
            })
            allCertBoxElm[i].classList.add('active')
            crtsectionElm.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${bgImg}')`;
        })

        allCertBoxBtnElm[i].addEventListener('mouseout', ()=>{
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
    const observer = new IntersectionObserver((entries, observer) => {
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

    section && observer.observe(section);

    // home testimonial swiper
    if(document.querySelector('.ht_swiper')){

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

})