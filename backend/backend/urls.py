from django.contrib import admin
from django.urls import path, include
from .views import RegisterView, GroupViewSet, UserStatsView, UserViewSet, IntervalView, ChordView, SeventhChordView, AnswearCheckView
from rest_framework import routers
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'groups', GroupViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/register/', RegisterView.as_view(), name='auth_register'),
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/seventh_chords/', SeventhChordView.as_view(), name='get_seven_chord'),
    path('api/intervals/', IntervalView.as_view(), name='get_interval'),
    path('api/triads/', ChordView.as_view(), name='get_chord'),
    path('api/check_answear/', AnswearCheckView.as_view(), name='check_answear'),
    path('api/user_stats/', UserStatsView.as_view(), name='save_stats'),
]
