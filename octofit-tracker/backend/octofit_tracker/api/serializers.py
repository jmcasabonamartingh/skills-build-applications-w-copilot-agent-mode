from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Activity, Profile, Team, TeamMembership, WorkoutSuggestion


class ObjectIdField(serializers.Field):
    """Field que convierte ObjectId de MongoDB a string y viceversa"""
    def to_representation(self, value):
        return str(value)

    def to_internal_value(self, data):
        return str(data)


class ObjectIdMixin(serializers.Serializer):
    id = ObjectIdField(source='pk', read_only=True)
    object_id = serializers.SerializerMethodField(read_only=True)

    def get_object_id(self, obj):
        return str(obj.pk)


class UserSerializer(serializers.ModelSerializer):
    id = ObjectIdField(source='pk', read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class ProfileSerializer(ObjectIdMixin, serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Profile
        fields = ['id', 'object_id', 'user', 'display_name', 'grade_level', 'bio', 'team']


class TeamSerializer(ObjectIdMixin, serializers.ModelSerializer):
    created_by = serializers.SerializerMethodField(read_only=True)
    members_count = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Team
        fields = ['id', 'object_id', 'name', 'description', 'created_by', 'created_at', 'members_count']

    def get_created_by(self, obj):
        try:
            user = obj.created_by
            if user:
                return {'username': user.username, 'email': user.email}
        except Exception:
            pass
        return None

    def get_members_count(self, obj):
        try:
            return obj.memberships.count()
        except Exception:
            return 0


class TeamMembershipSerializer(ObjectIdMixin, serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    team = TeamSerializer(read_only=True)

    class Meta:
        model = TeamMembership
        fields = ['id', 'object_id', 'user', 'team', 'joined_at']


class ActivitySerializer(ObjectIdMixin, serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Activity
        fields = [
            'id',
            'object_id',
            'user',
            'activity_type',
            'duration_minutes',
            'distance_km',
            'calories_burned',
            'performed_at',
            'notes',
            'created_at',
        ]


class WorkoutSuggestionSerializer(ObjectIdMixin, serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = WorkoutSuggestion
        fields = [
            'id',
            'object_id',
            'user',
            'title',
            'description',
            'difficulty',
            'target_minutes',
            'is_active',
            'created_at',
        ]


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password'],
        )
        Profile.objects.get_or_create(user=user, defaults={'display_name': user.username})
        return user
