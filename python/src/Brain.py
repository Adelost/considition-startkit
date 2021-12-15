import time

import gym
from stable_baselines3 import A2C as AGENT
from stable_baselines3.common.env_util import make_vec_env
from stable_baselines3.common.on_policy_algorithm import OnPolicyAlgorithm
from stable_baselines3.common.vec_env import SubprocVecEnv, VecEnv

from config.CONFIG import CONFIG
from GymWrapper import GymWrapper

gym.logger.set_level(50)  # Hide initial logging

save_file_path = f'../saves/{CONFIG.save_file}'


class Brain:
    _model: OnPolicyAlgorithm
    _env: VecEnv
    _test_env: VecEnv

    def __init__(self):
        self._env = create_env(CONFIG.parallel_train_count)
        self._test_env = create_env(CONFIG.parallel_test_count)
        self._model = load_model_or_create_new(self._env)

    def learn(self):
        self._model.learn(total_timesteps=CONFIG.learn_steps)
        self._model.save(save_file_path)
        self._env.reset()

    def test(self):
        obs = self._test_env.reset()
        step_count = 0
        while True:
            # Plural since multiple envs can be used
            actions, _states = self._model.predict(obs, deterministic=True)
            obs, rewards, dones, _infos = self._test_env.step(actions)
            # view_state(obs)
            self._test_env.render()
            time.sleep(0.0001)
            step_count += 1
            if all(dones):
                print(f'Reward: {rewards[0]}, step:{step_count}')
                self._test_env.reset()
                break


def load_model_or_create_new(env) -> OnPolicyAlgorithm:
    try:
        model = AGENT.load(save_file_path, env=env)
        print(f'LOADED MODEL: {save_file_path}')
        if not CONFIG.verbose_training:
            model.verbose = 0
        return model
    except FileNotFoundError:
        pass
    model = create_model(env)
    print(f'CREATED NEW MODEL')
    model.save(save_file_path)
    return model


def create_model(env) -> OnPolicyAlgorithm:
    rl_policy = 'MlpPolicy'  # Multi-layer perceptron,
    return AGENT(rl_policy, env, verbose=0)


def create_env(env_count: int) -> VecEnv:
    opts = dict(
        n_envs=env_count,
        # Run in separate process for multiple environments
        # https://stable-baselines.readthedocs.io/en/master/guide/vec_envs.html
        vec_env_cls=SubprocVecEnv if env_count > 1 else None,
        wrapper_class=env_wrapper
    )
    env = make_vec_env(CONFIG.env_name, **opts)
    return env


def env_wrapper(env: gym.Env) -> gym.Env:
    env = GymWrapper(env)
    return env
