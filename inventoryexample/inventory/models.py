from django.db import models


# Create your models here.
class Item(models.Model):
    name = models.CharField(max_length=100)
    number = models.CharField(max_length=20)
    url = models.URLField(max_length=800)
    description = models.CharField(max_length=800, blank=True)
    amount = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
