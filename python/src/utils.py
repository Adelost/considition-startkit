import numpy as np
from matplotlib import pyplot as plt


def view_state(obs):
    img1 = obs[0][:, :, 0]
    img2 = obs[0][:, :, 1]
    img3 = obs[0][:, :, 2]
    img4 = obs[0][:, :, 3]
    img_x = np.concatenate([img1, img2, img3, img4], axis=1)
    view_image(img_x)


def view_image(img):
    plt.imshow(img, interpolation='nearest')
    plt.show()
