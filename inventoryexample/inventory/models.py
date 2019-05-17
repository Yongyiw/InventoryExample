from django.db import models

# Create your models here.
class Item(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=1000, blank=True)
    amount = models.IntegerField(default=0)
    created_at =  models.DateTimeField(auto_now_add=True)