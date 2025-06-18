from flask import Flask, request, send_file
import requests

app = Flask(__name__)

@app.route('/download_qr', methods=['GET'])
def download_qr_code():
    qr_url = request.args.get('url')  # 获取前端传递的二维码图像生成 API 的 URL
    filename = request.args.get('filename')  # 获取文件名

    if not qr_url or not filename:
        return "URL or filename is missing", 400

    # 从生成二维码的 API 获取二维码图像
    response = requests.get(qr_url)

    if response.status_code == 200:
        # 将图像保存为文件
        with open(filename, 'wb') as f:
            f.write(response.content)
        
        # 返回二维码文件，触发下载
        return send_file(filename, as_attachment=True)

    return 'Failed to generate QR code', 400

if __name__ == '__main__':
    app.run(debug=True)
