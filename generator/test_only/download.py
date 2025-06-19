from flask import Flask, request, send_file
import requests
from flask_cors import CORS  # 导入 CORS

app = Flask(__name__)
CORS(app)  # 为整个应用启用 CORS，允许跨域请求

# @app.route('/')
# def home():
#     return 'Hello, World!'

@app.route('/generate_qr', methods=['GET'])
def generate_qr_code():
    qr_data = request.args.get('data')  # 获取前端传递的二维码内容
    if not qr_data:
        return "Data is missing", 400

    # 使用外部二维码生成 API 获取二维码图像
    qr_url = f"https://api.qrserver.com/v1/create-qr-code/?size=200x200&data={qr_data}"
    response = requests.get(qr_url)

    if response.status_code == 200:
        # 返回二维码图像给前端
        return response.content, 200, {'Content-Type': 'image/png'}
    
    return 'Failed to generate QR code', 400

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
