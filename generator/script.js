const wrapper = document.querySelector('.wrapper');
const generateButton = wrapper.querySelector('.form button');
const qrInput = wrapper.querySelector('.form input');
const qrImage = wrapper.querySelector('.qr-code img');

generateButton.addEventListener('click', () => {
    let qrValue = qrInput.value;
    if(!qrValue) {
        return;
    }
    generateButton.innerText = 'Generating QR Code...';
    qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;
    qrImage.addEventListener('load', () => {
        wrapper.classList.add('active');
        generateButton.innerText = 'Generate QR Code';
    });
});

qrInput.addEventListener('keyup', () => {
    if(!qrInput.value) {
        wrapper.classList.remove('active');
    }
});