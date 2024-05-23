from django.apps import apps


def get_config_data():
    return apps.get_app_config("backend").CONFIG  # type: ignore
