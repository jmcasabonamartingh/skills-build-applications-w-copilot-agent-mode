import os

from django.contrib import admin
from django.urls import include, path

from api.views import LeaderboardAPIView, api_root, health_check, router

codespace_name = os.environ.get('CODESPACE_NAME')
if codespace_name:
    base_url = f"https://{codespace_name}-8000.app.github.dev"
else:
    base_url = 'http://localhost:8000'

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', api_root, name='api-root'),
    path('api/leaderboard/', LeaderboardAPIView.as_view(), name='leaderboard'),
    path('api/health/', health_check, name='health'),
    path('api/', include(router.urls)),
    path('api/auth/', include('dj_rest_auth.urls')),
]
