document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;

    function showSlide(n) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    // 自動輪播
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);

    // 點擊導航點切換輪播
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });

    // 添加滾動顯示效果
    function handleScroll() {
        const workItems = document.querySelectorAll('.work-item');
        
        workItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (itemTop < windowHeight * 0.8) {
                item.classList.add('visible');
            }
        });
    }

    // 監聽滾動事件
    window.addEventListener('scroll', handleScroll);
    // 初始檢查
    handleScroll();

    // 添加回到頂部功能
    const backToTop = document.querySelector('.back-to-top');

    // 監聽滾動事件
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // 點擊回到頂部
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 模態框功能
    function initModal() {
        const modal = document.getElementById('workModal');
        const closeBtn = modal.querySelector('.close-modal');
        let currentModalSlide = 0;
        let modalSlides;
        let modalDots;
        let prevBtn;
        let nextBtn;

        // 打開模態框
        function openModal(workId, images, title, description) {
            const modalSlides = modal.querySelector('.modal-slides');
            const modalDots = modal.querySelector('.modal-dots');
            
            // 清空現有內容
            modalSlides.innerHTML = '';
            modalDots.innerHTML = '';
            currentModalSlide = 0;
            
            // 添加圖片
            images.forEach((image, index) => {
                modalSlides.innerHTML += `
                    <div class="modal-slide ${index === 0 ? 'active' : ''}">
                        <img src="${image}" alt="${title} ${index + 1}">
                    </div>
                `;
                
                modalDots.innerHTML += `
                    <div class="modal-dot ${index === 0 ? 'active' : ''}" data-index="${index}"></div>
                `;
            });
            
            // 設置標題和描述
            modal.querySelector('.modal-info h2').textContent = title;
            modal.querySelector('.modal-info p').textContent = description;
            
            // 顯示模態框
            modal.classList.add('show');
            
            // 更新輪播元素引用
            modalSlides = modal.querySelectorAll('.modal-slide');
            modalDots = modal.querySelectorAll('.modal-dot');
            prevBtn = modal.querySelector('.prev');
            nextBtn = modal.querySelector('.next');
        }

        // 切換輪播圖片
        function changeModalSlide(index) {
            const slides = modal.querySelectorAll('.modal-slide');
            const dots = modal.querySelectorAll('.modal-dot');
            
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;
            
            slides[currentModalSlide].classList.remove('active');
            dots[currentModalSlide].classList.remove('active');
            
            currentModalSlide = index;
            
            slides[currentModalSlide].classList.add('active');
            dots[currentModalSlide].classList.add('active');
        }

        // 綁定按鈕事件
        modal.querySelector('.prev').addEventListener('click', () => {
            changeModalSlide(currentModalSlide - 1);
        });

        modal.querySelector('.next').addEventListener('click', () => {
            changeModalSlide(currentModalSlide + 1);
        });

        // 綁定點擊導航點事件
        modal.querySelector('.modal-dots').addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-dot')) {
                const index = parseInt(e.target.dataset.index);
                changeModalSlide(index);
            }
        });

        // 關閉模態框
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
        });

        // 綁定 More 按鈕點擊事件
        document.querySelectorAll('.more-btn').forEach(button => {
            button.addEventListener('click', function() {
                const workId = this.dataset.workId;
                const images = JSON.parse(this.dataset.images);
                const title = this.closest('.work-content').querySelector('h2').textContent;
                const description = this.closest('.work-content').querySelector('p').textContent;
                
                openModal(workId, images, title, description);
            });
        });
    }

    // 初始化模態框
    initModal();
}); 