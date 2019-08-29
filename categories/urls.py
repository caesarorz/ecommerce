from django.conf import settings
from django.urls import path

from .views import CategoryListView, CategoryDetailSlugView


app_name = 'categories'

urlpatterns = [
#     # path('', home_page, name='home'),
    path('<slug>/', CategoryDetailSlugView.as_view(), name="category_detail"),
    path('', CategoryListView.as_view(), name='list'),
]