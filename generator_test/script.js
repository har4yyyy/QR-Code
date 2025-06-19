const wrapper = document.querySelector('.wrapper');
const generateButton = wrapper.querySelector('.form button');
const qrInput = wrapper.querySelector('.form input');
const qrImage = wrapper.querySelector('.qr-code img');
const downloadButton = wrapper.querySelector('.download button');

// 生成二维码
generateButton.addEventListener('click', () => {
    let qrValue = qrInput.value;
    if (!qrValue) {
        return;
    }
    generateButton.innerText = 'Generating QR Code...';
    
    // 发送请求到后端，后端将向外部二维码生成 API 请求
    fetch(`/generate_qr?data=${encodeURIComponent(qrValue)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors'  // 添加 CORS 模式，确保跨域请求不被阻止
    })
        .then(response => response.blob())  // 获取生成的二维码图片文件
        .then(blob => {
            // 使用 Blob 数据生成二维码图像
            const url = URL.createObjectURL(blob);
            qrImage.src = url;  // 设置二维码图像的来源
            wrapper.classList.add('active');
            generateButton.innerText = 'Generate QR Code';
        })
        .catch(error => {
            console.error('Error generating QR code:', error);
        });
});

// 输入框内容改变时隐藏二维码
qrInput.addEventListener('keyup', () => {
    if (!qrInput.value) {
        wrapper.classList.remove('active');
    }
});

// 下载二维码图片
downloadButton.addEventListener('click', () => {
    let qrValue = qrInput.value;
    let url = qrImage.src; // 获取生成的二维码图像的 URL
    let filename = `${qrValue}`; // 将输入值作为文件名

    // 将请求发送到后端来处理图片下载
    fetch(`/download_qr?url=${encodeURIComponent(url)}&filename=${encodeURIComponent(filename)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors'  // 使用 CORS 模式
    })
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
