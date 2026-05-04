from django.contrib import admin

from .models import Activity, Profile, Team, TeamMembership, WorkoutSuggestion

admin.site.register(Profile)
admin.site.register(Activity)
admin.site.register(Team)
admin.site.register(TeamMembership)
admin.site.register(WorkoutSuggestion)
