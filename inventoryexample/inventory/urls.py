from rest_framework import routers
from .api import ItemViewSet

router = routers.DefaultRouter()
router.register('api/items', ItemViewSet, 'items')

urlpatterns = router.urls