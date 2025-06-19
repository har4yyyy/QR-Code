import cv2
import webbrowser

img = cv2.imread("scanner/bilibili.png")
qrcode = cv2.QRCodeDetector()
result, points, code = qrcode.detectAndDecode(img)

if result:
    print(f"Decoded text: {result}")
    webbrowser.open(result)
else:
    print("QR Code not detected")

height, width = img.shape[:2]

cv2.namedWindow("Detected QR code", cv2.WINDOW_NORMAL)
cv2.resizeWindow("Detected QR code", int(width), int(height))

cv2.imshow("Detected QR code", img)
cv2.waitKey(3000)