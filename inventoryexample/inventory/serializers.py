from rest_framework import serializers
from inventoryexample.inventory.models import Item


# Item Serializer
class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'