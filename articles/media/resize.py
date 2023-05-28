from PIL import Image
import sys

image = Image.open(sys.argv[1])


if (sys.argv[2] == "-half"):
    size = (int(image.size[0] / 2), int(image.size[1] / 2))
else:
    size = (int(sys.argv[2]), int(sys.argv[3]))

image.resize(size).save(f"rs-{sys.argv[1]}")