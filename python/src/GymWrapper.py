# Wrapper to allow modifying gym score
import gym
import numpy as np
from stable_baselines3.common.type_aliases import GymStepReturn

from config.CONFIG import CONFIG


class GymWrapper(gym.Wrapper):
    step_count: int

    def __init__(self, env: gym.Env):
        gym.Wrapper.__init__(self, env)
        self.reset_state()

    def reset_state(self):
        if CONFIG.use_level_seed:
            self.env.seed(CONFIG.level_seed)
        self.step_count = 0

    def step(self, action: int) -> GymStepReturn:
        obs, reward, done, info = self.env.step(action)
        self.step_count += 1
        if self.step_count >= CONFIG.episode_max_length:
            done = True
        return obs, reward, done, info

    def reset(self, **kwargs) -> np.ndarray:
        obs = self.env.reset(**kwargs)
        self.reset_state()
        return obs
