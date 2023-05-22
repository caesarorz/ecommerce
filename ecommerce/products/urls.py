
from django.urls import path

from . import views

urlpatterns = [
    path('products/', views.list_products, name='products'),
    path('products/<str:pk>/', views.get_product, name='product'),
    path('list/', views.ListProducts.as_view()),
    path('products/review/<str:pk>/', views.create_product_reviews, name='product-review')
]