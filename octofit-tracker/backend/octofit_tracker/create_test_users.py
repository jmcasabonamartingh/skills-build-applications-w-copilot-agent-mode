import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'octofit_tracker.settings')
import sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__)))
django.setup()

from django.contrib.auth.models import User
from api.models import Profile

credentials = [
    ('demo_student', 'student@octofit.local', 'Password123!'),
    ('paul_octo',    'paul@octofit.local',    'Password123!'),
]

for username, email, password in credentials:
    user, created = User.objects.get_or_create(username=username, defaults={'email': email})
    user.set_password(password)
    user.save()
    Profile.objects.get_or_create(user=user, defaults={'display_name': username})
    print(f"{'CREATED' if created else 'UPDATED'}: {username} / {password}")

print("Done.")
