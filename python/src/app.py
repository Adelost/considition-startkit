import time

from Brain import Brain


def app():
    start_time = time.time()
    brain = Brain()
    i = 1
    while True:
        elapsed_time = time.time() - start_time
        elapsed_minutes = round(elapsed_time / 60)
        print(f'SEQUENCE {i}: Minutes: {elapsed_minutes}')
        brain.learn()
        brain.test()
        i += 1


if __name__ == "__main__":
    app()
