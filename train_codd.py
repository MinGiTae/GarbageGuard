import os
from collections import Counter

label_dir = 'C:/Users/minhw/PycharmProjects/GG_project/CODD_YOLO/labels/train'
class_ids = []

for file in os.listdir(label_dir):
    with open(os.path.join(label_dir, file), 'r') as f:
        for line in f:
            class_id = int(line.split()[0])
            class_ids.append(class_id)

print("전체 클래스 ID 분포:", Counter(class_ids))
print("총 클래스 수:", len(set(class_ids)))
