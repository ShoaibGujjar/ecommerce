from django.apps import AppConfig


class UserConfig(AppConfig):
   
    name = 'user'
    def ready(self):
        import user.signals

# class BaseConfig(AppConfig):
#     name = 'base'
#     def ready(self):
#         import base.signals
