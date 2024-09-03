window.onload = function(){
    const parallax = document.querySelector('.parallax');

    if (parallax) {
        const content = parallax.querySelector('.parallax__container');
        const clouds = parallax.querySelector('.images-parallax__clouds');
        const mountains = parallax.querySelector('.images-parallax__mountains');
        const human = parallax.querySelector('.images-parallax__human');

        const forClouds = 40;
        const forMountains = 20;
        const forHuman = 10;

        // скорость анимации
        const speed = 0.05;

        let positionX = 0, positionY = 0;
        let coordXprocent = 0, coordYprocent = 0;

        function setMouseParallaxStyle(){
            const disX = coordXprocent - positionX;
            const disY = coordYprocent - positionY;

            positionX = positionX + (disX * speed);
            positionY = positionY + (disY * speed);

            clouds.style.cssText = `transform: translate(${positionX / forClouds}%, ${positionY / forClouds}%)`;
            mountains.style.cssText = `transform: translate(${positionX / forMountains}%, ${positionY / forMountains}%)`;
            human.style.cssText = `transform: translate(${positionX / forHuman}%, ${positionY / forHuman}%)`;

            requestAnimationFrame(setMouseParallaxStyle);
        }
        setMouseParallaxStyle();

        parallax.addEventListener('mousemove', function(e) {
            const parallaxWidth = parallax.offsetWidth;
            const parallaxHeight = parallax.offsetHeight;

            const coordX = e.pageX - parallaxWidth / 2;
            const coordY = e.pageY - parallaxHeight / 2;

            coordXprocent = coordX / parallaxWidth * 100;
            coordYprocent = coordY / parallaxHeight * 100;
        });


        let thesholdSets = []
        for (let i = 0; i <= 1.0; i += 0.005){
            thesholdSets.push(i)
        }
        const callback = function ( entries, observer ) {
           const ScrollTopProcent = window.pageYOffset / parallax.offsetHeight * 100;
           setParallaxItemStyle(scrollTopProcent);
        }
        const observer = new IntersectionObsebver(callback,{
            threshold: thesholdSets
        })

        observer.observe(document.querySelector('.content'))

        function setParallaxItemStyle(ScrollTopProcent){
            content.style.cssText = `transform: translate(0%, -${ScrollTopProcent / 9}%);`;
            mountains.parentElement.style.cssText = `transform: translate(0%, -${ScrollTopProcent / 6}%);`;
            human.parentElement.style.cssText = `transform: translate(0%, -${ScrollTopProcent / 3}%);`;
        }

    }
}