from config.GYM_ENVS import GYM_ENVS

class CONFIG():
    # Name of gym environment to load
    env_name = GYM_ENVS.walker

    # Maximum steps to run in each episode
    episode_max_length = 250

    # Number of steps to at each train sequence
    learn_steps = 50_000

    # Number of environments to run simultaneously when training
    # NOTE: Also limits maximum simultaneous environments, environments
    # can be changed but not go above this number after initial save
    parallel_train_count = 16

    # Number of environments to run when simultaneously testing
    parallel_test_count = 1

    # Repeats same level if true, else random level
    use_level_seed = False

    # Seed to use when repeating same level
    level_seed = 1031

    # Display additional training information
    verbose_training = True

    # Name of save file to save weights
    save_file = f'{env_name}_A2C_{parallel_train_count}'
