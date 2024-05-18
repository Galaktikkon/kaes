from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres import fields


class UserStatistics(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    exercise_type = models.CharField()
    group_type = models.CharField()
    sequence_type = models.CharField()
    note_duration = models.FloatField()
    instrument = models.CharField()
    pitch_range = fields.ArrayField(models.TextField())
    result = models.BooleanField()
    date = models.DateField(auto_now_add=True)
