const wrapper = document.querySelector('.wrapper');
const generateButton = wrapper.querySelector('.form button');
const qrInput = wrapper.querySelector('.form input');
const qrImage = wrapper.querySelector('.qr-code img');
const downloadButton = wrapper.querySelector('.download button');

generateButton.addEventListener('click', () => {
    let qrValue = qrInput.value;
    if (!qrValue) {
        return;
    }
    generateButton.innerText = 'Generating QR Code...';
    // 使用 API 生成二维码，并展示
    qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;
    qrImage.addEventListener('load', () => {
        wrapper.classList.add('active');
        generateButton.innerText = 'Generate QR Code';
    });
});

qrInput.addEventListener('keyup', () => {
    if (!qrInput.value) {
        wrapper.classList.remove('active');
    }
});

downloadButton.addEventListener('click', () => {
    let qrValue = qrInput.value;
    let url = qrImage.src; // 获取生成的二维码图像的 URL
    let filename = `${qrValue}`; // 将输入值作为文件名

    // 将请求发送到后端来处理图片下载
    fetch(`/download_qr?url=${encodeURIComponent(url)}&filename=${encodeURIComponent(filename)}`)
        .then(response => response.blob())  // 获取图像文件
        .then(blob => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob); // 创建 URL 对象
            link.download = filename;  // 设置下载的文件名
            link.click();  // 模拟点击以启动下载
        })
        .catch(error => {
            console.error('Error downloading QR code:', error);
        });
});
