from django.apps import AppConfig


class <%= capital %>Config(AppConfig):
    name = '<%= app %>'

    def ready(self):
        from <%= app %> import signals  # noqa
