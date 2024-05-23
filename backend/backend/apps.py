from django.apps import AppConfig


class Configuration(AppConfig):
    label = "backend"
    name = "backend"
    __run = True

    CONFIG = {}

    def __set_config(self, config):
        self.CONFIG = config

    def ready(self):
        if self.__run:

            import json
            import os

            path = os.path.abspath(
                os.path.join(
                    os.path.dirname(__file__), '..', "config"
                )
            )

            with open(os.path.join(path, "config.json"), "r") as f:
                self.__set_config(json.load(f))

            self.__run = False

            return super().ready()
