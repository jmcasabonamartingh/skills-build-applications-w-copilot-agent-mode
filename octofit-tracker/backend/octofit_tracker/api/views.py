from django.db.models import Sum
from django.http import JsonResponse
from rest_framework import mixins, permissions, status, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.routers import DefaultRouter
from rest_framework.views import APIView

from .models import Activity, Profile, Team, TeamMembership, WorkoutSuggestion
from .serializers import (
    ActivitySerializer,
    ProfileSerializer,
    TeamMembershipSerializer,
    TeamSerializer,
    UserRegistrationSerializer,
    WorkoutSuggestionSerializer,
)


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def api_root(request):
    return Response(
        {
            'profiles': request.build_absolute_uri('profiles/'),
            'activities': request.build_absolute_uri('activities/'),
            'teams': request.build_absolute_uri('teams/'),
            'memberships': request.build_absolute_uri('memberships/'),
            'leaderboard': request.build_absolute_uri('leaderboard/'),
            'workouts': request.build_absolute_uri('workouts/'),
            'register': request.build_absolute_uri('register/'),
            'auth': request.build_absolute_uri('auth/'),
        }
    )


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user if self.request.user.is_authenticated else None)


class TeamMembershipViewSet(viewsets.ModelViewSet):
    queryset = TeamMembership.objects.all()
    serializer_class = TeamMembershipSerializer
    permission_classes = [permissions.IsAuthenticated]


class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all().order_by('-performed_at')
    serializer_class = ActivitySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return self.queryset.filter(user=user)
        return Activity.objects.none()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class WorkoutSuggestionViewSet(viewsets.ModelViewSet):
    queryset = WorkoutSuggestion.objects.all().order_by('-created_at')
    serializer_class = WorkoutSuggestionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return self.queryset.filter(user=user, is_active=True)
        return WorkoutSuggestion.objects.none()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class RegistrationAPIView(mixins.CreateModelMixin, viewsets.GenericViewSet):
    serializer_class = UserRegistrationSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)


class LeaderboardAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        rows = (
            Activity.objects.values('user__username')
            .annotate(total_minutes=Sum('duration_minutes'), total_calories=Sum('calories_burned'))
            .order_by('-total_minutes')[:20]
        )
        return Response(list(rows), status=status.HTTP_200_OK)


router = DefaultRouter()
router.register(r'profiles', ProfileViewSet, basename='profile')
router.register(r'teams', TeamViewSet, basename='team')
router.register(r'memberships', TeamMembershipViewSet, basename='membership')
router.register(r'activities', ActivityViewSet, basename='activity')
router.register(r'workouts', WorkoutSuggestionViewSet, basename='workout')
router.register(r'register', RegistrationAPIView, basename='register')


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def health_check(request):
    return JsonResponse({'status': 'ok'})
