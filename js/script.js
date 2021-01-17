window.onload = function () {
    const img = document.querySelector('.image-container>img');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    const circlesContainer = document.querySelector('.circles');
    const sliderBody = document.querySelector('.slider-body');
    const imageContainer = document.querySelector('.image-container');

    function initSlider(images) {
        circlesContainer.innerHTML = '';

        const circles = createCircles(images.length);

        circles.forEach((el, index) => {

            el.onclick = () => {
                prevImageIndex = currentImageIndex;
                currentImageIndex = index;
                changeImage();
            };
            circlesContainer.insertAdjacentElement('beforeEnd', el);
        });


        let currentImageIndex = 0;
        let prevImageIndex = images.length - 1;

        changeImage();

        function changeImage() {
            img.src = images[currentImageIndex];
            circles[currentImageIndex].classList.add('active');
            circles[prevImageIndex].classList.remove('active');
        }

        function goNext() {
            prevImageIndex = currentImageIndex;
            if (currentImageIndex >= images.length - 1) {
                currentImageIndex = 0;
            }
            else {
                currentImageIndex++;
            }

            changeImage();
        }

        function goPrev() {
            prevImageIndex = currentImageIndex;
            if (currentImageIndex <= 0) {
                currentImageIndex = images.length - 1;
            }
            else {
                currentImageIndex--;
            }
            changeImage();
        }

        rightArrow.onclick = goNext;
        leftArrow.onclick = goPrev;


        let interval = null;
        startSlider();

        function startSlider() {
            if (interval) return;
            interval = setInterval(goNext, 1000);
        }

        function stopSlider() {
            clearInterval(interval);
            interval = null;
        }

        function createCircles(count) {
            let circles = [];
            let elem = document.createElement('span');
            elem.classList.add('circle');

            for (let i = 0; i < count; i++) {
                let newElem = elem.cloneNode();
                circles.push(newElem);
                if (i === 0) {
                    newElem.classList.add('active');
                }
            }
            return circles;
        }


        sliderBody.addEventListener('mouseover', stopSlider);

        sliderBody.addEventListener('mouseleave', startSlider);

    }

    const getImagesButton = document.getElementById('get-images-button');
    const loader = document.querySelector('.loader-wrapper');

    let imagesCount = 4;
    const limit = 16;

    getImagesButton.onclick = async function () {
        if (imagesCount > limit) {
            return;
        }
        loader.hidden = false;
        const photos = await request('get', 'https://jsonplaceholder.typicode.com/photos');
        const photoUrls = photos
            .splice(0, imagesCount)
            .map(photo => photo.thumbnailUrl);
        imagesCount += 4;
        console.log(photoUrls);
        initSlider(photoUrls);

        loader.hidden = true;
        sliderBody.hidden = false;
      
    }

    function request(method, url, data) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url, true);
            xhr.send(data);

            xhr.onreadystatechange = function () {

                if (this.readyState === 4 && this.status === 200) {
                    const response = JSON.parse(this.response);
                    resolve(response);
                }
                else if (this.status >= 300) {
                    reject('Something went wrong!');
                }
            }
        });
    }
}



// getImages();


// function getImages() {


//     request('get', 'https://jsonplaceholder.typicode.com/photos')
//         .then(data => {

//             let prevImgIndex = 0;
//             const im = data.splice(prevImgIndex, 4);
//             prevImgIndex += 4;
//             let newimages = [];


//             im.forEach(image => {
//                 newimages.push(image.thumbnailUrl);
//             });

//             const images = newimages;


//             const circles = createCircles(images.length);

//             circles.forEach((el, index) => {

//                 el.onclick = () => {
//                     prevImageIndex = currentImageIndex;
//                     currentImageIndex = index;
//                     changeImage();
//                 };
//                 circlesContainer.insertAdjacentElement('beforeend', el);
//             })

//             function createCircles(count) {
//                 let circles = [];
//                 let elem = document.createElement('span');
//                 elem.classList.add('circle');

//                 for (let i = 0; i < count; i++) {
//                     let newElem = elem.cloneNode();
//                     circles.push(newElem);
//                     if (i === 0) {
//                         newElem.classList.add('active');
//                     }
//                 }

//                 return circles;
//             }

//             let currentImageIndex = 0;
//             let prevImageIndex = images.lenght - 1;


//             function changeImage() {
//                 img.src = `${images[currentImageIndex]}`;
//                 circles[currentImageIndex].classList.add('active');
//                 circles[prevImageIndex].classList.remove('active');
//             }

//             function goNext() {
//                 prevImageIndex = currentImageIndex;
//                 if (currentImageIndex >= images.length - 1) {
//                     currentImageIndex = 0;
//                 }
//                 else {
//                     currentImageIndex++;
//                 }

//                 changeImage();
//             }

//             function goPrev() {
//                 prevImageIndex = currentImageIndex;
//                 if (currentImageIndex <= 0) {
//                     currentImageIndex = images.length - 1;
//                 }
//                 else {
//                     currentImageIndex--;
//                 }
//                 changeImage();

//             }

//             rightArrow.onclick = goNext;
//             leftArrow.onclick = goPrev;

//             let interval = null;
//             startSlider();

//             function startSlider() {
//                 if (interval) return;
//                 interval = setInterval(goNext, 1000);
//             }

//             function stopSlider() {
//                 clearInterval(interval);
//                 interval = null;
//             }

//             sliderBody.addEventListener('mouseover', stopSlider);

//             sliderBody.addEventListener('mouseleave', startSlider);

//         })
//         .catch(err => {
//             console.log(err);
//         });

// };







