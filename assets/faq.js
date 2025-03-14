addEventListener('DOMContentLoaded', function () {
    if (document.querySelector('.content-for-layout').querySelector('.rocket-viscata-white-page')) {
        let parent = document.querySelector('.content-for-layout').querySelector('.rocket-viscata-white-page').querySelector('.viscata-white-page__container');
        let elAction = document.createElement('div');
        elAction.className = 'action-change-section';

        let viewAll = document.createElement('div');
        viewAll.className = 'action-title-white-pages view-all active';
        let viewAllText = document.createElement('p');
        viewAllText.textContent = 'View all';
        viewAll.appendChild(viewAllText);
        elAction.appendChild(viewAll);

        viewAll.addEventListener('click', function () {
            openViewAll();
        });

        let sections = [];
        document.querySelectorAll('.action-title-white-pages').forEach((item, index) => {
            item.classList.remove('hidden');
            elAction.appendChild(item);
            sections.push(item);
            item.addEventListener('click', function () {
                openSection(item);
            });
        });

        parent.insertBefore(elAction, parent.firstChild);
        parent.classList.add('section-parent-faq');

        function openQuery(el) {
            if (el.classList.contains('active')) {
                el.classList.remove('active');
            } else {
                if (document.querySelector('.viscata-white-page__content__wrapper.active')) {
                    document.querySelector('.viscata-white-page__content__wrapper.active').classList.remove('active');
                }
                el.classList.add('active');
            }
        }

        function openSection(el) {
            if (document.querySelector('.action-title-white-pages.active')) {
                document.querySelector('.action-title-white-pages.active').classList.remove('active');
            }
            el.classList.add('active');
            let idSectionActive = el.getAttribute('data-open');
            let elContent = document.getElementById(`${idSectionActive}`);
            document.querySelector('.viscata-white-page__content-fake').innerHTML = elContent.innerHTML;
            document.querySelector('.viscata-white-page__content-fake').querySelectorAll('.viscata-white-page__content__wrapper').forEach(item => {
                item.addEventListener('click', function () {
                    openQuery(item);
                });
            });
        }

        function openViewAll() {
            if (document.querySelector('.action-title-white-pages.active')) {
                document.querySelector('.action-title-white-pages.active').classList.remove('active');
            }
            viewAll.classList.add('active');
            let allContent = '';
            sections.forEach(section => {
                let idSection = section.getAttribute('data-open');
                let sectionContent = document.getElementById(idSection);
                if (sectionContent) {
                    allContent += sectionContent.innerHTML;
                }
            });
            document.querySelector('.viscata-white-page__content-fake').innerHTML = allContent;
            document.querySelector('.viscata-white-page__content-fake').querySelectorAll('.viscata-white-page__content__wrapper').forEach(item => {
                item.addEventListener('click', function () {
                    openQuery(item);
                });
            });
        }

        openViewAll();
    }
});
