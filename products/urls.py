from django.conf import settings
from django.urls import path

from products.views import ProductDetailSlugView

app_name = 'products'

urlpatterns = [
#     # path('', home_page, name='home'),
#     # path('detail/', ProductDetailSlugView.as_view(), name="detail"),
    path('<slug>/', ProductDetailSlugView.as_view(), name='product_detail'),
]