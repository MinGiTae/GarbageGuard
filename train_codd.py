# from ultralytics import YOLO
#
# model = YOLO('yolov8n.pt')
#
# model.train(
#     data='C:/Users/minhw/PycharmProjects/GG_project/CODD_YOLO/codd.yaml',
#     epochs=50,
#     imgsz=640,
#     batch=16,
#     name='train_codd',
#     project='runs/detect'
# )

from ultralytics import YOLO

model = YOLO('yolov8n.pt')

model.train(
    data='CW3_YOLO/cw3.yaml',
    epochs=50,
    imgsz=640,
    name='cw3_experiment'
)
