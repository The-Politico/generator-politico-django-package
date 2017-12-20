"""
Use this file to configure app settings and resolve defaults with any
overrides set in project settings.
"""

from django.conf import settings as project_settings

from .exceptions import <%=capital%>ConfigError


class Settings:
    pass


Settings.AUTH_DECORATOR = getattr(
    project_settings,
    '<%= allcaps %>_AUTH_DECORATOR',
    'django.contrib.auth.decorators.login_required'
)

Settings.SECRET_KEY = getattr(
    project_settings, '<%= allcaps %>_SECRET_KEY', 'a-bad-secret-key')

Settings.AWS_ACCESS_KEY_ID = getattr(
    project_settings, '<%= allcaps %>_AWS_ACCESS_KEY_ID', None)

Settings.AWS_SECRET_ACCESS_KEY = getattr(
    project_settings, '<%= allcaps %>_AWS_SECRET_ACCESS_KEY', None)

Settings.AWS_REGION = getattr(
    project_settings, '<%= allcaps %>_AWS_REGION', None)

Settings.AWS_S3_BUCKET = getattr(
    project_settings, '<%= allcaps %>_AWS_S3_BUCKET', None)

Settings.CLOUDFRONT_ALTERNATE_DOMAIN = getattr(
    project_settings, '<%= allcaps %>_CLOUDFRONT_ALTERNATE_DOMAIN', None)

Settings.S3_UPLOAD_ROOT = getattr(
    project_settings, '<%= allcaps %>_S3_UPLOAD_ROOT', 'uploads/<%= app %>')

settings = Settings
